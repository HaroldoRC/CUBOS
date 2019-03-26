const basePath = require('../consts')
const filename = `${basePath}/data/rules.json`
let rules = require(filename)

const mustBeInteger = (req, res, next) => {
    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer', success: false })
    } else {
        next()
    }
}

const checkFieldsRule = (req, res, next) => {
    const { type, days, date, intervals } = req.body
    switch (type) {
        case 'daily':
            if(intervals){
                rules.forEach(rule => {
                    if(rule.type === 'daily')
                        res.status(400).json({ message: 'there is already a daily rule', success: false })
                })
                next()
            }
            break;
        case 'weekly':
            if(days && intervals){
                rules.forEach(rule => {
                    if(rule.type === 'weekly'){
                        rule.days.forEach(day => {
                            days.forEach(reqDay => {
                                if(day === reqDay)
                                    res.status(400).json({ message: `there is already a rule for this day of the week #${reqDay}`, success: false })
                            })
                        })
                    }

                })
                next()
            }
            break;
        case 'specific':
            if(date && intervals){
                rules.forEach(rule => {
                    if(rule.date === date)
                        res.status(400).json({ message: 'there is already a rule for this date', success: false })
                })
                next()
            }
            break;
        default:
            res.status(400).json({ message: 'rule fields are not good', success: false })
            break;
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsRule
}