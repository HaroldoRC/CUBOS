const basePath = require('../consts')
const moment = require('moment');
const filename = `${basePath}/data/rules.json`
let rules = require(filename)

const getSchedules = (period) => {
    return new Promise((resolve, reject) => {
        if (rules.length === 0) {
            reject({
                message: 'no rules available to get Schedules',
                status: 202
            })
        }

        let { DataDe, DataAte } = period
        let diaDoAnoDe = moment(DataDe, 'DD-MM-YYYY').dayOfYear()
        let diaDoAnoAte = moment(DataAte, 'DD-MM-YYYY').dayOfYear()
        
        let Schedules = Array()

        for (let index = diaDoAnoDe; index <= diaDoAnoAte; index++) {
            let date = moment().dayOfYear(index)
            let dayIntervals = Array()
            let flag = 'daily'
            rules.forEach(rule => {
                if (rule.type === 'daily')
                    if(flag === 'daily'){
                        dayIntervals = rule.intervals
                    }
                if (rule.type === 'weekly')
                    rule.days.forEach(day => {
                        if(day === date.weekday())
                            if(flag === 'daily' || flag === 'weekly'){
                                dayIntervals = rule.intervals
                                flag = 'weekly'
                            }
                    })
                if (rule.type === 'specific')
                    if(rule.date === date.format('DD-MM-YYYY')){
                        dayIntervals = rule.intervals
                        flag = 'specific'
                    }
            })
            let day = {
                day: date.format('DD-MM-YYYY'),
                intervals: dayIntervals
            }
            Schedules.push(day)
        }
        let result = {
            Schedules
        }

        resolve(result)
    })
}
module.exports = {
    getSchedules
}