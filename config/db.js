const { log } = require("debug");
const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const connectMongo = async () =>{
    mongoose.connect(process.env.DB_URL, {
        auth: { authSource: 'admin' },
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }, (error) => {
        !error ? log('Connected to database') : log('An error occurred while connecting to database: ', error.message)
      })
}

const recordSchema = new Schema({
    key: { type: String, default: 'hahaha' },
    createdAt: { type: Date },
    counts: { type: Array },
    value: { type: String },
  });

  
const Record = mongoose.model('record', recordSchema);
module.exports = { connectMongo, Record};