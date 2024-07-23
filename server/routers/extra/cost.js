const {CostForOneUser} = require("../../models/extra/CostForOneUser");

async function create(req, res) {
  try {
    const data = await CostForOneUser.create(req.body);

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
}

async function getAll(req, res) {
  try {
    const data = await CostForOneUser.find();

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
}

async function getOne(req, res) {
  try {
    const data = await CostForOneUser.findById(req.params.id);

    if (!data) {
      return res.status(404).send({ error: "Not Found" });
    }

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
}

async function update(req, res) {
  try {
    const data = await CostForOneUser.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!data) {
      return res.status(404).send({ error: "Not Found" });
    }

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
}

async function remove(req, res) {
  try {
    const data = await CostForOneUser.findByIdAndRemove(req.params.id);

    if (!data) {
      return res.status(404).send({ error: "Not Found" });
    }

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
}

module.exports = { create, getAll, getOne, update, remove };
