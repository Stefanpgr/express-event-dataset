const ResMsg = require('./index');

const { body, validationResult } = require('express-validator')

const recordsValidation = () => [
    body('startDate')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('must be a valid date and be formatted with YYYY-MM-DD format'),
    body('endDate')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('must be a valid date and be formatted with YYYY-MM-DD format'),
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