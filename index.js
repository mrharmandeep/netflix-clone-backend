const express = require ("express");
const app = express();
const process = require('process');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const AuthenticationRoutes = require("./src/routes/authentication");
const MovieRoutes = require('./src/routes/movie');
require("dotenv").config();


app.use(express.json());
app.use(bodyParser.json());
app.use('/',AuthenticationRoutes);
app.use('/', MovieRoutes);


let username = process.env.MONGO_USERNAME;
let password = process.env.MONGO_PASSWORD;
let clusterUrl = 'cluster0.3cjzv.mongodb.net';
let dbName = 'sample_mflix';
let dbUrl = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}`;

console.log(`username = ${username}`);
mongoose.connect(dbUrl)
  .then(() => console.log('Connected to mongodb instance'))
  .catch(error => console.log(`Unable to connect! ${error}`));


app.listen(3000,()=>{console.log("server is up")});