const WareHouse = require("../models/WareHouse");
const Invertory = require("../models/Inventory");

exports.getWareHouse = async (req, res) => {
  try {
    const wareHouse = await WareHouse.find({});

    return res.status(200).json({ wareHouse });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
};

exports.getOneWareHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const getoneWareHouse = await WareHouse.findById(id);
    res.status(200).json(getoneWareHouse);
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
};

exports.postWare = async (req, res) => {
  try {
    const { name } = req.body;

    const sameName = await WareHouse.findOne({ name });
    if (sameName) {
      return res.status(400).json({message:"Aynı isim mevcut"})
    }

    const createWare = await WareHouse.create({
      name,
    });

    return res.json({ createWare });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
};

exports.deleteWareHouse = async (req, res) => {
  try {
    const { id } = req.params;

    await Invertory.remove({ warehouseid: id }).exec();

    await WareHouse.findByIdAndDelete(id);
    return res.status(200).json({ id });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

exports.updateWareHouse = async (req, res) => {
  try {
    const { name, id } = req.body;
    if (name.length < 3) {
      return res.status(400).json("3 ten büyük olmalıdır");
    }

    const warehouse = await WareHouse.findByIdAndUpdate(id, { name });
    warehouse.save();
    return res.json({ warehouse });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
};
