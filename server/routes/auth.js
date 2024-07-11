require("dotenv").config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../db/user');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const {username, email, password} = req.body;
    const user = new User({username, email, password});
    await user.save();
    res.status(201).send({message: 'User registered successfully'});
  } catch(error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if( !user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).send({message: 'Invalid credentials'});
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.send({token});
  } catch(error) {
    res.status(400).send(error);
  }
});

module.exports = router;