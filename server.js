const config = require('./config/config')
const connectDb = require("./config/db");
const express = require('express')
const app = express()
const routes = require('./routes/index')

app.listen(config.port, () => {
    console.log(`server is listening on port ${config.port}`)
})

connectDb();

app.use(express.json())
app.use('/api/', routes)
