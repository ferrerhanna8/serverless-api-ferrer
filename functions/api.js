const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
// your mongoDB Cloud URL
const dbCloudUrl =  'mongodb+srv://hannaferrer:hannaferrer@hanna.j1gg0qf.mongodb.net/?retryWrites=true&w=majority&appName=Hanna'

// const dbLocalUrl = 'mongodb...'

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
.connect(dbCloudUrl)
.then(( )=> console.log('Console to MongoDB'))
.catch((error) => console.error('Failed to connect to MongoDB', error));

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);