import db from '../models';

const { Vote } = db;

// upvote a recipe
// POST --> users/upvote/:recipeId

// export function upvoteRecipe(req, res) {
// 	const { recipeId } = req.params;
// 	const {userId} = req;

// 	Vote
// 		.findAll({
// 			where: {
// 				recipeId
// 			}
// 		})
// 		.then (votes => {
// 			const alreadyVoted = votes.map( v => v.userId);
// 			if ( alreadyVoted.includes(userId) ) {
				
// 				const userVote = votes.filter(v => v.userId = userId )[0];
// 				if (userVote.VoteType) {
// 					Vote
// 						.findById(userVote.id)
// 						.then( vote => vote
// 							.destroy()
// 							.then( () => res.status(200).json({message: 'vote has beeen removed successfully'})));
// 				} else { 
// 					Vote 
// 						.findById(userVote.id)
// 						.then( vote => vote);
// 				}
// 			} else {
// 				// something in here 
// 			}
				
// 		})
// 		.catch( err => res.send(err));
// }


export function upvoteRecipe(req, res) {
	const { recipeId } = req.params;
	const {userId} = req;

	Vote
		.findOne({
			where: {
				userId, 
				recipeId
			}
		})
		.then( vote => {
			console.log(vote);
			// if find query is found then theres a vote recorded already ! 
			if ( vote ) {
				// if vote.votetype == true == upvote
				if ( vote.voteType === true ) {
					// removes vote if user have upvoted  
					return vote
						.destroy().then(res.status(200).send({
							success: true, message: 'Vote have been removed from recipe'
						}));
					// return res.status(500).send({status: false, message: 'You have already upvoted this recipe'});
				}
				return Vote 
					.update({
						userId, recipeId, 
						voteType: !vote.voteType
					})
					.then( () => res.status(200).send({status: true, message: 'upvote recorded successfully'}));
			}
			// if no vote found   C R E A T E   I T ! 
			return Vote 
				.create({
					userId,
					recipeId,
					voteType: true
				})
				.then( () => res.status(200).send({status: true, message: 'upvote recorded successfully'}));
		})
		.catch( (err) => res.status(500).send({message: err}));
}


export function downvoteRecipe(req, res) {
	const { recipeId } = req.params;
	const {userId} = req;

	Vote
		.findOne({
			where: {
				userId, 
				recipeId
			}
		})
		.then( vote => {
			// console.log(vote);
			// if find query is found then theres a vote recorded already ! 
			if ( vote ) {
				// if vote.votetype == true == upvote
				if ( vote.voteType === true ) {
					// removes vote if user have upvoted  
					return vote
						.destroy().then(res.status(200).send({
							success: true, message: 'Vote have been removed from recipe'
						}));
					// return res.status(500).send({status: false, message: 'You have already upvoted this recipe'});
				}
				return Vote 
					.update({
						userId, recipeId, 
						voteType: !vote.voteType
					})
					.then( () => res.status(200).send({status: true, message: 'downvote recorded successfully'}));
			}
			
			return Vote 
				.create({
					userId,
					recipeId,
					voteType: false
				})
				.then( () => res.status(200).send({status: true, message: 'downvote recorded successfully'}));
		})
		.catch( (err) => res.status(500).send({message: err}));
}

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