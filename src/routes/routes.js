const express = require("express");
const router = express.Router()
const {createCompanies, getCompanies, getCompaniesDetails} = require("../controller/companiesController");
const {createEmployees, getEmployees} = require("../controller/employeeController");


//Apis
//---------------------------------Companies----------------------//
router.post("/companies", createCompanies);
router.get("/getCompanies", getCompanies);
router.get("/getCompaniesDetails/:company", getCompaniesDetails);

//---------------------------------Employees----------------------//
router.post("/employees", createEmployees);
router.get("/getEmplyoees", getEmployees);

module.exports = router