const { Record }  = require('../../config/db')
const ResMsg = require('../../utils')

const getRecords = async (req, res, next) => {
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
          totalCount: { $lte: req.body.maxCount, $gte: req.body.minCount },
          createdAt: { $gte: new Date(req.body.startDate), $lte: new Date(req.body.endDate) },
        },
      },
      { $unset: '_id' },

    ])
    return ResMsg(res, 200, 0, 'Success', records)
  } catch (error) {
    return next(error) 
  }
}

module.exports = getRecords;
