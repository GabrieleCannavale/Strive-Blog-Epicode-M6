const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authorsRoute = require('./routes/authors');

const app = express()
const PORT = 6060;

//middleware
app.use(express.json());
app.use('/', authorsRoute);



mongoose.connect(process.env.MONGO_DB_URL);

const db = mongoose.connection;




//ultima riga(CONTROLLO)
db.on('error', console.error.bind(console, 'connection error:'));
app.listen(PORT, () => {
	console.log(`Server started at ${PORT}`);
})