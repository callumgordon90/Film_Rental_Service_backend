
const OrdersController = {};

OrdersController.placeNewOrder = (req,res) => {
    let body = req.body;

    console.log("this is the body", body)

    OrdersController.create({
        price: body.price,
        peliculaId: body.peliculaId,
        usuarioId: body.usuarioId,
        fecha: body.fecha
    })
    .then(pedido => {
        if(pedido){
            res.send(pedido)
        }else{
            res.send("The creation of an order has failed");
        }
    })
    .catch((error => {
        res.send(error)
    }))
    
}

module.exports = OrdersController;