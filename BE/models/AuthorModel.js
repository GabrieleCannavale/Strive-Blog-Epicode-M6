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
		required: false,
		default: "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-image-700-205124837.jpg"
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
