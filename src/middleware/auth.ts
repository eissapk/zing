import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
	console.log("verify token");

	if (!req.token) return res.status(401).json({ error: true, message: "Unauthorized: No token provided" });

	try {
		jwt.verify(req.token, JWT_SECRET); // verify the token with the secret
		next();
	} catch (err) {
		return res.status(401).json({ error: true, message: "Request is not authorized" });
	}
};

export default auth;
