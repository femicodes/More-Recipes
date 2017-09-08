import db from '../models';

const { Review } = db;

// GET --> api/recipes/<recipeId>/reviews
export const getReviews = (req, res) => {
	const {recipeId} = req.params;

	Review
		.findAll({
			attributes: ['id', 'body', 'createdAt', 'updatedAt'],
			where: {
				recipeId
			}
		})
		.then( reviews => {
			if (reviews.length == 0)
				return res.status(404).json({success: true, message: 'No review found for this recipe'});
			return res.status(201).json(reviews);
		})
		.catch(err => res.status(404).json(err));
};

// --> api/recipes/<recipeId>/reviews
export const postReview = (req, res) => {
	const { userId } = req;
	const { content } = req.body; 

	const { recipeId } = req.params;

	// check if the content of the review is valid 
	if ( !content || !content.trim() ) 
		return res.status(400).json({success: false, message: 'Review cannot be empty'});
	// check if the user have posted a review on the recipe before
	// a user can only post a review once. 
	Review
		.findOne({
			where: {
				recipeId, userId
			}
		})
		.then( review => {
			if (review) {
				return res.status(403).json({success: false, message: 'You already wrote a review for this recipe'});
			} else {
				return Review.create({
					userId,
					recipeId,
					body: content
				})
					.then( () => res.status(200).json({success: true, message: 'Your review have been recorded successfully'}))
					.catch(err => res.statu(500).json(err));
			}
		})
		.catch( err => {
			return res.status(500).json(err);
		});
};