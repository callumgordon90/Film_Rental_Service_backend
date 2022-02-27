const moment = require("moment");
const { Op } = require("sequelize");
const { Order } = require("../models");
const router = require("../routes/ordersRouters");


class Pedido {

  async allOrders() {
    return Order.findAll();
  }
  async orderId(idOrder) {
    return Order.findByPk(idOrder);
  }
  async userOrder(idUser) {
    return Order.findAll({
      where: {idUser: idUser},
    });
  }
  async newOrder(body) {

    let res = await Order.findAll({ where: {idUser : body.idUser, idMovie: body.idMovie, returnDate : {[Op.gt] : new Date()} }, },)
    console.log(res)
    if (res[0]) {
      throw new Error ("Now you have the saved film to see.")
    } else {
      return Order.create(body);
    }
    
  }
  async modifyOrder(cuerpoDeDatos) {

    return Order.update(

      //information about changes
      { idMovie: cuerpoDeDatos.idMovie, rentalDate: cuerpoDeDatos.rentalDate },

      //where
      
      { where: { id: cuerpoDeDatos.id } }
    );
  }
  async deleteOrder(id) {
    return Order.destroy({ where: { id: id } });
  }

/*   async findAllOrdersActive() {
    return Order.findAll({ isActive: "true" });
  } */

  //Find the films that the user is watching
  async findMyOrdersActive(idUser) {
    return Order.findAll(
      
      { where: {idUser : idUser, isActive: true, returnDate : {[Op.gt] : new Date()}}, },
      
      
      )
      ;
  }
  
  async findAllOrdersActive() {
    return Order.findAll(
      
      { where: {returnDate : {[Op.gt] : new Date()}}, },
      
      
      )
      ;
  }

  async findAllOrdersNoActive() {
    return Order.findAll(
      
      { where: {returnDate : {[Op.lt] : moment()}}, },
      
      
      )
      ;
  }
}
let orderController = new Pedido();
module.exports = orderController;
