const express = require('express');
const router = express.Router();
const AuthorModel = require('../models/AuthorModel');
const bcrypt = require("bcrypt");
const Avatar = require("../middlewares/uploadAvatar")



router.get('/authors', async (req, res) => {
	try {
		const authors = await AuthorModel.find()
			.populate("posts");
			console.log(authors)
		res.status(200).send({
		statusCode: 200,
		authors
	})
	} catch (error) {
		res.status(500).send({error: 'error, id not found'})
	}	
});


router.get('/authors/:id', async (req, res) => {
	const {id} = req.params;

	const authorExist = await AuthorModel.findById(id);
	
	if(!authorExist) {
		res.status(500).send({error: `author with id ${id} not found`})
	}

	try {
		const authorById = await AuthorModel.findById(id);
		res.status(200).send({
			statusCode: 200,
			authorById
		});
	} catch (error) {
		res.status(500).send({error: `internal server error :P`})
	}
	
});




router.post('/register/authors', Avatar.single("avatar"), async (req, res) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	console.log(req.body);
	const newAuthor = new AuthorModel({
		name: req.body.name,
		secondName: req.body.secondName,
		password: hashedPassword,
		email: req.body.email,
		birthDate: req.body.birthDate,
	});
	
	try{
		const author = await newAuthor.save();

		res.status(201).send({
			statusCode: 201,
			message: "Author saved successufully!",
			author
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "internal server error!", 
			error
		})
	}
})


router.put('/authors/:id', async (req, res) => {
	const {id} = req.params;

	const authorExist = await AuthorModel.findById(id);
	if(!authorExist) {
		res.status(500).send({error: `author with id ${id} not found`})
	}

	const modsForAuthor = new AuthorModel({
		name: req.body.name,
		secondName: req.body.secondName,
		email: req.body.email,
		avatar: req.body.avatar,
		dateBirth: req.body.dateBirth

	})

	try {
		const authId = id
		const authorPutted = await AuthorModel.findByIdAndUpdate(authId, modsForAuthor, authorFinal)
		const authorFinal = {new: true}

		res.status(200).send({
			statusCode:200,
			message: `author with ID ${authId} successfully modified!`,
			authorPutted
		})
	} catch (error) {
		res.status(500).send({error: `internal server error :P`})
	}
})

module.exports = router
