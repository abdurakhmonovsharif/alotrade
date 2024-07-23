const { AdType, validateAdType } = require("../../models/Ad/AdType");

async function create(req, res) {
  try {
    const { error } = validateAdType(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    const newAd = await AdType.create(req.body);

    res.send(newAd);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Ошибка в сервере..." });
  }
}

async function getAll(req, res) {
  try {
    const ad = await AdType.find({ isArchive: false });

    res.send(ad);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Ошибка в сервере..." });
  }
}

async function update(req, res) {
  try {
    const ad = await AdType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!ad) {
      return res.status(404).send({ message: "Not Found" });
    }

    res.status(200).send(ad);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Ошибка в сервере..." });
  }
}

async function remove(req, res) {
  try {
    const ad = await AdType.findByIdAndDelete(req.params.id);

    if (!ad) {
      return res.status(404).send({ error: "Not Found" });
    }

    res.status(200).send({ message: "Deleted", id: ad.id });
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Ошибка в сервере..." });
  }
}

module.exports = { create, getAll, update, remove };
