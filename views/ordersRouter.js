
const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/OrdersController');

//endpoint to place new order
router.post('/', OrdersController.placeNewOrder);



//read all of the orders
router.get('/retrieve', OrdersController.traePedidos);
//http://localhost:3500/orders

module.exports = router;

//Finished checking the routers
