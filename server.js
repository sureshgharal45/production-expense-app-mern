const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const path = require('path')
const connectDB = require('./config/connectDB');

//config dot env file
dotenv.config();

//databse call
connectDB();

//rest object
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
//users router
app.use('/api/v1/users', require('./routes/userRoute'));
//transaction routes
app.use('/api/v1/transactions', require('./routes/transactionRoutes'));

//static files
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, '.client/build/index.html'));
});

const PORT = 8080 || process.env.PORT

//listen server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

