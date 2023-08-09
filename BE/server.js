const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');

const PORT = 5051;

//routes requires
const authorsRoute = require('./routes/authors');
const postsRoute = require("./routes/posts");
const commentRoute = require('./routes/comments');
const loginRoute = require("./routes/login");
const githubRoute = require("./routes/githubRoutes")
//middlewares requires
const logger = require('./middlewares/logger');
const commentModel = require('./models/commentModel');

const app = express()

//middlewares
app.use(cors());
app.use(express.json());
app.use(logger);



//use routes
app.use('/', authorsRoute);
app.use('/', postsRoute);
app.use('/', commentRoute);
app.use("/", loginRoute);
app.use("/", githubRoute);


mongoose.connect(process.env.MONGO_DB_URL);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));




//ultima riga(CONTROLLO)
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
})