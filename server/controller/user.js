import db from '../models';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { User, Recipe } = db;

// Create users.
export const createUser = (req, res) => {

	let username = req.body.username? req.body.username.trim(): ''; 
	let email = req.body.email? req.body.email.trim(): '';
	let password = req.body.password ? req.body.password.trim(): '';

	const EMAIL_REGEXP = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	const USERNAME_REGEXP = /^(\w){3,15}$/;

	let err_msg;
	if (username === ''){
		err_msg = 'Username is required';
	} else if (email === '') {
		err_msg = 'Email is required';
	} else if ( !USERNAME_REGEXP.test(username) ) {
		err_msg = 'Username must be atleast 3 characters long and alphanumeric';
	} else if (email.length <= 4 || email.length > 30 || !EMAIL_REGEXP.test(email)) {
		err_msg ='invalid email address';
	} else if (password === '') {
		err_msg = 'Password is required';
	} else if (password.length < 6) {
		err_msg = 'Password must be atleast 6 characters long!';
	}

	if (err_msg) 
		return res.status(422).json({success: false, message: err_msg});

	return User
		.create({
			username: username,
			email: email,
			password: bcryptjs.hashSync(password, 10),
			fullname: req.body.fullname
		})
		.then(user => {
			const token = jwt.sign({user}, process.env.SECRET_KEY, { expiresIn: '120m'});
			res.status(201).json({
				success: true,
				message: 'Account created successfully',
				id: user.id,
				username: user.username,
				email: user.email,
				token
			});
		})
		.catch(err => res.status(400).json({
			success: false,
			message: err.errors[0].message
		}));
};


//The username and password you entered did not match our records. Please double-check and try again.

// Sign in users
export const loginUser = (req, res) => {
	let username = req.body.username? req.body.username.trim(): ''; 
	let password = req.body.password;
	
	if ( !(username && password) ) 
		return res.status(400).json({success: false, message:'username and password are required'});

	return User
		.findOne({
			where: { 
				username: req.body.username,
			}
		})
		.then( user => { 
			const token = jwt.sign({user}, process.env.SECRET_KEY, { expiresIn: '120m'});
			bcryptjs.compare(password, user.password).then( check => {
				if (check) {
					// console.log(req.userId); 
					res.status(200).json({
						success: true,
						message: 'Logged in Successfully!',
						token
					});
				} else res.status(401).json({
					success: false,
					message: 'Wrong username and password!'
				});
			}).catch(err => res.status(400).json({
				success: false,
				message: err.errors[0].message}));
		});
};


export const getUserRecipes = (req, res) => {
	const { userId } = req.params;
	// console.log(userId);
	Recipe
		.findAll({
			where: {
				userId
			}
		})
		.then( recipes => {
			const recipesCount =  recipes.length;
			// console.log(favorites);
			if ( recipesCount == 0 ) {
				return res.status(200).json({
					success:true,
					message: 'User has no recipes posted',
				});
			}
			return res.status(200).json({success: true, message: `${recipesCount} recipes posted`, recipes}); 
		})
		.catch( () => res.status(500).json({success: false, message: 'An error occured! '}));
};