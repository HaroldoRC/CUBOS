const port = 1337

const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))
app.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})
app.listen(port, ()=> console.log(`Backend is running on port ${port}.`))

