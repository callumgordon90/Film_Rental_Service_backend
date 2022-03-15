const { Usuario } = require('../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

const UsuarioController = {};


//Functions of the controller

UsuarioController.traeUsuarios = (req, res) => {
    //Search bringing all of the users
    Usuario.findAll()
    .then(data => {

        res.send(data)
    });

};

UsuarioController.traerUsuarioId = (req, res) => {
    //Searching for an ID
    Usuario.findByPk(req.params.id)
    .then(data => {
        res.send(data)
    });
};

UsuarioController.traerUsuarioEmail = (req, res) => {
    //Search comparing a field
    Usuario.findOne({ where : { email : req.params.email }})
    .then(data => {
        res.send(data)
    });
}

UsuarioController.registraUsuario = async (req, res) => {
    
    //Registering a user
    
    try {

        let name = req.body.name;
        let age = req.body.age;
        let surname = req.body.surname;
        let nickname = req.body.nickname;
        let email = req.body.email;
        console.log("before encrypting",req.body.password);
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds)); 
        
        console.log("this is the password", password);
        
        //Checking errors.....
        
        //Saving the user in sequelize

        Usuario.create({
            name: name,
            age: age,
            surname: surname,
            email: email,
            password: password,
            nickname: nickname
        }).then(usuario => {
            res.send(`${usuario.name}, Welcome to the MOVIE API!`);
        });

    } catch (error) {
        res.send(error);
    }
    
};

UsuarioController.updateProfile = async (req, res) => {

    let datos = req.body;

    let id = req.params.id;

    try {

        Usuario.update(datos, {
            where: {id : id}
        })
        .then(actualizado => {
            res.send(actualizado);
        });

    } catch (error) {

    }

};

UsuarioController.deleteAll = async (req, res) => {

    try {

        Usuario.destroy({
            where : {},
            truncate : false
        })
        .then(usuariosEliminados => {
            res.send(`${usuariosEliminados} has been eliminated`);
        })

    } catch (error) {
        res.send(error);
    }

};

UsuarioController.deleteById = async (req, res) => {

    let id = req.params.id;

    try {

        Usuario.destroy({
            where : { id : id },
            truncate : false
        })
        .then(usuarioEliminado => {
            console.log(usuarioEliminado);
            res.send(`The user with the id ${id} has been deleted`);
        })

    } catch (error) {
        res.send(error);
    }

};


UsuarioController.logUsuario = (req, res) => {

    let correo = req.body.email;
    let password = req.body.password;

    Usuario.findOne({
        where : {email : correo}
    }).then(Usuario => {

        if(!Usuario){
            res.send("Usuario o contraseña inválido");
        }else {
            //if the user exists we will check
            //if the password is correct

            if (bcrypt.compareSync(password, Usuario.password)) { //comparing the introduced password with the saved password after decripting

                console.log("usuario aqui", Usuario);

                let token = jwt.sign({ usuario: Usuario }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });

                console.log("enviado....", token)

                res.json({
                    usuario: Usuario,
                    token: token
                })

                console.log("enviado, toklen:", token)
            } else {
                res.status(401).json({ msg: "Invalid username or password" });
            }
        };


    }).catch(error => {
        res.send(error);
    })
};

module.exports = UsuarioController;