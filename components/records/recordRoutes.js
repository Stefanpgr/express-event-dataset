const getRecords = require('./recordController');

const express = require('express')

const Router = express.Router();

Router.post('/records', getRecords)

module.exports = Router;
