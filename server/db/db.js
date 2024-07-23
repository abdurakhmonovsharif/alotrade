const { mongoose, config, bcrypt } = require("../packages");
const PORT = config.get("PORT") || 8000;
const { Admin } = require("../models/User/Admin");

module.exports.start = async (app) => {
  try {
    await mongoose
      .connect(config.get("MONGO_URI"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(async () => {
        console.log("Connect to MongoDB");
        const count = await Admin.count();
        if (!count) {
          const hashedPassword = bcrypt.hashSync("H5j19$4!d9JhS", 12);
          await Admin.create({
            phone: "+998992234244",
            password: hashedPassword,
          });
        }
      })
      .catch(() => {
        console.log("Connecting error to MongoDB");
      });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (error) {
    console.log("Ошибка в сервере", error.message);
    process.exit(1);
  }
};
