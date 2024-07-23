const express = require("express");
module.exports.routers = (app) => {
  app.use(express.json({ extended: true, limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use("/api/upload", require("./fileUpload/fileUpload2"));
  app.use("/api/address", require("./address/router"));
  app.use("/api/admin", require("./admin/router"));
  app.use("/api/user", require("./user/router"));
  app.use("/api/category", require("./category/router"));
  app.use("/api/trade", require("./trade/router"));
  app.use("/api/order", require("./order/router"));
  app.use("/api/product", require("./product/router"));
  app.use("/api/offer", require("./offer/router"));
  app.use("/api/favorite", require("./favorite/router"));
  app.use("/api/announcement", require("./ad/router"));
  app.use("/api/extra", require("./extra/router"));
};
