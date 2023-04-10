const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/user');
const cors = require('./cors');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

/* GET users listing. */


module.exports = userRouter;