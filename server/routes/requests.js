const express = require("express");
const { addOneRequest, requestsOfCompany } = require("../controller/requests"); 

const router = express.Router(); 

router.get('/add', addOneRequest); 
router.get('/company/:company', requestsOfCompany); 

module.exports = {
    routes: router
}