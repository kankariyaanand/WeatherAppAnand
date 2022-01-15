// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
const cors = require('cors');
app.use(cors());

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 7080;
const server = app.listen(port, listening);
 function listening(){
    console.log(server);
    console.log(`running on localhost: ${port}`);
  };

// Callback to debug

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (request, response) {
    response.send(projectData);
  };

// Post Route
app.post('/addEntry', addEntry);
function addEntry(req,res){
  newEntry = {
    zip:req.body.zip,
    temperature:req.body.temperature,
    date:req.body.date,
    feelings:req.body.feelings
  }
  //projectData.push(newEntry);
  Object.assign(projectData, newEntry);
  console.log(projectData);
  res.send(projectData);
}