const express = require("express");
const { getAllCompanies } = require("../controller/companies"); 

const router = express.Router(); 

router.get('/all', getAllCompanies); 

module.exports = {
    routes: router
}