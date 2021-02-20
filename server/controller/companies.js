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

// Get a company by ID
const getOneCompany = async (req, res, next) => {
    try{
        let id = req.params.id; 
        let allCompaniesFromFirebase = await firestore.collection('companies').get(); 
        let selectedCompany; 
        allCompaniesFromFirebase.forEach(company => {
            if(company.id === id){
                selectedCompany = company.data(); 
            } 
        }); 
        res.send(selectedCompany);
    } catch(error) {
        res.status(400).json(error); 
    }
}

module.exports = {
    getAllCompanies, 
    getOneCompany
}