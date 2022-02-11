const express = require('express')
const router = require('./routes/router')
const cookie = require('cookie-parser')
const knex = require('./model/table')
require('dotenv').config()

// const swagger = require('swagger-ui-express')
// const swaggerFile = require('./swagger-ui.json')
const app = express()


// app.use('/', swagger.serve, swagger.setup(swaggerFile))
app.use(express.json())

app.use(cookie())
app.use('/', router)



app.listen(process.env.APP_PORT, () => {
    console.log('PORT listining:', process.env.APP_PORT);
})