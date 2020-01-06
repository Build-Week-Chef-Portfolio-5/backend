const express = require("express");
const authenticate = require('../auth/authenticate-middleware');
const router = express.Router();

const Posts = require('./posts-model');


// GET ALL POSTS FOR ALL CHEFS
router.get('/', (req, res) => {
    Posts.getAllPosts()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Failed to get posts' })
    })
});


// GET SPECIFIC POST
router.get('/:id', validatePostId, (req, res) => {
    const id = req.params.id;
    Posts.getPostById(id)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Could not find post with given id' })
    })
})


// EDIT POST FOR CHEF
router.put('/:id', authenticate, validatePostId, validatePost, (req, res) => {
    const id = req.params.id;
    const postData = req.body;
    Posts.update(id, postData)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'The post could not be modified.' })
    })
});


// DELETE POST FOR CHEF
router.delete('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    Posts.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(200).json(deleted);
        } else {
            res.status(404).json({ message: 'Could not find post with that id' });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'Failed to delete post' });
    })
})



// ----------------------- CUSTOM MIDDLEWARE ------------------------ //
function validatePostId(req, res, next) {
    const id = req.params.id;
      Posts.getPostById(id) 
      .then(post => {
          if (post) {
              req.post = post;
              next();
          } else {
              res.status(404).json({ message: 'invalid post id' })
          }
      })
      .catch(error => {
            res.status(500).json({ error: 'The post could not be retrieved.' })
      })   
}


function validatePost(req, res, next) {
    const data = req.body;
    if (!data) {
        res.status(400).json({ error: 'missing data' })
    } else if (!data.title) {
        res.status(400).json({ error: 'missing required title' })
    } else if (!data.meal_type) {
        res.status(400).json({ error: 'missing required meal type' })
    } else if (!data.ingredients) {
        res.status(400).json({ error: 'missing required ingredients' })
    } else if (!data.instructions) {
        res.status(400).json({ error: 'missing required instructions' })
    } else {
        next();
    }
}

module.exports = router;