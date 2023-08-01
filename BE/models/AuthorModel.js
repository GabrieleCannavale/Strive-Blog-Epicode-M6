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

	password: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true,
		unique: true
	},

	birthDate: {
		type: String,
		required: true,
	},

	avatar: {
		type: String,
		required: true,
	},

	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			default: []
		}
	]
	
},{timestamps: true, strict: true})

module.exports = mongoose.model('Author', AuthorModelSchema, "authors");
