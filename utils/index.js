/**
 * Send Response
 * @param {object} res express response Object
 * @param {number} statusCode HTTP status code
 * @param {string} code status code 0 for success 1 for error
 * @param {string} msg Status type ('success'||''error')
 * @param {object} records object of data for response
 */
const ResMsg = (res, statusCode = 200, code, msg, records = null) => {
    res.status(statusCode).json({
      code,
      msg,
      records,
    });
  };

  module.exports = ResMsg;