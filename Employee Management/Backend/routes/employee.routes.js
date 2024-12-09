const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const Employee = require('../models/employee.model.js');

// Get , Post, Put, Delete
// API path: http://localhost:5000/employees

// Get: View all Employee's data
router.get('/', (req, res)=> {
    Employee.find().then(doc => 
        {
        res.status(200).send(doc);
    }).catch(err => 
        {
        res.status(400).send(err);
    });
});

// Get: View a single Employee's data
router.get('/:id', (req, res)=> {
    if(ObjectId.isValid(req.params.id))
    {
        Employee.findById(req.params.id).then(doc => 
            {
            res.status(200).send(doc);
        }).catch(err => 
            {
            res.status(400).send(err);
        });
    }
    else
    {
        return res.status(400).send('No record found with id' + req.params.id);
    }
});

// Post: Register a new Employee
router.post('/', (req, res)=> {
    let emp = new Employee(
    {
        empno : req.body.empno,
        empname : req.body.empname,
        jobrole: req.body.jobrole,
        salary: req.body.salary,
        email : req.body.email,
        phone : req.body.phone
    });

    emp.save().then(doc => 
        {
        res.status(200).send(doc);
    }).catch(err => 
        {
        res.status(400).send(err);
    });
});


// Put: Edit Employee data
router.put('/:id', (req, res)=> {
    if(ObjectId.isValid(req.params.id))
    {
        let emp = {
        _id: req.params.id,
        empno : req.body.empno,
        empname : req.body.empname,
        jobrole: req.body.jobrole,
        salary: req.body.salary,
        email : req.body.email,
        phone : req.body.phone
        };

        Employee.findByIdAndUpdate(req.params.id, {$set :emp}, {new:true}).then(doc => 
            {
            res.status(200).send(doc);
        }).catch(err => 
            {
            res.status(400).send(err);
        });
    }
    else
    {
        return res.status(400).send('No record found with id' + req.params.id);
    }
});


// Delete: Delete an existing Employee
router.delete('/:id', (req, res)=> {
    if(ObjectId.isValid(req.params.id))
    {
        Employee.findByIdAndRemove(req.params.id).then(doc => 
            {
            res.status(200).send(doc);
        }).catch(err => 
            {
            res.status(400).send(err);
        });
    }
    else
    {
        return res.status(400).send('No record found with id' + req.params.id);
    }
});

module.exports = router;