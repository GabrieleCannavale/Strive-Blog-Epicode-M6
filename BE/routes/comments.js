const express = require('express');
const CommentModel = require("../models/commentModel");
const PostsModel = require('../models/postModel');
const AuthorModel = require('../models/AuthorModel');
const postModel = require('../models/postModel');

const comment = express.Router();

comment.get("/comments", async (req, res) => {
	try {
		const comments = await CommentModel.find().populate("userName");

		if (!comments || comments.length === 0) {
			return res.status(404).send({
				statusCode: 404,
				message: "No Comments Found",
			});
		}

		res.status(200).send({
			statusCode: 200,
			TotalComments: comments.length,
			comments,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server error",
			error,
		});
	}
});

comment.get('/comments/post/:postId', async (req, res) => {
	try {
	  const comments = await CommentModel.find({ postId: req.params.postId }).populate('userName');
  
	  if (!comments || comments.length === 0) {
		return res.status(404).send({
		  statusCode: 404,
		  message: 'No Comments Found for this post',
		});
	  }
  
	  res.status(200).send({
		statusCode: 200,
		totalCount: comments.length,
		comments,
	  });
	} catch (error) {
	  res.status(500).send({
		statusCode: 500,
		message: 'Internal server error',
		error,
	  });
	}
  });


comment.post("/comments/create", async (req, res) => {

	const user = await AuthorModel.findOne({ _id: req.body.userName });
	const postId = await PostsModel.findOne({ _id: req.body.postId });

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
		await postModel.updateOne({ $push: { comments: comment } });

		res.status(201).send({
			statusCode: 201,
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

});



comment.patch("/comments/:commentId", async (req, res) => {
	const { commentId } = req.params;
	const commentExists = await commentsModel.findById(commentId);

	if (!commentExists) {
		return res.status(404).send({
			statuscode: 404,
			message: `Comment with id ${commentId} not found!`,
		});
	}

	try {
		const dataToUpdate = req.body;
		const options = { new: true };

		const result = await CommentModel.findByIdAndUpdate(commentId, dataToUpdate, options);

		res.status(200).send({
			statusCode: 200,
			message: "Updated successfully!",
			result,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server error",
			error,
		});
	}
});



comment.delete("/comments/:commentId", async (req, res) => {
	const { commentId } = req.params;
	const commentExists = await CommentModel.findById(commentId);

	if (!commentExists) {
		return res.status(404).send({
			statuscode: 404,
			message: `Comment with id ${commentId} not found`,
		});
	}

	try {
		const commentToDelete = await CommentModel.findByIdAndDelete(commentId);

		res.status(200).send({
			statusCode: 200,
			message: `Comment with id ${commentId} deleted successfully`,
			commentToDelete,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server error",
			error,
		});
	}
});




module.exports = comment;