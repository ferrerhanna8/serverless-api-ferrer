const express = require('express');
const serverless = require('serverless-http');
const blogPostRoutes = require('./routes/blogPost'); // Correct path to your routes file
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
// your mongoDB Cloud URL
const dbCloudUrl =  'mongodb+srv://hannaferrer:hannaferrer@hanna.j1gg0qf.mongodb.net/?retryWrites=true&w=majority&appName=Hanna'

const dbLocalUrl = 'mongodb://localhost:27017/ferrerDB/blogPosts'

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
.connect(dbCloudUrl||dbLocalUrl)
.then(( )=> console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connect to MongoDB', error));


app.use('/', blogPostRoutes);
app.use('/.netlify/functions/api', blogPostRoutes);
module.exports.handler = serverless(app);

// app.listen(3000, () => {
//     console.log(`Server is running on port 5000`);
// });