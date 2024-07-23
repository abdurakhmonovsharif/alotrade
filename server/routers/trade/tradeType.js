const { validateTradeType } = require("../../models/validators");
const { TradeType } = require("../../models/models");
const { map } = require("lodash");

const createTradeType = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = validateTradeType(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const tradeType = new TradeType({ name });

    await tradeType.save();

    res.status(201).json(tradeType);
  } catch (e) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const updateTradeType = async (req, res) => {
  try {
    const { name, _id } = req.body;
    const { error } = validateTradeType({ name });
    if (error) return res.status(400).json({ message: error.message });

    const tradeType = await TradeType.findById(_id);
    if (!tradeType)
      return res.status(404).json({ message: "Bunday tur mavjud emas" });
    tradeType.name = name;
    tradeType.save();
    res.status(200).json(tradeType);
  } catch (e) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const deleteTradeType = async (req, res) => {
  try {
    const { _id } = req.body;
    // const { error } = validateTradeType({ name });
    // if (error) return res.status(400).json({ message: error.message });

    const tradeType = await TradeType.findByIdAndDelete(_id);
    if (!tradeType)
      return res.status(404).json({ message: "Bunday tur mavjud emas" });

    // tradeType.isArchive = true;
    // tradeType.save();
    res.status(200).json(tradeType);
  } catch (e) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getTradeTypes = async (req, res) => {
  try {
    const tradeTypes = await TradeType.find({ isArchive: false });
    // .then(
    //   (tradeTypes) =>
    //     map(tradeTypes, (tradeType) => {
    //       return {
    //         label: tradeType.name,
    //         value: tradeType._id,
    //       };
    //     })
    // );
    res.status(200).json(tradeTypes);
  } catch (e) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

module.exports = {
  createTradeType,
  updateTradeType,
  deleteTradeType,
  getTradeTypes,
};
