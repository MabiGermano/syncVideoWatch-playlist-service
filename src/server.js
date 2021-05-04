const express = require('express')
const cors = require('cors')

const app = express()
const routes = express.Router()


routes.get('/', (req, res) => {
    return res.json({ message: 'Oiee' })
})

app.use(cors())
app.use(routes)

app.listen('3334', () => console.log("ouvindo a 3334"))