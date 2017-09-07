import db from '../models';

const { Vote } = db;

// upvote a recipe
// POST --> users/upvote/:recipeId

export function voteRecipe(req, res) {
	const { recipeId, voteType } = req.params;
	const {userId} = req;


	if ( voteType !== 'down' && voteType !== 'up' ) 
		return res.status(400).send({
			success: false,
			message: 'invalid vote type'
		});

	// store upvotes as true and downvote as false --> basically convert vote to boolean
	// stores true when upvote and false when downvote
	const voteCond = voteType === 'up' ? true: false;
	Vote
		.findAll({
			where: {
				recipeId
			}
		})
		.then (votes => {
			const alreadyVoted = votes.map( v => v.userId);
			if ( alreadyVoted.includes(userId) ) {
				
				const userVote = votes.filter(v => v.userId = userId )[0];
				// console.log(userVote);
				// console.log(`User vote type -----> ${typeof userVote.dataValues.voteType}`);

				// console.log(userVote.dataValues.VoteType === voteCond);

				if (userVote.dataValues.voteType === voteCond) {
					return Vote
						.findById(userVote.id)
						.then( vote => vote
							.destroy()
							.then( () => res.status(200).json({success: true, message: `${voteType}vote has beeen removed successfully`})));
				} 
				return Vote 
					.findById(userVote.id)
					.then( vote => vote.update({
						voteType: voteCond
					}).then( () => res.status(200).json({success: true, message:`${voteType}vote have been recorded successfully`}))
					)
					.catch();
			}
			return Vote
				.create({recipeId, userId, voteType: voteCond})
				.then( () => res.status(200).json({success: true, message: `${voteType}vote has been recorded successfully`}))
				.catch( (err) => res.status(200).json({success: false, message: err}));
		})
		.catch( () => res.status(500).json({success: false, message: 'cannot vote recipe'}));
}
					


// export function upvoteRecipe(req, res) {
// 	const { recipeId } = req.params;
// 	const {userId} = req;

// 	Vote
// 		.findOne({
// 			where: {
// 				userId, 
// 				recipeId
// 			}
// 		})
// 		.then( vote => {
// 			console.log(vote);
// 			// if find query is found then theres a vote recorded already ! 
// 			if ( vote ) {
// 				// if vote.votetype == true == upvote
// 				if ( vote.voteType === true ) {
// 					// removes vote if user have upvoted  
// 					return vote
// 						.destroy().then(res.status(200).send({
// 							success: true, message: 'Vote have been removed from recipe'
// 						}));
// 					// return res.status(500).send({status: false, message: 'You have already upvoted this recipe'});
// 				}
// 				return Vote 
// 					.update({
// 						userId, recipeId, 
// 						voteType: !vote.voteType
// 					})
// 					.then( () => res.status(200).send({status: true, message: 'upvote recorded successfully'}));
// 			}
// 			// if no vote found   C R E A T E   I T ! 
// 			return Vote 
// 				.create({
// 					userId,
// 					recipeId,
// 					voteType: true
// 				})
// 				.then( () => res.status(200).send({status: true, message: 'upvote recorded successfully'}));
// 		})
// 		.catch( (err) => res.status(500).send({message: err}));
// }


// export function downvoteRecipe(req, res) {
// 	const { recipeId } = req.params;
// 	const {userId} = req;

// 	Vote
// 		.findOne({
// 			where: {
// 				userId, 
// 				recipeId
// 			}
// 		})
// 		.then( vote => {
// 			// console.log(vote);
// 			// if find query is found then theres a vote recorded already ! 
// 			if ( vote ) {
// 				// if vote.votetype == true == upvote
// 				if ( vote.voteType === true ) {
// 					// removes vote if user have upvoted  
// 					return vote
// 						.destroy().then(res.status(200).send({
// 							success: true, message: 'Vote have been removed from recipe'
// 						}));
// 					// return res.status(500).send({status: false, message: 'You have already upvoted this recipe'});
// 				}
// 				return Vote 
// 					.update({
// 						userId, recipeId, 
// 						voteType: !vote.voteType
// 					})
// 					.then( () => res.status(200).send({status: true, message: 'downvote recorded successfully'}));
// 			}
			
// 			return Vote 
// 				.create({
// 					userId,
// 					recipeId,
// 					voteType: false
// 				})
// 				.then( () => res.status(200).send({status: true, message: 'downvote recorded successfully'}));
// 		})
// 		.catch( (err) => res.status(500).send({message: err}));
// }

// export function downvoteRecipe(req, res) {
// 	const { recipeId } = req.params;
// 	const {userId} = req;

// 	Vote
// 		.findOne({
// 			where: {
// 				userId, 
// 				recipeId
// 			}
// 		})
// 		.then( hasVoted => {

// 			if (hasVoted ) {
// 				console.log(hasVoted.voteType == false);
// 				if (hasVoted.voteType == false) {
// 					console.log('You have already voted for this recipe'); 
// 					return hasVoted
// 						.destroy().then(res.status(200).send({
// 							success: true, message: 'downvote have been removed from recipe'
// 						}));
// 					// return res.status(500).send({status: false, message: 'You have already upvoted this recipe'});
// 				} else {
// 					return Vote 
// 						.update({
// 							userId,
// 							recipeId,
// 							voteType: !hasVoted.voteType
// 						})
// 						.then( () => res.status(200).send({success: true, message: 'downvote recorded successfully'}));
// 				}
// 			} else {
// 				return Vote 
// 					.create({
// 						userId,
// 						recipeId,
// 						voteType: false
// 					})
// 					.then( () => res.status(200).send({success: true, message: 'downvote recorded successfully'}));
// 			}
// 		})
// 		.catch( (err) => res.status(500).send({message: err}));

// }


// export function downvoteRecipe(req, res) {
// 	const { recipeId } = req.params;
// 	const {userId} = req;

// 	Vote
// 		.findOne({
// 			where: {
// 				userId, 
// 				recipeId
// 			}
// 		})
// 		.then( hasVoted => {
// 			console.log(hasVoted.voteType);
// 			if (hasVoted ) {
// 				if ( !hasVoted.voteType ) {
// 					console.log('You have already voted for this recipe'); 
// 					return hasVoted
// 						.destroy().then(res.status(200).send({
// 							success: true, message: 'Vote have been removed from recipe'
// 						}));
// 					// return res.status(500).send({status: false, message: 'You have already upvoted this recipe'});
// 				} else {
// 					return Vote 
// 						.modify({
// 							userId,
// 							recipeId,
// 							voteType: !hasVoted.voteType
// 						})
// 						.then( () => res.status(200).send({status: true, message: 'upvote recorded successfully'}))
// 						.catch( (err) => res.status(500).send(err));
// 				}
			
// 			} else {
// 				return Vote 
// 					.create({
// 						userId,
// 						recipeId,
// 						voteType: false
// 					})
// 					.then( () => res.status(200).send({status: true, message: 'upvote recorded successfully'}));
// 			}
// 		})
// 		.catch( (err) => res.status(500).send({message: err}));
// }

// 	{
// 	if (!hasVoted || !hasVoted.voteType) {
// 		return Vote 
// 			.create({
// 				userId,
// 				recipeId,
// 				voteType: true
// 			})
// 			.then( () => res.status(200).send({status: true, message: 'upvote recorded successfully'}));
// 	} else {
// 		return hasVoted
// 			.destroy().then(res.status(200).send({
// 				success: true, message: 'Vote have been removed from recipe'
// 			}));

// 	}
// })