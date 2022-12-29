const mongoose = require('mongoose')

const companiesSchema = new mongoose.Schema({

    company: { type: String, trim: true, unique: true },
    email: { type: String, trim: true, unique: true },
    password: { type: String, trim: true }, // adding password for login purpose
    numberOfEmployees : { type: Number, trim: true, default: 0 } //No of employees will 0 by default 
  
});

module.exports = mongoose.model('companies', companiesSchema);
