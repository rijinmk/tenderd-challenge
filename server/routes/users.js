const express = require("express");
const { addUser, hasCompany, setCompany, getOneUserData } = require("../controller/users"); 

const router = express.Router(); 

router.post('/add', addUser); 
router.post('/hasCompany', hasCompany); 
router.post('/setCompany', setCompany); 

router.get('/user/:email', getOneUserData); 

module.exports = {
    routes: router
}