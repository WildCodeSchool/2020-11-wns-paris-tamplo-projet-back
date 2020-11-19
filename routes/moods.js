const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()

const connection = require('../config/database')

router.get('/', (req, res) => {
  const mdp = req.query.mdp
  if (mdp !== process.env.PWD_TEACHER) {
    return res.status(401).json({ message: 'Restricted Access!' })
  }
  connection.query(
    'SELECT *, DATE_FORMAT(mood.date, "%Y %m %d") as date FROM student JOIN mood ON student.id=mood.student_id;',
    (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Impossible de récupérer les données' })
      } else {
        res.json(results)
      }
    }
  )
})

router.post('/', (req, res) => {
  const formData = req.body
  connection.query('INSERT INTO mood SET ?;', formData, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Impossible d'ajouter ton mood !" })
    } else {
      res.json(results)
    }
  })
})

module.exports = router
