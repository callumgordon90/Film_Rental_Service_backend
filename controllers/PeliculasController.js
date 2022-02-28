const { default: axios } = require("axios");
const {Pelicula} = require("../models/index");
const PeliculasController = {};


//functions of the controller

PeliculasController.traePeliculas = (req, res) => {

};

PeliculasController.registraPelicula = async (req, res) => {

    try {

        let title = req.body.title;

        Pelicula.create({
            title: title
        }).then(pelicula => {
            res.send(`${pelicula.title} has been added to our database`);
        });

    } catch (error) {
        console.log (error);
        res.send(error);
    }
    

};

PeliculasController.peliculasTitulo = async (req, res) => {

    let busqueda = req.query.criterio;

    try {

        let resultados = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&query=${busqueda}&page=1&include_adult=false`);

        res.send(resultados.data);
        

    } catch (error) {
        console.log(error);
    }

}

PeliculasController.traeNovedades = async (req, res) => {

    try {

        let resultados = await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=es-ES&page=1");

        res.send(resultados.data);

    } catch (error) {
        console.log(error);
    }
}

module.exports = PeliculasController;