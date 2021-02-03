const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const result =  dotenv.config();

// routes

const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
// app

const app = express();

// DATABASE CONNECTION

mongoose.connect("mongodb://127.0.0.1:27017/seoblog?authSource=admin", {
    useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true
}).then(() => console.log('database connected!!'));

//  middlewares

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// cors 
// if (process.env.NODE_ENV == 'development'){
//     app.use(cors({origin: '${process.env.CLIENT_URL}'}));
// }

app.use(cors({origin: 'http://localhost:3000'}));

// app routes
app.use('/api',blogRoutes);
app.use('/api', authRoutes);

// used port
// const port = process.env.PORT || 8000;
const port = 8000;

app.listen(port, ()=> {
    console.log('server is running on port: '+ port);
});
