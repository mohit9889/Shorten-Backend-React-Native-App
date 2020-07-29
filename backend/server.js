const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect to database
connectDB();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.use(express.json());

app.use(express.urlencoded({extended: true}));

//Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

app.listen(process.env.PORT || 5000, () => console.log("Server runnig on PORT 5000"));