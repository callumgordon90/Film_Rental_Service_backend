const { Order } = require('../models/index');
const OrdersController = {};









OrdersController.placeNewOrder = (req,res) => {
    let body = req.body;

    console.log("this is the body", body)

    Order.create({
        price: body.price,
        peliculaId: body.peliculaId,
        usuarioId: body.usuarioId,
        fecha: body.fecha
    })
    .then(order => {
        if(order){
            res.send(order)
        }else{
            res.send("The creation of an order has failed");
        }
    })
    .catch((error => {
        res.send(error)
    }))
    
}


OrdersController.traePedidos = (req, res) => {

    try {

        Order.findAll().then(order => {
            res.send(order);   
        });
    } catch (error) {
        console.log (error);
        res.send(error);
    }
};

module.exports = OrdersController;