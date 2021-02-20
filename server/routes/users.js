const express = require("express");
const { addUser, hasCompany, setCompany } = require("../controller/users"); 

const router = express.Router(); 

router.post('/add', addUser); 
router.post('/hasCompany', hasCompany); 
router.post('/setCompany', setCompany); 

module.exports = {
    routes: router
}