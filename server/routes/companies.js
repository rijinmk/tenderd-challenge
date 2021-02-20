const express = require("express");
const { getAllCompanies, getOneCompany } = require("../controller/companies"); 

const router = express.Router(); 

router.get('/all', getAllCompanies); 
router.get('/select/:id', getOneCompany); 

module.exports = {
    routes: router
}