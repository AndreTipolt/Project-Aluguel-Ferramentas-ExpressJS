const dotenv = require("dotenv/config")
const express = require('express')
const handlebars = require('express-handlebars')

const app = express()
const conn = require('./db/conn')

const path = require('path')

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views/') )

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static('src/public'))


const client = require('./models/Client')
const tool = require('./models/Tool')
const rent_tool = require('./models/Rent_Tool')

const clientRouter = require('./routes/clientRouter')
const toolRouter = require('./routes/toolRouter')
const rentToolRouter = require('./routes/rentToolRouter')

app.use('/client', clientRouter)
app.use('/tool', toolRouter)
app.use('/rentTool', rentToolRouter)

app.get('/', (req, res) =>{
    return res.redirect('/rentTool/')
})

conn.sync().then(app.listen(process.env.PORT))