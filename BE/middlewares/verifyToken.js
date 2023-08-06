const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
	const token = req.header("Authorization");
	if(!token) {
		return res.status(401).send({
			statusCode: 401,
			message: "unauthorized"
		});
	};

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;
		next();
	} catch (error) {
		res.status(403).send({
			statusCode: 403,
			messagge: "token not valid"
		})
	}
};

module.exports = verifyToken;
