const express = require("express");
const { FormModel } = require("../model/FormModel");

const FormRouter = express.Router()



// post request
FormRouter.post('http://localhost:3004/create', async (req, res) => {
    console.log(req.body);
    try {
        const form = new FormModel(req.body);
        await form.save();
        res.status(201).json(form);
    } catch (err) {
        res.status(500).json({ error: 'Unable to create the form.' });
    }
});


// Get Request 
FormRouter.get('http://localhost:3004/', async (req, res) => {
    try {
        const forms = await FormModel.find();
        res.json(forms);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch forms.' });
    }
});

//   Get a single form by ID (GET):

FormRouter.get('http://localhost:3004/create/:id', async (req, res) => {
    try {
        const form = await FormModel.findOne({ "formId": req.params.id });
        if (!form) {
            return res.status(404).json({ error: 'Form not found.' });
        }
        res.json(form);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch the form.' });
    }
});

module.exports = { FormRouter }