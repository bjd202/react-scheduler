const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')

const session = require('express-session')

app.use(cors());

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const user_router = require('./routers/user');

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api/user', user_router);

mongoose.connect('mongodb://localhost:27017/react-scheduler', {
    useNewUrlParser: true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false
})
.then(() => console.log('db conneted'))
.catch(() => console.log('db error'))

app.listen(port, () => console.log(`start server port : ${port}`))