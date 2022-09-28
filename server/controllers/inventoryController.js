const Inventory = require("../models/Inventory");

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find({}).populate("warehouseid");

    return res.status(200).json({ inventory });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
};

exports.postInventory = async (req, res) => {
  try {
    const { name,id } = req.body;
      const sameName = await Inventory.find({warehouseid:id})
    
         const a= sameName.find(item=>item.name ===name)
      if(a){
        
        return res.status(401).json({message:'aynı isim mevcut'})
      }


     await Inventory.create({
      name,
      warehouseid: id,
    });
    const inventory = await Inventory.findOne({name}).populate('warehouseid'); 
    res.status(201).json({ inventory });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
   await Inventory.findByIdAndDelete(id);

    return res.status(200).json({ id });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

exports.uptadeInventory = async (req, res) => {
  try {
    const { id, name } = req.body;
    if(name.length<3){
      return res.status(400).json("eksik giridiniz")
    }
    

    await Inventory.findByIdAndUpdate(id, { name });
    
    return res.status(200).json({updated:{...req.body}});
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

exports.getInventoryByWareHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const inventories = await Inventory.find({ warehouseid: id }).populate('warehouseid');
    return res.status(200).json({ inventories });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};
