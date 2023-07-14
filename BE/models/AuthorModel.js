const mongoose = require('mongoose');


const AuthorModelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	secondName: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
	},

	dateBirth: {
		type: String,
		required: true,
	},

	avatar: {
		type: String,
		required: true,
	},
	
},{timestamps: true, strict: true})

module.exports = mongoose.model('Author', AuthorModelSchema, "authors");
