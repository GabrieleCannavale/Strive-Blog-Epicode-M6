const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const AuthorModel = require('../models/AuthorModel');



router.get('/authors', async (req, res) => {
	try {
		const authors = await AuthorModel.find();
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




router.post('/authors', async (req, res) => {
	const newAuthor = new AuthorModel({
		name: req.body.name,
		secondName: req.body.secondName,
		email: req.body.email,
		avatar: req.body.avatar,
		dateBirth: req.body.dateBirth

	})
	
	try {
		const author = await newAuthor.save()

		res.status(201).send({
			statusCode: 201,
			author,
			message: 'author creato con successo'
		})

	} catch (error) {
		res.status(500).send({error: `internal server error :P`})
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

//modulo