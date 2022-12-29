const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const employeesSchema = new mongoose.Schema({

    comapnyId:{ type: ObjectId, ref:"Company", required: true}, //requiring companies id for Creating employees
    name: { type: String, trim: true },
    email: { type: String, trim: true, unique: true },
    password: { type: String, trim: true },    // addind password for login purpose
  
});

module.exports = mongoose.model('employees', employeesSchema);