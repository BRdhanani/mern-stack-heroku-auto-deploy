const express = require('express');

const router = express.Router();

const BlogPost = require('../models/blogPosts');

router.get('/', (req, res) => {
	const data = {
		id: 1,
		title: 'hello world'
	};

	BlogPost.find({ })
	.then((data) => {
		console.log('Data: ', data)
		res.json(data);
	})
	.catch((error) => {
		console.log('error: ', error)
	});
});

router.post('/add', (req, res) => {
	const data = req.body;

	const newBlogPost = new BlogPost(data);

	newBlogPost.save((error) => {
		if(error) {
			res.status(500).json({msg: 'There is some internal serve error'});
			return;
		}
		return res.json({
				msg: "Your data has been saved"
			});
	})
	res.json({
		msg: "Your data has been added"
	});
});

router.delete('/delete/:id', (req, res) => {
	BlogPost.findById(req.params.id)
	.then(BlogPost => BlogPost.remove().then(() => res.json({msg: "Your data has been deleted"})))
	.catch(error => res.status(404).json({msg: "Error deleting data"}));
});

module.exports = router;