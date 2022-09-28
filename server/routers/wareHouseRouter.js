const express = require('express');
const wareHouseController = require('../controllers/wareHouseController')

const router = express.Router();


router.route('/').get(wareHouseController.getWareHouse)
router.route('/').post(wareHouseController.postWare)
router.route('/:id').get(wareHouseController.getOneWareHouse)
router.route('/').put(wareHouseController.updateWareHouse)
router.route('/one').get(wareHouseController.getOneWareHouse)
router.route('/delete/:id').delete(wareHouseController.deleteWareHouse)





module.exports =router;