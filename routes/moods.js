const express = require('express')
const router = express.Router()

const connection = require('../config/database')

router.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM student JOIN mood ON student.id=mood.student_id;',
    (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Impossible de récupérer les données' })
      } else {
        res.json(results)
      }
    }
  )
})

module.exports = router
