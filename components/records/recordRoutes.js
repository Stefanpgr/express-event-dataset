const getRecords = require('./recordController');

const express = require('express');
const { recordsValidation, validate } = require('../../utils/validation');

const Router = express.Router();

Router.post('/records', recordsValidation(), validate, getRecords)

module.exports = Router;
