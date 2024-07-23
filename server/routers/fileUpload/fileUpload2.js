const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const { Router } = require("express");
const { config } = require("../../packages");
const router = Router();

const maxSize = 100 * 1000_000;

const storage = new multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}.mp4`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    const { mimetype } = file;
    if (
      mimetype === "video/mp4" ||
      mimetype === "image/jpeg" ||
      mimetype === "image/png" ||
      mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid mimetype"));
    }
  },
});

const uploadFile = upload.single("file");

router.post("/", async (req, res) => {
  uploadFile(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).send({ error: err.message });
      }

      const { mimetype } = req?.file;
      const fileType = mimetype.split("/")[0];

      if (fileType === "image") {
        const image = Date.now() + ".webp";

        // const metada = await sharp(req.file.path).metadata();

        await sharp(req.file.path)
          // .resize(Math.round(metada.width / 2))
          .webp({ quality: 70 })
          .toFile(path.resolve(req.file.destination, image));

        fs.unlinkSync(req.file.path);

        return res
          .status(200)
          .send(`${config.get("server_base_url")}/files/${image}`);
      }

      if (fileType === "video") {
        return res
          .status(200)
          .send(
            `${config.get("server_base_url")}/upload/stream/${
              req.file.filename
            }`
          );
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ошибка в сервере..." });
    }
  });
});

router.post("/del", async (req, res) => {
  try {
    const { filename } = req.body;

    const filePath = path.resolve(path.basename("/"), "uploads", filename);

    const isExists = fs.existsSync(filePath);

    if (!isExists) {
      return res
        .status(404)
        .json({ error: "Ushbu fayl tizimdan mavjud emas!" });
    }

    fs.unlinkSync(filePath);

    res.json({ accept: "Fayl muvaffqqiyatli o'chirildi!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
});

router.get("/stream/:name", (req, res) => {
  const videoPath = `uploads/${req.params.name}`;

  if (!fs.existsSync(videoPath)) {
    return res.status(404).send({ success: false, message: "Video not found" });
  }
  const videoStat = fs.statSync(videoPath);

  const fileSize = videoStat.size;

  const videoRange = req.headers.range;

  if (videoRange) {
    const parts = videoRange.replace(/bytes=/, "").split("-");

    const start = parseInt(parts[0], 10);

    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;

    const file = fs.createReadStream(videoPath, { start, end });

    const header = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,

      "Accept-Ranges": "bytes",

      "Content-Length": chunksize,

      "Content-Type": "video/mp4",
    };

    res.writeHead(206, header);

    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,

      "Content-Type": "video/mp4",
    };

    res.writeHead(200, head);

    fs.createReadStream(videoPath).pipe(res);
  }
});

module.exports = router;
