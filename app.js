const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 8888;
const JWT_SECRET = 'your_jwt_secret_key'; // Change this to a secure key

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
