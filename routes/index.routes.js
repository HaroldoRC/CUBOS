const express = require('express')
const router = express.Router()
module.exports = router
router.use('/api/rules', require('./rules.routes'))
router.use('/api/schedules', require('./schedules.routes'))