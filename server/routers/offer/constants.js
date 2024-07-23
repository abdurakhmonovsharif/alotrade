const { Offer, Message } = require("../../models/models");
const { map } = require("lodash");

const getOffersByUser = async ({ query, id }) =>
  await Offer.find(query)
    .or([{ user: id }, { offererUser: id }])
    .sort({ updatedAt: -1 })
    .populate("messages", "message isRead user")
    .populate("user")
    .populate("organization")
    .populate("offererUser")
    .populate("offererOrganization")
    .populate("order")
    .populate("product")
    .then((offers) =>
      map(offers, (offer) => {
        return {
          messages: offer?.messages[offer?.messages.length - 1],
          user: offer?.user,
          organization: offer?.organization,
          offererUser: offer?.offererUser,
          offererOrganization: offer?.offererOrganization,
          order: offer?.order,
          product: offer?.product,
          _id: offer?._id,
          createdAt: offer?.createdAt,
        };
      })
    );

const getOfferById = async (id) =>
  await Offer.findById(id)
    .populate("messages", "message user isRead")
    .populate("user")
    .populate("organization")
    .populate("offererUser")
    .populate("offererOrganization")
    .populate("order")
    .populate("product")
    .then((offer) => {
      return {
        messages: offer?.messages[offer?.messages?.length - 1],
        user: offer?.user,
        organization: offer?.organization,
        offererUser: offer?.offererUser,
        offererOrganization: offer?.offererOrganization,
        order: offer?.order,
        product: offer?.product,
        _id: offer?._id,
        createdAt: offer?.createdAt,
      };
    });

const getOfferUser = async (query) =>
  await Offer.findOne(query)
    .populate("messages", "message")
    .populate("user")
    .populate("organization")
    .populate("offererUser")
    .populate("offererOrganization")
    .populate("order")
    .populate("product")
    .then((offer) => {
      if (!offer) return offer;
      return {
        messages: offer?.messages[offer?.messages?.length - 1],
        user: offer?.user,
        organization: offer?.organization,
        offererUser: offer?.offererUser,
        offererOrganization: offer?.offererOrganization,
        order: offer?.order,
        product: offer?.product,
        _id: offer?._id,
        createdAt: offer?.createdAt,
      };
    });

const getMessages = async (offer) =>
  await Message.find(offer)
    .select("user recipient message createdAt offer image")
    .populate("user", "firstname lastname image")
    .sort({ createdAt: 1 });

const getMessageByid = async (id) =>
  await Message.findById(id)
    .select("user recipient message createdAt offer image")
    .populate("user", "firstname lastname image")
    .sort({ createdAt: 1 });

module.exports = {
  getOffersByUser,
  getOfferById,
  getOfferUser,
  getMessages,
  getMessageByid,
};
