
const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/OrdersController');

//endpoint to place new order
router.post('/', OrdersController.placeNewOrder);

module.exports = router;

//Finished checking the routers
