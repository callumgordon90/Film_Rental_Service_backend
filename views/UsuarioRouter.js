const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");

const UsuarioController = require('../controllers/UsuarioController');

//CRUD RESTful

//Leer todos los usuarios
router.get('/', auth,  UsuarioController.traeUsuarios);
//http://localhost:3000/usuarios


router.get('/email/:email', auth, UsuarioController.traerUsuarioEmail);
router.get('/:id', auth, UsuarioController.traerUsuarioId);

//Registro
router.post('/', UsuarioController.registraUsuario);
//http://localhost:3000/usuarios

//Modificar datos de un Usuario
router.put('/:id', auth, UsuarioController.updateProfile);

//Delete all of the users
router.delete('/', auth, UsuarioController.deleteAll);

//Delete all of the users
router.delete('/:id', auth, UsuarioController.deleteById);

//Login
router.post('/l ', UsuarioController.logUsuario);
//https://localhost:3000/usuarios/login


module.exports = router;