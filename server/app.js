const {
  express,
  cors,
  path,
  socketIo,
  http,
  cookieParser,
  helmet,
  config,
} = require("./packages");
const app = express();
const { Server } = socketIo;
const server = http.createServer(app);
const { start } = require("./db/db");
const { routers } = require("./routers/routers");
const { socketIO } = require("./socketio/socket");
const errorHandler = require("./middleware/error-handler.middleware");
const morgan = require('morgan')

const io = new Server(server, {
  cors: {
    origin: "*",
    method: ["*"],
  },
});

app.use(
  cors({
    origin: "*",
    method: ["*"],
  })
);

morgan.token(
  "custom",
  (req, res) =>
    `[${new Date().toLocaleString()}] ${req.method} ${req.url}  ${
      res.statusCode
    }`
);

app.use(morgan(":custom"));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use("/api/files", express.static('uploads'));
app.use("/api/defaultImg", express.static("public"));

app.use(cookieParser());
socketIO(io);
start(server).then(() => {});
routers(app);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "./../frontend", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "./../frontend", "build", "index.html")
    );
  });
}
