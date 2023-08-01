const mongoose = require("mongoose");

const commentModelSchema = new mongoose.Schema(
	{
		userName: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Author",
		}],

		postId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		},

		rating:{
			type: Number,
			required: true,
			min: 1,
			max: 5,
			default: 1,
		},

		content: {
			type: String,
			required: true,
		},
	}, {timestamps:true, strict:true});

	module.exports = mongoose.model("Comment", commentModelSchema, "comments")