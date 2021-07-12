const { Record }  = require('../../config/db')
const ResMsg = require('../../utils')

/**
 * Represents a book.
 * @function
 * @param {object} req - request object for payload and headers.
 * @param {res} res - response object sent to the client.
 */


const getRecords = async (req, res, next) => {
  const { minCount, maxCount, startDate, endDate } = req.body
  try {
    const records = await Record.aggregate([

      {
        $project: {
          key: '$key',
          createdAt: '$createdAt',
          totalCount: { $sum: '$counts' },

        },
      },
      {
        $match: {
          totalCount: { $lte: maxCount, $gte: minCount },
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
      { $unset: '_id' },
      {$sort: { createdAt: -1 }}

    ])
    return ResMsg(res, 200, 0, 'Success', records)
  } catch (error) {
    return next(error) 
  }
}

module.exports = getRecords;
