const express = require("express");
const { addOneRequest } = require("../controller/requests"); 

const router = express.Router(); 

router.get('/add', addOneRequest); 

module.exports = {
    routes: router
}