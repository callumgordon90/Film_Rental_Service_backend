# Backend for the Film Rental Service
Rest Api for a film rental company. Built with nodeJS Express Sequelize and MySQL.

The purpose of this project was to demonstrate an application that would allow a prospective user to create an account with a username and password (which would be encrypted) in order to permit them to access certain information from a database about different films, store their user data with us, and place an order for a film. This actions were simulated with the postman application, the code was written with node and express, and the database followed a relational sql structure.


Reto Backend Movies. API

This project consists in creating a backend API which facilitates the ordering of films online

The user can search through a database and select a film, after creating a username and password to access the API

Technologies used:

● ES6

● NodeJs

● Express

● Sequelize

● Git

● Postman

● MySQL Workbench

Additionally, JSONWebToken and Bcrypt dependencies for nodeJS were used in order to encrypt the passwords of the users.

The structure of the API was as follows: 

First, I created the index.js document in order to define the PORT and server. 

Then I created the router.js document, and connected this to the views and controller folders. The controller folder contains the functions for each endpoint. 

Finally, the last step was to use sequelize to connect the code to the MySQL database and create the module and migration folders.

Using the 'Postman' application, it is possible to simulate a front end client and perform CRUD actions such as retrieving information from the MYSQL database, modifying data, or adding data in.

Final thoughts:

For me this has been by far the most challenging project of the bootcamp so far. In particular I found the correct using of sequelize to generate the models and migrations files to be very challenging. This is an area that I would like to educate myself on more in the future. Furthermore, whilst I believe I understand most of the logic behind the code and how it functions, I must improve my knowledge and understanding of using correct syntax.

