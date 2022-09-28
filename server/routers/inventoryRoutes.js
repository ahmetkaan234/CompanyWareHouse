const express = require("express");
const inventoryController = require("../controllers/inventoryController");

const router = express.Router();

router.route("/").get(inventoryController.getInventory);
router.route("/").post(inventoryController.postInventory);
router.route("/").put(inventoryController.uptadeInventory);
router
  .route("/:id")
  .get(inventoryController.getInventoryByWareHouse)
  .delete(inventoryController.deleteInventory);

module.exports = router;
