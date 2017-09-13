import jwt from 'jsonwebtoken';

export const verifyUserSession = (req, res, next) => {
	const token = req.body.token || req.headers.token || req.query.token;
	// if no token found --> 
	if ( !token ) {
		return res.status(401).json({success: false, message: 'An authorization token is required!'});
	} else {
    
		// Check if token matches the one provided at login
		jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
			if (err) {
				if (err.name === 'TokenExpiredError')
					return res.status(401).json({success: false, message: 'Session has expired, Please sign-in again'});
				
				return res.status(401).json({success: false, message: 'Failed to authenticate token'});
			}
			
			// if no error at all
			req.userId = decoded.user.id;
			next();
		});
	}
};
