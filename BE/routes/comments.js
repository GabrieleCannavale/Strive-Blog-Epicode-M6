const express = require('express');
const CommentModel = require("../models/commentModel");
const PostsModel = require('../models/postModel');
const AuthorModel = require('../models/AuthorModel');
const postModel = require('../models/postModel');

const comment = express.Router();

comment.post("/comments/create", async (req, res) => {

	const user = await AuthorModel.findOne({_id: req.body.userName});
	const postId = await PostsModel.findOne({_id: req.body.postId});

	if (!user || !postId) {
		return res.status(404).send({
			statusCode: 404,
			message: "post and/or user not found! (404 error)"
		})
	};

	const newComment = new CommentModel({
		user: [user._id, user.name],
		content: req.body.content,
		rating: req.body.rating,
		postId: postId._id,
		
	});

	try {
		const comment = await newComment.save();
		await postModel.updateOne({$push: {comments: comment}});

		res.status(201).send({
			statusCode:201,
			message: "Comments saved successfully",
			payload: comment,
		});

	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: 'internal server error',
			error
		});
	}

})

module.exports = comment;