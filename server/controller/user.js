import db from '../models';

const { User } = db;

// Create users.
export function createUser(req, res) {
	return User
		.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
		})
		.then(user => res.status(201)
		.send(user))
		.catch(error => res.status(400).send({error: error.message}))
	};


// Sign in users
export function loginUser(req, res) {
	return User
    .findOne({
      where: { username: req.body.username,
      password: req.body.password},
    })
    .then( user => {

    	if (user) {
    	  // console.log(user)
    	  console.log(req.session);
    	  req.session.user = user;

	      res.status(200).send({
	        message: 'Successfully Logged in!'
	          })
	    } else {
	    res.status(401).send({ message: 'Wrong password or username!' });
		}
     })  
    .catch(err => res.status(400).send({
    	error: err.message
    }));
};


// Logout user
export function logoutUser(req, res) {
	console.log(req.session.user);
	if (req.session.user) {
		req.session.destroy()
	res.status(200).send({message: `Thanks for your time, Bye for now`})
	} else {
		res.status(404).send({message: `Sorry, you are not logged in`})
	}
}


export function getAllUser(req, res) {
	return User 
		.all()
		.then(user => res.status(200).send(user))
		.catch(error => res.status(400)
		.send({error: error.message}))
	};