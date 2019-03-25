const express = require('express')
const router = express.Router()
const schedule = require('../models/schedule.model')

/* All schedules */
router.get('/', async (req, res) => {
    await schedule.getSchedules(req.body)
    .then(schedules => res.json({schedules, success: true}))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message, success: false })
        } else {
            res.status(500).json({ message: err.message, success: false })
        }
    })
})

// Routes
module.exports = router
