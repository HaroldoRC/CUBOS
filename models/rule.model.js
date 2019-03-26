const basePath = require('../consts')
const filename = `${basePath}/data/rules.json`
let rules = require(filename)
const helper = require('../helpers/helper')

const getRules = () => {
    return new Promise((resolve, reject) => {
        if (rules.length === 0) {
            reject({
                message: 'no rules available',
                status: 202
            })
        }
        resolve(rules)
    })
}

const getRule = (id) => {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(rules, id)
        .then(rule => resolve(rule))
        .catch(err => reject(err))
    })
}

const insertRule = (newRule) => {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(rules) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newRule = { ...id, ...date, ...newRule }
        rules.push(newRule)
        helper.writeJSONFile(filename, rules)
        resolve(newRule)
    })
}

const updateRule = (id, newRule) => {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(rules, id)
        .then(rule => {
            const index = rules.findIndex(p => p.id == rule.id)
            id = { id: rule.id }
            const date = {
                createdAt: rule.createdAt,
                updatedAt: helper.newDate()
            } 
            rules[index] = { ...id, ...date, ...newRule }
            helper.writeJSONFile(filename, rules)
            resolve(rules[index])
        })
        .catch(err => {
            return reject(err)
        })
    })
}

const deleteRule = (id) => {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(rules, id)
        .then(() => {
            rules = rules.filter(p => p.id !== Number(id))
            helper.writeJSONFile(filename, rules)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertRule,
    getRules,
    getRule, 
    updateRule,
    deleteRule
}