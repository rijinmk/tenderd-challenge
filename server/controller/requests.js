const firebase = require("../firebase-db"); 
const express = require("express");

const firestore = firebase.firestore(); 

// Add one request
const addOneRequest = async (req, res, next) => {
    try{
        let data = req.query; 
        data.history = [{status: data.status, time: new Date() / 1}]; 
        await firestore.collection('requests').doc().set(data); 
        let allRequests = await firestore.collection('companies').doc(data.company).get()
        await firestore.collection('companies').doc(data.company).update({"requests": [...allRequests.data().requests, data]}); 
        console.log("Got request"); 
        res.send(data); 
    } catch (error) {
        console.log(error); 
        res.status(400).json(error); 
    }
}

// Get requests of a specific company
const requestsOfCompany = async (req, res, next) => {
    try{
        let data = req.params.company; 
        let companyData = await firestore.collection('companies').doc(data).get(); 
        res.send({company: companyData.data().requests, id: companyData.data().id}); 
    } catch (error) {
        console.log(error); 
        res.status(400).json(error); 
    }
}

module.exports = {
    addOneRequest, 
    requestsOfCompany
}