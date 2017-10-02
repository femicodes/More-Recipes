
import { expect } from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';

process.env.NODE_ENV = 'test';

const rootURL = '/api/v1';
const recipesUrl = `${rootURL}/recipes`;
const usersUrl = `${rootURL}/users`;


let data = {};
const request = supertest(app);

describe('API Integration Tests', () => {
	it('Should return home page', (done) => {
		// calling home page api
		request.get('/api/v1/')
			.end(function(err, res){
				// console.log(res);
				expect(res.status).to.equal(200); 
				expect(res.body.message).to.equal('Welcome to More Recipes');
				expect(res.body.success).to.equal(true);
				done();
			});
	});

	describe('User signup', () => {
		const signupURl = `${rootURL}/users/signup`;
	
		beforeEach(() => {
			data = {
				username: 'user1',
				password: 'password',
				email: 'example@user.com',
			};
		});
		
		it('return 201 for a successful account creation', (done) => {
			
			request.post(signupURl)
				.send(data)
				.end((err, res) => {
					// console.log(res);
					expect(res.status).to.equal(201);
					expect(res.body.success).to.equal(true);
					expect(res.body.message).to.equal('Account created successfully');
					done();
				});
		});

		it('return 400 for an already existing email ', (done) => {
			const invalidData = Object.assign({}, data);
			invalidData.username = 'user2';
			request.post(signupURl)
				.send(invalidData)
				.end((err, res) => {
					expect(res.status).to.equal(400);
					expect(res.body.success).to.equal(false);
					expect(res.body.message).to.equal('Email is already taken, please enter another');
					done();
				});
		});
		


		it('return 422 for an empty username ', (done) => {
			const invalidData = Object.assign({}, data);
			invalidData.username = ' ';

			request.post(signupURl)
				.send(invalidData)
				.end((err, res) => {
					expect(res.status).to.equal(422);
					expect(res.body.message).to.equal('Username is required');
					done();
				});
		});

		it('return 422 for an empty email ', (done) => {
			const invalidData = Object.assign({}, data);
			invalidData.email = '  ';

			request.post(signupURl)
				.send(invalidData)
				.end((err, res) => {
					expect(res.status).to.equal(422);
					expect(res.body.message).to.equal('Email is required');
					done();
				});
		});

		it('return 422 for an empty password', (done) => {
			const invalidData = Object.assign({}, data);
			invalidData.password = ' ';

			request.post(signupURl)
				.send(invalidData)
				.end((err, res) => {
					expect(res.status).to.equal(422);
					expect(res.body.message).to.equal('Password is required');
					done();
				});
		});

		it('return 422 for an invalid email', (done) => {
			const invalidData = Object.assign({}, data);
			invalidData.email = 'invalidemail';

			request.post(signupURl)
				.send(invalidData)
				.end((err, res) => {
					expect(res.status).to.equal(422);
					expect(res.body.message).to.equal('invalid email address');
					done();
				});
		});

		it('return 422 for a password less than 6 characters', (done) => {
			const invalidData = Object.assign({}, data);
			invalidData.password = 'pass';

			request.post(signupURl)
				.send(invalidData)
				.end((err, res) => {
					expect(res.status).to.equal(422);
					expect(res.body.message).to.equal('Password must be atleast 6 characters long!');
					done();
				});
		});

		
	});

});
