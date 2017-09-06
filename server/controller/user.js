import db from '../models';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { User } = db;

// Create users.
export function createUser(req, res) {
	const password = bcryptjs.hashSync(req.body.password, 10);
	return User
		.create({
			username: req.body.username,
			email: req.body.email,
			password: password
		})
		.then(user => res.status(201).send({
			id: user.id,
			username: user.username,
			email: user.email,
		}))
		.catch(err => res.status(400).send(
			err.errors[0].message
		));
}


// Sign in users
export function loginUser(req, res) {
	const {username, password} = req.body;
	// console.log(username, password);
	if ( !(username && password) ) {
		res.status(400).send('username and password required');
	}
	return User
		.findOne({
			where: { 
				username: req.body.username,
			}
		})
		.then( user => { 
			const token = jwt.sign({user}, process.env.SECRET_KEY, { expiresIn: '60m'});
			bcryptjs.compare(req.body.password, user.password).then( check => {
				if (check) {
					// console.log(req.userId); 
					res.status(200).send({
						message: 'Logged in Successfully!',
						token
					});
				} else res.status(401).send({
					message: 'Wrong password or username!'
				});
			}).catch(err => res.status(400).send(
				err.errors[0].message));
		});
}


// get favourite recipes 
export function getFavorites(req, res) {
	// something here
}

