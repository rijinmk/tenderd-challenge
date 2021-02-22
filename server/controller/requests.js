const firebase = require("../firebase-db"); 
const express = require("express");
// const { v4: uuidv4 } = require('uuid');
const uuidv4 = require('uuid').v4; 

const firestore = firebase.firestore(); 

// Add one request
const addOneRequest = async (req, res, next) => {
    try{
        let data = req.query; 
        
        // Adding to the requests collection
        let uniqueRequestID = uuidv4(); 
        data.requestID = uniqueRequestID; 
        data.history = [{status: data.status, time: new Date() / 1}]; 
        await firestore.collection('requests').doc(uniqueRequestID).set(data); 
        
        // Adding to the companies collection
        let allRequests = await firestore.collection('companies').doc(data.company).get()
        await firestore.collection('companies').doc(data.company).update({"requests": [...allRequests.data().requests, uniqueRequestID]}); 

        // Adding to the users collection
        let dataOfAssignedBy = await firestore.collection('users').doc(data.assignedBy).get()
        let dataOfAssignedTo = await firestore.collection('users').doc(data.assignedTo).get()
        await firestore.collection('users').doc(data.assignedBy).update({"requestsThatYouAssigned": [...dataOfAssignedBy.data().requestsThatYouAssigned, data]}); 
        await firestore.collection('users').doc(data.assignedTo).update({"requestsThatAreAssignedToYou": [...dataOfAssignedTo.data().requestsThatAreAssignedToYou, data]}); 
        
        res.send(); 
    } catch (error) {
        console.log(error); 
        res.status(400).json(error); 
    }
}

// Edit request
const editOneRequest = async (req, res, next) => {
    console.log("HERE"); 
    try{
        let data = req.query; 
        let requestData = await firestore.collection('requests').doc(data.id).get()
        requestData = requestData.data()

        // Checking if there is any change in the history
        let historyData_server = requestData.history; 
        let lastKnownHistoryData = historyData_server[historyData_server.length-1].status;
        if(lastKnownHistoryData !== data.status){
            await firestore.collection('requests').doc(data.id).update({history: [...historyData_server, {status: data.status, time: new Date() / 1}]}); 
            // await firestore.collection('requests').doc(requestData.company).update({history: [...historyData_server, {status: data.status, time: new Date() / 1}]}); 
        }

        // Checking if description has changed
        let descriptionData_server = requestData.description;
        if(descriptionData_server !== data.description){
            await firestore.collection('requests').doc(data.id).update({description: data.description}); 
        }

        // Checking if type has changed
        let typeData_server = requestData.type;
        if(typeData_server !== data.type){
            await firestore.collection('requests').doc(data.id).update({type: data.type}); 
        }

        // Testing
        console.log(requestData.company + "/requests"); 
        let testing = await firestore.collection('companies').doc(requestData.company).get('requests'); 
        testing = testing.data(); 
        res.send(testing); 
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

// Get this request
const getOneRequest = async (req, res, next) => {
    try{
        let requestID = req.params.requestID; 
        let requestData = await firestore.collection('requests').doc(requestID).get(); 
        res.send(requestData.data()); 
    } catch (error) {
        console.log(error); 
        res.status(400).json(error); 
    } 
}

module.exports = {
    addOneRequest, 
    requestsOfCompany, 
    getOneRequest, 
    editOneRequest
}