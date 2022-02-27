const { User } = require("../models");
const router = require("../views/usersRouter");
const bcryptjs = require('bcryptjs');
const nodemailer = require('../config/nodemailerConfig.js');
const moment = require("moment");

class Person {
  async findAllUsers() {
    return User.findAll();
  }
  async findByEmail(email) {
    return User.findOne({
      where: { email },
    });
  }

  async findByDni(dni) {
    return User.findOne({
      where: { dni },
    });
  }
  
    async findByUserId(data) {
      return User.findByPk(data);

  }

 

  // to change subscription
  async updateSuscription(body) {

   User.update(
    
      //information about changes
    {
      lastSuscriptionBegin: body.lastSuscriptionBegin,
      lastSuscriptionEnd: body.lastSuscriptionEnd,
    },
    { where: { id: body.idUser } }
  )

    let resultado = User.findByPk(body.idUser);
    console.log(resultado, "controller")

    return resultado;
    

}

  async modifyUser(cuerpoDeDatos) {
    console.log(cuerpoDeDatos)
    await User.update(

      //information about changes
      {

        /* creditCardNumber: cuerpoDeDatos.creditCardNumber, */
        creditCardNumber: await bcryptjs.hash(cuerpoDeDatos.creditCardSecureCodeNumber, 5),
        creditCardName: cuerpoDeDatos.creditCardName,
        creditCardExpDate: cuerpoDeDatos.creditCardExpDate,
        creditCardSecureCodeNumber: await bcryptjs.hash(cuerpoDeDatos.creditCardSecureCodeNumber, 5),
      /*   creditCardSecureCodeNumber: cuerpoDeDatos.creditCardSecureCodeNumber, */

        


      },
      //where
      { where: { id: cuerpoDeDatos.idUser } }
   
    )

    let resultado = this.findByUserId(cuerpoDeDatos.idUser);

    return resultado;
  }

  async deleteUser(id) {
    return User.destroy({ where: { id: id } });
  }

  async newUser(user) {
    user.password = await bcryptjs.hash(user.password, 10);
    user.creditCardSecureCodeNumber = await bcryptjs.hash(user.creditCardSecureCodeNumber, 5);
    user.creditCardNumber = await bcryptjs.hash(user.creditCardNumber, 5);
    

    //we create a token that we send by email to activate
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }
    console.log(token)

    let lastSuscriptionBegin = Date.now();
    let lastSuscriptionEnd = moment(lastSuscriptionBegin).add(1, 'year');

    user = {
      name : user.name,
      last_name1: user.last_name1,
      last_name2: user.last_name2,
      email: user.email,
      password: user.password,
      birthday: user.birthday,
      /* shipping_address: user.shipping_address,
      country: user.country,
      city: user.city,
      zipCode: user.zipCode, */
      dni: user.dni,
      creditCardNumber: user.creditCardNumber,
      creditCardName: user.creditCardName,
      creditCardExpDate: user.creditCardExpDate,
      creditCardSecureCodeNumber: user.creditCardSecureCodeNumber,
      lastSuscriptionBegin: lastSuscriptionBegin,
      lastSuscriptionEnd: lastSuscriptionEnd,
      /* phone: user.phone, */
      token: token
    }

    console.log(user)

    let usuario = await User.create(user);

    //we call the function to send the email to the user
    await nodemailer.sendConfirmationEmail(user.name, user.email, token);

    return usuario;

  }

  async findByToken(token) {
    return User.findOne({ token: token });
  }
// The function that recieves an email token and activates the users account
 async updateActive(token) {
   console.log(token);
  let user = await User.findOne({where:{token}});
  console.log(user);
  let usuario = await User.update(
      {
          isActive: true,
        },
        {where: {id: user.id}}
  );
  let resultado = "The account has been succesfully activated.";
  return resultado;

}


}
let usersController = new Person();
module.exports = usersController;
