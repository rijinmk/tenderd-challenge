const express = require("express");
const { addOneRequest, requestsOfCompany, getOneRequest, editOneRequest } = require("../controller/requests"); 

const router = express.Router(); 

router.get('/add', addOneRequest); 
router.get('/company/:company', requestsOfCompany); 
router.get('/edit', editOneRequest); 
router.get('/:requestID', getOneRequest); 

module.exports = {
    routes: router
}