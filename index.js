const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db.js');

const PORT = 3500;

const router = require('./router');

let corsOptions = {//configuring the options for CORS
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

//Middleware
app.use(express.json()); //To be able to obtain the JSON in the body
app.use(cors(corsOptions));  //Using CORS


app.use(router);


db.then(()=>{
    app.listen(PORT, ()=> console.log(`Server on port ${PORT}`)); //Connecting to the database
})
.catch((err)=> console.log(err.message));   
