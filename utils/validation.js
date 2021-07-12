const ResMsg = require('./index');

const { body, validationResult } = require('express-validator')

const recordsValidation = () => [
  body('startDate').not().isEmpty().withMessage('startDate is required'),
  body('endDate').not().isEmpty().withMessage('endDate is required'),
  body('minCount').not().isEmpty().withMessage('minCount is required'),
  body('maxCount').not().isEmpty().withMessage('maxCount is required'),
 
];


const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))
  return ResMsg(res, 422, 1, extractedErrors)
}

module.exports = { recordsValidation, validate }