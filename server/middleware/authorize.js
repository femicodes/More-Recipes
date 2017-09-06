import jwt from 'jsonwebtoken';

export function verifyUserSession(req, res, next) {
	const token = req.body.token || req.headers.token || req.query.token;
	// console.log(token);
	// if not token
	if (!token) {
		res.status(401).send('Session token is required!');
	} else {
    
		// Check if token matches the one provided at login
		jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
			if (err) {
				res.status(500).send(err);
			} else {
				// console.log("verified");
				// console.log(decoded.user.id);
				req.userId = decoded.user.id;
				next();
			}
		});
	}
}
