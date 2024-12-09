const mongoose = require('mongoose');

const Employee = mongoose.model('Employee', 
{
    empno : {type: String, required: true},
    empname : {type: String, required: true},
    jobrole: {type: String, required: true},
    salary: {type: String, required: true},
    email : {type: String, required: true},
    phone : {type: String, required: true}
});

module.exports = Employee;