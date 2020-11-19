const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createPool(
  typeof process.env.CLEARDB_DATABASE_URL === 'string'
    ? process.env.CLEARDB_DATABASE_URL
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
      }
)

// // Test connection to the Database
connection.getConnection((err) => {
  if (err) {
    console.error('Error connecting to database', err)
  } else {
    console.log('Database is connected')
  }
})

module.exports = connection
