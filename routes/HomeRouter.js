const express = require("express");
var path = require('path');

const homeController = require("../controllers/HomeController.js");
const homeRouter = express.Router();

homeRouter.get("/content", express.static(path.join(__dirname, '/content')));

homeRouter.post("/add", homeController.add);
homeRouter.get("/", homeController.index);
 
module.exports = homeRouter;