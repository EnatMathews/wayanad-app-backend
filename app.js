const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SignUp = require('./modules/SignUp'); 
const Login = require('./modules/Login');
const app = express();
const PORT = 8888;
const JWT_SECRET = 'your_jwt_secret_key'; // Change this to a secure key

mongoose.connect("mongodb+srv://Enat:EnatVibin@cluster0.ts1wpg0.mongodb.net/wayanaddb?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
  app.post('/Login', async (req, res) => {
    const { user, pass } = req.body;
    
    try {
      const userRecord = await Login.findOne({ user });
      if (!userRecord) {
        return res.status(400).json({ status: "Fail", message: "User not found" });
      }
      
      const isMatch = await bcrypt.compare(pass, userRecord.pass);
      if (isMatch) {
        // Generate a JWT token
        const token = jwt.sign({ userId: userRecord._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ status: "Success", token });
      } else {
        res.status(400).json({ status: "Fail", message: "Incorrect password" });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ status: "Error", message: "Server error" });
    }
  });
  

app.post('/SignUp', async (req, res) => {
    const { name, mob, addd, pin, dir, place, emaill, user, pass } = req.body;
  
    try {
      const existingUser = await SignUp.findOne({ user });
      if (existingUser) {
        return res.json({ status: "Failed", message: "Username already exists" });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(pass, 10);
  
      const newUser = new SignUp({ name, mob, addd, pin, dir, place, emaill, user, pass: hashedPassword });
      await newUser.save();
  
      res.json({ status: "Success", message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
    }
  });
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
