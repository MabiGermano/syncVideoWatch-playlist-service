const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(routes)

app.listen('3334', () => console.log("ouvindo a 3334"))