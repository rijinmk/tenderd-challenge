const firebase = require("../firebase-db"); 
const express = require("express");

const firestore = firebase.firestore(); 

// Add one user
const addUser = async (req, res, next) => {
    try{
        let dataFromClient = req.body; 
        await firestore.collection('users').doc(req.body.email).set(dataFromClient);
        console.log("Added", dataFromClient); 
    } catch (error) {
        res.status(400).json(error); 
        console.log("Error", error); 
    }
}

// User has company?
const hasCompany = async (req, res, next) => {
    try{
        let user = req.body.email; 
        let data = await firestore.collection('users').get(user);
        let company; 
        data.forEach(data => {
            if(data.id === user){
                company = data.data().company; 
            } 
        });  
        res.send(company ? true : false); 
    } catch(error) {
        res.status(400).json(error); 
        console.log("Error", error); 
    }
}

// Set company for the user
const setCompany = async (req, res, next) => {
    console.log(req.body);
    try{
        await firestore.collection('users').doc(req.body.user).update({company: req.body.companyID});
        res.send(true); 
    } catch(error) {
        res.status(400).json(error); 
        console.log("Error", error); 
    }   
}

module.exports = {
    addUser, 
    hasCompany, 
    setCompany
}