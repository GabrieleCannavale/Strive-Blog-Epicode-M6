const express = require('express');
const PostsModel = require('../models/postModel');
const AuthorModel = require('../models/AuthorModel');
const post = express.Router();

//middlewares
const verifyToken = require("../middlewares/verifyToken")
const PostImages = require("../middlewares/uploadPostImage");


post.get("/posts", async (req, res) => {
	const { page = 1, pageSize = 100 } = req.query;
	try {
		const posts = await PostsModel.find()
			.limit(pageSize)
			.skip((page - 1) * pageSize)
			.populate("author", "name secondName avatar")
			.populate("comments", "content rating userName")

		const totalPosts = await PostsModel.count()

		res.status(200).send({
			statusCode: 200,
			totalPosts: totalPosts,
			currentPage: +page,
			pageSize: +pageSize,
			totalPages: Math.ceil(totalPosts / pageSize),
			posts: posts,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server Error",
			error
		});
	}
});

post.get("/posts/title", async (req, res) => {
	const { postTitle } = req.query;

	try {
		const postByTitle = await PostsModel.find({
			title: {
				$regex: ".*" + postTitle + ".*",
				$options: "i",
			},
		});

		if (!postByTitle || postByTitle.length <= 0) {
			return res.status(404).send({
				statusCode: 404,
				message: `Post with title ${postTitle} not found!`
			});
		}

		res.status(200).send({
			statusCode: 200,
			postByTitle,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server Error",
			error,
		});
	}
})

post.get("/posts/:postId", async (req, res) => {
	const { postId } = req.params;

	try {
		const postById = await PostsModel.findById(postId);

		res.status(200).send({
			statusCode: 200,
			postById
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server Error",
			error
		});
	}
});

post.post("/posts/create", PostImages.single('cover'), async (req, res) => {
	
	

	const user = await AuthorModel.findOne({ _id: req.body.author })
	
	if (!user) {
		return res.status(404).send({
			statusCode: 404,
			message: "404 error"
		})
	};



	const newPost = new PostsModel({
		category: req.body.category,
		title: req.body.title,
		cover: req.file.path,
		readTime: req.body.readTime,
		author: user._id,
		content: req.body.content,
	});

	try {
		const post = await newPost.save();
		console.log(post);
		await AuthorModel.updateOne({ _id: user.id }, { $push: { posts: post } })
		res.status(201).send({
			statusCode: 201,
			message: "Post saved successfully",
			payload: post,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: 'internal server error!!!!!',
			error
		});
	}
});

post.patch("/posts/:id", async (req, res) => {
	const { id } = req.params;

	const postExist = await PostsModel.findById(id);
	if (!postExist) {
		return res.status(404).send({
			statusCode: 404,
			message: `Post with id ${id} not found!`,
		});
	}

	try {
		const postId = id;
		const dataToUpdate = req.body;
		const options = { new: true };

		const result = await PostsModel.findByIdAndUpdate(
			postId,
			dataToUpdate,
			options
		);

		res.status(200).send({
			statusCode: 200,
			message: `Post with id ${id} modified successfully!`,
			result
		})
	} catch (error) {
		res.status(500).send({
			satusCode: 200,
			message: 'Internal Server error',
			error,
		});
	}
});

post.delete("/posts/:id", async (req, res) => {
	const { id } = req.params;

	const postExist = await PostsModel.findById(id);

	if (!postExist) {
		return res.status(404).send({
			statusCode: 404,
			message: `Post with id ${id} not found!`,
		});
	}

	try {
		const postToDelete = await PostsModel.findByIdAndDelete(id);

		res.status(200).send({
			statusCode: 200,
			message: `Post with is ${id} deleted successfully!`
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: 'internal Server error'
		});
	}

});

module.exports = post;
