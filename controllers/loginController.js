const userController = require('./usersController');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "This is the json web token secret";


class LoginController {
    async validate(emailCheck,passwordCheck){

        let user = await userController.findByEmail(emailCheck);

        if (user == null) {
            throw new Error("Either the email or the password is incorrect User Null.");
          }
        let password = user.password;

        let verificar = await bcryptjs.compare(passwordCheck,password);

        if (!user.isActive) {
            throw new Error("The account is not active. Please check your email and activate your account");
          } 

        if(!verificar){
            throw new Error("The email and password do not match");
            
        }

  

        let payload = {
            userId : user.id,
            createdAt: new Date(),
            isAdmin: user.isAdmin
        };

        return jwt.sign(payload,secret);

    }
}

let loginController = new LoginController();
module.exports = loginController;