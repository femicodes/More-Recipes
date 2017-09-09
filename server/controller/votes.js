import db from '../models';

const { Vote, Recipe } = db;

// upvote a recipe
// POST --> users/upvote/:recipeId

export const voteRecipe = (req, res, next) => {
	const recipeId = parseInt(req.params.recipeId);

	const { voteType } = req.params;
	const {userId} = req;


	if ( voteType !== 'down' && voteType !== 'up' ) 
		return res.status(400).send({
			success: false,
			message: 'invalid vote type'
		});
	
	Recipe
		.find({
			where: {id: recipeId, userId}
		})
		.then( recipe => {
			console.log('in then statement')
			// console.log(recipe)

			if (recipe) {
				// console.log('\n\ninside if statement\n\n');
				return res.status(200).json({success: false, message: 'Cant vote on own recipe'});
				
			} else {

				// store upvotes as true and downvote as false --> basically convert vote to boolean
				// stores true when upvote and false when downvote
				console.log('\n\nstill running\n\n')
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

							if (userVote.dataValues.voteType === voteCond) {
								return Vote
									.findById(userVote.id)
									.then( vote => vote
										.destroy()
										.then( () => {
											
											next();
										}));
								// .catch( () => res.status(500).json({success: false, message: 'Error'})));
							} 

							return Vote 
								.findById(userVote.id)
								.then( vote => vote.update({
									voteType: voteCond
								}).then( () => {
									// res.status(200).json({success: true, message:`${voteType}vote have been recorded successfully`});
									next();
								}));
						}
						// .catch();
						
						return Vote
							.create({recipeId, userId, voteType: voteCond})
							.then( () => {
								// res.status(200).json({success: true, message: `${voteType}vote has been recorded successfully`});
								next();
							});
						// .catch( (err) => res.status(500).json({success: false, message: err}));
					});
				}
			})
};



// count vote ! 
export const countVote = (req, res) => {
	console.log('Entering application\n\n\n')
	const {userId} = req;
	const recipeId = parseInt(req.params.recipeId);


	Vote
		.findAll({
			where: {
				recipeId: recipeId
			}
		})
		.then( votes => {
			// console.log(votes);
			const upvoteCount = votes.filter( vote => vote.voteType === true).length;
			const downvoteCount = votes.filter( vote => vote.voteType === false).length;
			// console.log(upvoteCount, downvoteCount);

			Recipe
				.findById(recipeId)
				.then( recipe => recipe.update({upvoteCount,downvoteCount})
					.then( recipe => {
						res.status(200).json({ success: true,
							recipe
						});
					})
				);
		})
		.catch( () => res.status(500).json({success: false, message: 'cant vote recipe'}));
				
	// return { upvoteCount, downvoteCount };
	// .catch( (err) => res.status(500).json({success: false, message: err}));

};
