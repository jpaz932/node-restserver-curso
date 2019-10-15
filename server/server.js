require('./config/config')

const express  = require('express')
const mongoose = require('mongoose')

const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(process.env.PORT)

app.use(require('./routes/usuario'))

mongoose.connect(process.env.NODE_URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
