const { validateOrder } = require("../../models/validators");
const { Order, Organization, User } = require("../../models/models");
const {
  getOrder,
  getOrderWithId,
  getOrders,
  getOrderForUpdate,
  getOrderForOffer,
  getOrdersCount,
} = require("./constants");
const bot = require("../../bot/bot");
const { config } = require("../../packages");
const { CostForOneUser } = require("../../models/extra/CostForOneUser");
const path = require("path");
const { editDescription } = require("../../helpers/helper");

const createOrder = async (req, res) => {
  try {
    const id = req.user.id;
    const { error } = validateOrder(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const organization = await Organization.findOne({
      user: id,
      isArchive: false,
    });

    const newOrder = new Order({
      ...req.body,
      user: id,
    });

    if (organization) {
      newOrder.organization = organization._id;
    }

    await newOrder.save();

    const order = await getOrder(newOrder._id);

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrdersByFilter = async (req, res) => {
  try {
    const {
      count,
      page,
      order: orderFilter,
      categories,
      subcategories,
      tradetypes,
      regions,
      districts,
      user,
      name,
    } = req.body;
    let query = { is_confirmed: true, isArchive: false };
    if (tradetypes.length > 0) {
      query.tradetypes = { $in: tradetypes };
    }
    if (districts.length) {
      query.district = { $in: districts };
    }
    if (regions.length) {
      query.region = { $in: regions };
    }
    if (categories.length) {
      query.categories = { $in: categories };
    }
    if (subcategories.length) {
      query.subcategories = { $in: subcategories };
    }
    if (orderFilter === "my") {
      query.user = user;
      delete query.is_confirmed;
    }
    if (name.length > 0) {
      query.name = new RegExp(".*" + name + ".*", "i");
    }

    const orders = await getOrders({ count, page, query });
    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Serverda: "Ошибка в сервере..." });
  }
};

const getOrdersByFilterCount = async (req, res) => {
  try {
    const {
      count,
      page,
      order: orderFilter,
      categories,
      subcategories,
      tradetypes,
      regions,
      districts,
      user,
      name,
    } = req.body;
    let query = { is_confirmed: true, isArchive: false };
    if (tradetypes.length > 0) {
      query.tradetypes = { $in: tradetypes };
    }
    if (districts.length) {
      query.district = { $in: districts };
    }
    if (regions.length) {
      query.region = { $in: regions };
    }
    if (categories.length) {
      query.categories = { $in: categories };
    }
    if (subcategories.length) {
      query.subcategories = { $in: subcategories };
    }
    if (orderFilter === "my") {
      query.user = user;
    }
    if (name.length > 0) {
      query.name = new RegExp(".*" + name + ".*", "i");
    }
    const totalCount = await getOrdersCount({ query });
    res.status(200).json({ totalCount });
  } catch (error) {
    res.status(500).json({ Serverda: "Ошибка в сервере..." });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.body;
    const order = await getOrderWithId(id);

    res.status(200).json({ order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getByIdWithToken = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user?.id;

    const user = await User.findOne({ _id: userId, isArchive: false });
    const response = await getOrderWithId(id);
    const order = await Order.findById(id);
    const cost = await CostForOneUser.find();

    const orderSum = cost[0].ordersum;

    if (!user) {
      return res.status(404).send({ error: "Пользователь не найден" });
    }

    if (!order) {
      return res.status(404).send({ error: "Заказ не найден" });
    }

    if (userId != order?.user) {
      if (!order.usersWhoPay.includes(userId)) {
        if (user.balance < orderSum) {
          return res.status(400).send({ error: "Not enough money" });
        }
        order.usersWhoPay.push(userId);
        await order.save();

        user.balance -= orderSum;
        await user.save();
      }
    }

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.body;

    delete req.body.id;

    const { error } = validateOrder(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id, isArchive: false },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedOrder) {
      return res.status(404).send({ error: "Not Found" });
    }

    const order = await getOrder(id);

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.body;

    const order = await Order.findOneAndDelete({ _id: id, isArchive: false });

    if (!order) {
      return res.status(404).send({ error: "Not Found" });
    }

    res.status(200).send({ id: order.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderPosition = async (req, res) => {
  try {
    const { id } = req.body;

    const updatedOrder = await Order.findById(id);

    if (!updatedOrder) {
      return res.status(400).json({ message: "Заказ не найден" });
    }

    updatedOrder.position =
      updatedOrder.position === "active" ? "unactive" : "active";
    await updatedOrder.save();

    const order = await getOrderForUpdate(id);
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getOrderByOffer = async (req, res) => {
  try {
    const { id } = req.body;

    const order = await getOrderForOffer(id);

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getAll = async (req, res) => {
  try {
    const order = await Order.find()
      .sort({ createdAt: -1 })
      .select("-isArchive")
      .populate("tradetypes", "name")
      .populate("region", "name")
      .populate("district", "name")
      .populate("categories", "name")
      .populate("subcategories", "name")
      .populate("subcategories2", "name")
      .populate("offers")
      .populate({
        path: "user",
        select: "firstname lastname phone image",
        populate: { path: "organization", select: "name image" },
      });

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

async function confirmOrder(req, res) {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).send({ error: "Order not found" });
    }

    if (order.is_confirmed) {
      return res.status(400).send({ error: "Already confirmed" });
    }

    order.is_confirmed = true;
    order.save();
    res.status(200).send({ message: "success", id: order.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
}

async function publishOrder(req, res) {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).send({ error: "Order not found" });
    }

    if (!order.is_confirmed) {
      return res.status(400).send({ error: "Before publish confirm order?" });
    }

    if (order.is_published) {
      return res.status(400).send({ error: "Already published" });
    }

    const defaultImg = `${config.get(
      "server_base_url"
    )}/defaultImg/default.jpg`;
    const base_url = `${config.get("base_url")}/orders/${order.id}`;
    const editedDescription = editDescription(order.description, base_url);

    if (order.images.length) {
      bot.sendPhoto(config.get("tgChannelIdForOrder"), order.images[0], {
        caption: `
          <b>${order.name}</b>\n\n${editedDescription}
          `,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Показать",
                url: base_url,
              },
            ],
          ],
        },
      });
    } else {
      bot.sendPhoto(config.get("tgChannelIdForOrder"), defaultImg, {
        caption: `
          <b>${order.name}</b>\n\n${editedDescription}
          `,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Показать",
                url: base_url,
              },
            ],
          ],
        },
      });
    }

    order.is_published = true;
    await order.save();

    res.status(200).send({ message: "success", id: order.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
}

async function forUser(req, res) {
  try {
    const { id } = req.user;
    const { count, page } = req.body;

    const user = await User.findOne({ _id: id, isArchive: false }).populate(
      "organization"
    );

    let data;

    data = await Order.find({
      $or: [
        { tradetypes: user?.organization?.tradetypes },
        { categories: user?.organization?.categories },
        { subcategories: user?.organization?.subcategories },
        { district: user.district },
      ],
      is_confirmed: true,
      isArchive: false,
      user: { $ne: id },
    })
      .select(
        "-updatedAt -__v -is_confirmed -is_published -isArchive -usersWhoPay"
      )
      .populate("tradetypes", "name")
      .populate("region", "name")
      .populate("district", "name")
      .populate("categories", "name")
      .populate("subcategories", "name")
      .populate("subcategories2", "name")
      .populate({
        path: "user",
        select: "firstname lastname phone image",
        populate: {
          path: "organization",
          select: "phones media image name address",
        },
      })
      .sort({ createdAt: -1 })
      .skip(page * count)
      .limit(count);

    res.status(200).send({ data, totalCount: data.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
}

module.exports = {
  getAll,
  createOrder,
  getOrdersByFilter,
  getOrdersByFilterCount,
  getOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderPosition,
  getOrderByOffer,
  confirmOrder,
  publishOrder,
  forUser,
  getByIdWithToken,
};
