const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// Connect to database
const databaseConnection = mongoose
  .connect(`mongodb://127.0.0.1:27017/${process.env.DB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true
  })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err))

module.exports = databaseConnection
