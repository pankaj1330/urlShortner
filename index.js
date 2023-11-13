require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/URL').then(() => { console.log('successfully connect to db'); }).catch((err) => { console.log(err); })

app.use(express.static('./public'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine','ejs');
app.set('views','./views')

const staticRouter = require('./routers/static');
const urlRouter = require('./routers/url');

app.use('/', staticRouter);
app.use('/', urlRouter);

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
})
