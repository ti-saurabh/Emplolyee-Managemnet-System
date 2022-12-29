const Employees = require ("../model/employeeModel")
const Companies = require("../model/companiesModel")
const mongoose = require('mongoose')

//Regex Validation
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
};
  
const isValidEmail = function (value) {
    const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regexForEmail.test(value)
};

const isValidRequest = function (object) {
    return Object.keys(object).length > 0
};

const isValidPassword = function (password) {
    return (/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))
};

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
};

//Create Employees
const createEmployees = async function (req, res) {
 
        let data = req.body
        
        if (!isValidRequest(data)) { return res.status(400).send({message: "employee data is required" }) }
        let { comapnyId, name, email, password } = data

        if (!isValid(name)) { return res.status(400).send({message: "Name is required" }) }

        if (!comapnyId) return res.status(400).send({ status: false, message: "companyId is manadatory" })

        if (!isValid(email)) { return res.status(400).send({message: "Email is required" }) }
        if (!isValidEmail(email)) { return res.status(400).send({message: "Please provide a valid email" }) }

        let isEmailUnique = await Employees.findOne({ email: email })
        if (isEmailUnique) { return res.status(400).send({message: "Email is already exist" }) }

        if (!isValid(password)) { return res.status(400).send({message: "Password is required" }) }
        if (!isValidPassword(password)) { return res.status(400).send({message: "Password should be in right format" }) }

        //Increasing the no of employees by adding one 
        let companiesData = await Companies.findOne({_id: comapnyId}).select({numberOfEmployees: 1})
        console.log(companiesData)

        if(comapnyId == companiesData._id.toString()){
            companiesData.numberOfEmployees += 1
            let total =  companiesData.numberOfEmployees 

            await Companies.findOneAndUpdate({ _id: comapnyId}, {$set: {numberOfEmployees: total}}, {new: true})
        }

        const newEmployee = await Employees.create(data);
        return res.status(201).send({message: 'New Employee created successfully', data: newEmployee })
};

//Get Employees from particular comapnies
const getEmployees = async function (req, res) {

        let data = req.query
        let { comapnyId } = data

        if (comapnyId) {
            if (!isValidObjectId(comapnyId)) { return res.status(400).send({ status: false, message: "Please Enter valid companiesId" }) }
        }
        let getFiltersemployees = await Employees.find(data).sort(comapnyId)
        if (getFiltersemployees.length == 0)
            return res.status(404).send({ status: false, message: "No Employees Data Found" })

        res.status(200).send({ status: true, message: "Employees list", data: getFiltersemployees })
};

//Exporting to  routes
module.exports = { createEmployees, getEmployees};