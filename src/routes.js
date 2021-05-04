const express = require('express')
const app = express()

app.get('/', (req, res) => {
    return res.json({ message: 'Oiee' })
})

module.exports = app