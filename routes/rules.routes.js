const express = require('express')
const router = express.Router()
const rule = require('../models/rule.model')
const m = require('../helpers/middlewares')

/* All rules */
router.get('/', async (req, res) => {
    await rule.getRules()
    .then(rules => res.json({rules, success: true}))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message, success: false })
        } else {
            res.status(500).json({ message: err.message, success: false })
        }
    })
})

/* Update a rule */
router.put('/:id', m.mustBeInteger, m.checkFieldsRule, async (req, res) => {
    const id = req.params.id
    await rule.updateRule(id, req.body)
    .then(rule => res.json({
        message: `The rule #${id} has been updated`,
        rule,
        success: true
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message, success: false })
        }
        res.status(500).json({ message: err.message, success: false })
    })
})

/* Insert a new rule */
router.post('/', m.checkFieldsRule, async (req, res) => {
    await rule.insertRule(req.body)
    .then(rule => res.status(201).json({
        message: `The rule #${rule.id} has been created`,
        rule,
        success: true
    }))
    .catch(err => res.status(500).json({ message: err.message, success: false }))
})

/* Delete a rule */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    
    await rule.deleteRule(id)
    .then(rule => res.json({
        message: `The rule #${id} has been deleted`,
        success: true
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message, success: false })
        }
        res.status(500).json({ message: err.message, success: false })
    })
})

// Routes
module.exports = router
