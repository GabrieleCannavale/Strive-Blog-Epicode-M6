const express = require('express');
const login = express.Router();
const AuthorModel = require('../models/AuthorModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

login.post("/login", async (req, res) => {
	const user = await AuthorModel.findOne({email: req.body.email});
	console.log(user);
	if(!user) {
		return res.status(404).send({
			statusCode:404,
			message: "LOGIN ERROR, pw or user not found!"
		})
	};

	const validPassword = await bcrypt.compare(req.body.password, user.password);

	if (!validPassword) {
		return res.status(404).send({
			statusCode:404,
			message: "LOGIN ERROR, pw or user not found!"
		})
	};

	const token = jwt.sign({
		name: user.name,
		secondName: user.secondName,
		email: user.email,
		birthDate: user.birthDate,
		avatar: user.avatar,
		id: user._id,
	},
	process.env.JWT_SECRET, {expiresIn:"12h"}
	);
	res.header("Authorization", token).status(200).send({
		statusCode: 200,
		message: "Login effettuato con successo",
		token
	});
});

module.exports = login;