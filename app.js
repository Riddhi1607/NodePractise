const express = require('express')
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter')
const userRouter = require('./routes/userRouter')

const app = express();

app.use(express.json())

// Custom Middlewares
app.use((req, res, next) => {
    //console.log(req);
    if (req.body) {
        console.log(req.body);
    };
    if (req.params) {
        console.log(req.params);
    };
    next();
});

app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});
console.log(process.env.NODE_ENV)
console.log(process.env.NODE_ENV === 'development')
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
////////////////////////////////////////

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

