const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const fetchuser= require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ROUTE 1: Create a new post using: POST "/api/post/create". login required

router.post('/create', fetchuser, [
    body('title', 'Title must be atleast 3 characters').isLength({ min: 3 }),
    body('body', 'Content must be atleast 5 characters').isLength({ min: 5 }),    
  ], async (req, res) => {
    // If there are errors, return Bad request and the errors
    let errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {      
      let user = req.user; 
  
      // Create a new post
      let post = await Post.create({
        username: user.username,
        title: req.body.title,
        body: req.body.body
      });
  
      // res.json(post)
      res.json({ post })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

  // ROUTE 2: view post. No login required
  router.get('/view', async (req, res) => {
    // If there are errors, return Bad request and the errors
    try {      
      let post = await Post.find();      
  
      // res.json(post)
      res.json({ post })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

  //ROUTE 3: delete post. Login required

  module.exports= router