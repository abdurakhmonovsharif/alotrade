const { validateOffer } = require("../../models/validators");
const { Product, Order, Offer, User, Message } = require("../../models/models");
const {
  getOffersByUser,
  getOfferById,
  getMessages,
  getOfferUser,
  getMessageByid,
} = require("./constants");
const { map } = require("lodash");

const createOffer = async (req, res) => {
  try {
    const { product, order, message } = req.body;

    const offererUser = await User.findById(req.user.id);
    const offererOrganization = offererUser.organization || null;
    let user = null;
    let organization = null;

    if (product) {
      const productt = await Product.findById(product);
      organization = productt.organization;
      user = productt.user;
    }
    if (order) {
      const orderr = await Order.findById(order);
      organization = orderr.organization;
      user = orderr.user;
    }

    const newMessage = new Message({
      message,
      order,
      product,
      user: offererUser._id,
      recipient: user,
    });

    await newMessage.save();

    const newOffer = new Offer({
      user,
      organization,
      offererUser,
      offererOrganization,
      product,
      order,
      messages: [newMessage._id],
    });
    await newOffer.save();

    newMessage.offer = newOffer._id;
    await newOffer.save();
    await newMessage.save();
    const offer = await getOfferById(newOffer._id);
    const messages = await getMessages({ offer: newOffer._id });

    res.status(201).json({ offer, messages });
  } catch (e) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getOffers = async (req, res) => {
  try {
    const { filter } = req.body;
    let query = {};
    const id = req.user.id;
    if (filter === "user") {
      query = { user: id };
    }
    if (filter === "offererUser") {
      query = { offererUser: id };
    }

    const offers = await getOffersByUser({ query, id });
    res.status(200).json({ offers });
  } catch (error) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getOfferByUser = async (req, res) => {
  try {
    const { product = null, order = null } = req.body;
    let query = { offererUser: req.user.id };
    if (product) {
      query.product = product;
    }
    if (order) {
      query.order = order;
    }
    const offer = await getOfferUser(query);
    res.status(200).json({ offer });
  } catch (error) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getOfferByid = async (req, res) => {
  try {
    const { id } = req.body;

    const offer = await getOfferById(id);
    res.status(200).json({ offer });
  } catch (error) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getMessagesByOffer = async (req, res) => {
  try {
    const { id } = req.body;
    const messages = await getMessages({ offer: id });
    res.status(200).json(messages);

    map(messages, async (message) => {
      if (message.recipient.toString() === req.user.id) {
        message.isRead = true;
        await message.save();
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const createMessage = async (req, res) => {
  try {
    const { offer, message, product, order } = req.body;
    const user = req.user.id;
    const oldOffer = await Offer.findById(offer);
    if (!oldOffer) {
      return res.status(400).json({ message: "Предложение не найдено" });
    }

    const recipient =
      oldOffer.offererUser.toString() === user
        ? oldOffer.user
        : oldOffer.offererUser;

    const newMessage = new Message({
      offer,
      message,
      user,
      order,
      product,
      recipient,
    });

    await newMessage.save(user);
    oldOffer.messages.push(newMessage._id);
    await oldOffer.save();

    const resMessage = await getMessageByid(newMessage._id);
    const resOffer = await getOfferById(offer);

    res.status(201).json({ message: resMessage, offer: resOffer });
  } catch (error) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getMessageById = async (req, res) => {
  try {
    const { messageId } = req.body;

    const message = await getMessageByid(messageId);
    message.isRead = true;
    await message.save();
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

module.exports = {
  createOffer,
  getOffers,
  getMessagesByOffer,
  getOfferByUser,
  createMessage,
  getMessageById,
  getOfferByid,
};
