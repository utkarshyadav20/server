const express = require('express')
const mongoose = require('mongoose')
const RegisterModel = require('./models/register')

const app = express()

app.use(express.json())

mongoose.connect('mongodb+srv://utkarsh2002:A8075CEA@cluster0.wr9vb0t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


app.get("/", (req, res) => {
    res.json("Hello world");
})
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is Running")
})