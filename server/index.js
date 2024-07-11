require("dotenv").config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const tagRoutes = require('./routes/tags');
const noteRoutes = require('./routes/notes');

const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/notesapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to database');
}).catch((error) => {
  console.log('Error connecting to database', error);
});

/*
app.use((req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if(!token) {
    return res.status(401).send({message: 'Authorization required'});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({message: 'Authorization required'});
  }
});*/

//app.use('/auth', authRoutes);
app.use('/api', tagRoutes);
app.use('/api', noteRoutes);

const port = 3000;
app.listen(port,() => {
  console.log('App is listening on port ', port);
})