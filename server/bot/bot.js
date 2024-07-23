const TelegramBot = require("node-telegram-bot-api");
const { config } = require("../packages");

const token = config.get("botToken");

// const bot = {};
const bot = new TelegramBot(token, { polling: true });

module.exports = bot;
