const Companies = require ("../model/companiesModel");

//validation

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
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
};

 //Create companies 
const createCompanies = async function (req, res) {
 
        let data = req.body
        
        if (!isValidRequest(data)) { return res.status(400).send({message: "Company data is required" }) }
        const { company, email, password } = data

        if (!isValid(company)) { return res.status(400).send({message: "Company name is required" }) }

        let isCompany = await Companies.findOne({ company: company})
        if (isCompany) { return res.status(400).send({message: "Company is already exist" }) }

        if (!isValid(email)) { return res.status(400).send({message: "Email is required" }) }
        if (!isValidEmail(email)) { return res.status(400).send({message: "Please provide a valid email" }) }

        let isEmailUnique = await Companies.findOne({ email: email, password: password })
        if (isEmailUnique) { return res.status(400).send({message: "Email is already exist" }) }

        if (!isValid(password)) { return res.status(400).send({message: "Password is required" }) }
        if (!isValidPassword(password)) { return res.status(400).send({message: "Password should be in right format" }) } 


        const companiesData = await Companies.create(data);
        return res.status(201).send({message: 'New company created successfully', data: companiesData })

};

//Get All comapnies 
const getCompanies = async function (req, res) {
    
     let companiesData = await Companies.find().sort({numberOfEmployees : -1})   

     if (!companiesData)
         return res.status(404).send({message: "No Data Found" })

    return res.status(200).send({Data: companiesData})
  
};

//Get copanies by Name in Path Params
let getCompaniesDetails =async function(req, res) {
        let {company} = req.params
        
        if (company) {   
            let getCompany = await Companies.find({company: company})
            if(getCompany.length == 0){
             return res.status(404).send({status:false, msg:"company not found in collection"})
            }
                
            return res.status(200).send({status:true, data: getCompany})
        };  
};
//Exporting to routes
module.exports = { createCompanies, getCompanies, getCompaniesDetails};