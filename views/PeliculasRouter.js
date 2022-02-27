const { Router } = require('express');
const express = require('express');
const router = express.Router();

const PeliculasController = require('../controllers/PeliculasController');


//CRUD RESTful

//read all of the films
router.get('/', PeliculasController.traePeliculas);
//http://localhost:3000/peliculas

//Register a new film
router.post('/', PeliculasController.registraPelicula);
//http://localhost:3000/peliculas

//Search for films by title
router.get('/titulo', PeliculasController.peliculasTitulo);

//Search for new releases
router.get('/novedades', PeliculasController.traeNovedades);


module.exports = router;