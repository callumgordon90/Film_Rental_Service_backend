const router = require ("express").Router();
const moviesController = require("../controllers/moviesController");

//CRUD



// http://localhost:3005/movies/

router.get("/", async (req, res) => {
    try{
        res.json(await moviesController.findTopRated());
    } catch (err) {
        return res.status(500).json({
            mensaje: err.mensaje,
        });
    }
});



// http://localhost:3005/movies/soon

router.get("/soon", async (req, res) => {
    try {
      res.json(await moviesController.findComingSoon());
    } catch (err) {
      return res.status(500).json({
        mensaje: err.mensaje,
      });
    }
  });
  
  
  // http://localhost:3005/movies/id
  router.post("/id", async (req, res) => {
    try {
      let query = req.body.query;
      res.json(await moviesController.searchById(query));
    } catch (err) {
      return res.status(500).json({
        mensaje: err.mensaje,
      });
    }
  });
  
  // http://localhost:3005/movies/actor
  router.post('/actor', async (req, res)=> {
    try {  
        let query = req.body.query;
        res.json(await moviesController.searchByActor(query));
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
  });
  
  // http://localhost:3005/movies/play
  
  router.post("/play", async (req, res) => {
    try {
      let movieId = req.body.movieId;
      res.json(await moviesController.playTrailer(movieId));
    } catch (err) {
      return res.status(500).json({
        mensaje: err.mensaje,
      });
    }
  });
  
  
  // http://localhost:3005/movies/search
  router.post("/search", async (req, res) => {
    try {
      let query = req.body.query;
      res.json(await moviesController.searchByTitle(query));
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });
  
  
  
  // http://localhost:3005/movies/genre/''genre"
  router.post("/genre", async (req, res) => {
    try {
      let query = req.body.query;
      res.json(await moviesController.searchByGenre(query));
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });
  
  router.get("/actor/:personId", async (req, res) => {
    try {
      let personId = req.params.personId;
      res.json(await moviesController.searchByPerson(personId));
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });
  
  module.exports = router;
  