import jwt from 'jsonwebtoken';

export const verifyUserSession = (req, res, next) => {
	const token = req.body.token || req.headers.token || req.query.token;
	// console.log(token);
	// if no token --> 
	if ( !token ) {
		return res.status(500).json({success: false, message: 'Token is required!'});
	} else {
    
		// Check if token matches the one provided at login
		jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
			if (err) {
				if (err.message === 'TokenExpiredError')
					return res.status(500).json({success: false, message: 'Session has expired, Please sign-in again'});
				
				return res.status(500).json({success: false, message: 'Failed to authenticate token'});
			}
			
			// if no error at all
			req.userId = decoded.user.id;
			next();
		});
	}
};
