const router = require('express').Router();
const orderController = require('../controllers/ordersController');
const authenticate = require('../middleware/authenticate');
const admin = require('../middleware/admin')

//API CRUD ORDES

// See all orders
router.get('/', admin, async (req, res) => {
    try{
        res.json(await orderController.allOrders());
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
})
// View orders by ID
router.post('/id', async (req, res) => {
    try{
        const idOrder = req.body.idOrder;
        res.json(await orderController.orderId(idOrder));
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
})
// View orders the same user
router.post('/orderuserid', async (req, res) => {
    try{
        const idUser = req.body.idUser;
        res.json(await orderController.userOrder(idUser));
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
})
// Create orders
router.post('/', async (req, res) => {
    try{
        const body = req.body;
        res.json(await orderController.newOrder(body));
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
})
// Modify orders
router.put('/', authenticate, async (req, res) => {
    try {
        const cuerpoDeDatos = req.body;
        res.json(await orderController.modifyOrder(cuerpoDeDatos));
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});
// Delete orders and users
router.delete('/:id', admin, async (req, res) => {
    try {
        const id = req.params.id;
        res.json(await orderController.deleteOrder(id));
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

/* router.get("/active", async (req, res) => {
    try {
      res.json(await orderController.findAllOrdersActive());
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }); */

  router.post("/active", async (req, res) => {
    try {
      res.json(await orderController.findAllOrdersActive());
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });

  router.post("/noactive", async (req, res) => {
    try {
      res.json(await orderController.findAllOrdersNoActive());
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });

  //POST - Find rooms of one user
router.post("/userid", async (req, res) => {
    try {
      const idUser = req.body.idUser;
      res.json(await orderController.findMyOrdersActive(idUser));
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });

module.exports = router;