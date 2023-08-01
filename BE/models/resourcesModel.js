const mongoose = require("mongoose");

const resourcesModuleSchema = new mongoose.Schema({
	index: {
		type: Number,
		required: true,
	},

	guid: {
		type: String,
		required: false,
	},

	isActive: {
		type: Boolean,
		required: true,
	},

	balance: {
		type: String,
		required: true,
	},

	picture: {
		type: String,
		required: true,
	},

	age: {
		type: String,
		required: true,
	},

	eyeColor: {
		type: String,
		required: false,
	},

	name: {
		first:{
			type: String,
			required: true,
		},
		last: {
			type: String,
			required: true,
		}
	},

	company: {
		type: String,
		required: false,
	},

	email: {
		type: String,
		required: true,
	},

	phone: {
		type: String,
		required: false,
	},

	address: {
		type: String,
		required: true
	},

	about: {
		type: String,
		required: true
	},

	registered: {
		type: String,
		required: true
	},

	latitude: {
		type: String,
		required: false
	},
	
	longitude: {
		type: String,
		required: false	
	},

	tags: {
		type: Array,
		required: true,
	},

	range: {
		type: Array,
		required: true,
	},

	friends: {
		type: Array,
		required: true,
	},

	greeting: {
		type: String,
		required: true,
	},

	favoriteFruit: {
		type: String,
		required: false,
	},
}, {timestamps: true, strict: true});


module.exports = mongoose.model("Rescoruces", resourcesModuleSchema, "resources" )