const firebase = require("../firebase-db"); 
const express = require("express");

const firestore = firebase.firestore(); 

// Get all companies
const getAllCompanies = async (req, res, next) => {
    try{
        let allCompaniesFromFirebase = await firestore.collection('companies').get(); 
        let companies = []; 
        allCompaniesFromFirebase.forEach(company => {
            companies.push({company: company.data(), id: company.id}); 
        }); 
        res.send(companies);
    } catch (error) {
        res.status(400).json(error); 
    }
}

module.exports = {
    getAllCompanies
}