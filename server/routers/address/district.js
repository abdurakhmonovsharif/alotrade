const { validateDistrict } = require("../../models/validators");
const { District, Region } = require("../../models/models");
const { forEach } = require("lodash");

const createDistrict = async (req, res) => {
  try {
    const { error } = validateDistrict(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
    const { name, region } = req.body;

    const district = await District.findOne({ name: name, region });

    if (district) {
      return res.status(400).json({
        message: `Diqqat! ${name} tumani avval yaratilgan.`,
      });
    }

    const newDistrict = new District({
      name,
      region,
    });

    await newDistrict.save();

    const updateRegion = await Region.findById(region);
    updateRegion.districts.push(newDistrict._id);
    await updateRegion.save();

    res.send(newDistrict);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Ошибка в сервере..." });
  }
};

const updateDistrict = async (req, res) => {
  try {
    const { name, _id, region } = req.body;
    const { error } = validateDistrict({ name, region });
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
    const district = await District.findById(_id).select("name");
    if (!district) {
      return res.status(400).json({
        message: `Diqqat! ${name} tumani topilmadi.`,
      });
    }

    district.name = name;
    await district.save();

    res.send(district);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Ошибка в сервере..." });
  }
};

const deleteDistrict = async (req, res) => {
  try {
    const { _id } = req.body;
    const district = await District.findByIdAndDelete(_id);

    if (!district) {
      return res.status(400).json({
        message: `Diqqat! Tumani topilmadi.`,
      });
    }

    // district.isArchive = true;
    // await district.save();

    res.send(district);
  } catch (error) {
    console.log(error);

    res.status(501).json({ error: "Ошибка в сервере..." });
  }
};

const getDistrictsByRegion = async (req, res) => {
  try {
    const { region } = req.body;
    const districts = await District.find({ isArchive: false, region }).select(
      "name"
    );
    res.send(districts);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Ошибка в сервере..." });
  }
};

const createDistricts = async (req, res) => {
  try {
    const { districts, region } = req.body;

    forEach(districts, async (district) => {
      const newDistrict = new District({
        name: district.name,
        region,
      });
      await newDistrict.save();

      const updateRegion = await Region.findById(region);
      updateRegion.districts.push(newDistrict._id);
      await updateRegion.save();
    });
    res.status(200).json({ message: "Tumanlar muvaffaqiyatli yaratildi." });
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Ошибка в сервере..." });
  }
};

module.exports = {
  createDistrict,
  updateDistrict,
  deleteDistrict,
  getDistrictsByRegion,
  createDistricts,
};
