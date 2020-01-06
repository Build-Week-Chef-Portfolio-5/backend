const db = require('../data/db-config');

module.exports = {
    getAllPosts,
    update,
    getPostByIdAllInfo,
    getPostById,
    remove
}


function getAllPosts() {
    return db('posts as p')
        .select('p.id', 'p.image_url', 'p.title', 'p.meal_type', 'p.ingredients', 'p.instructions', 'p.chef_id', 'c.name', 'c.location', 'c.contact_info')
        .join('chefs as c', 'p.chef_id', '=', 'c.id')
        .orderBy('p.chef_id');
}

function update(id, changes) {
    return db('posts')
        .where('id', id)
        .update(changes)
        .then(count => {
            if (count > 0) {
                return getPostByIdAllInfo(id);
            }
        })
}

function getPostByIdAllInfo(id) {
    return db('posts')
    .where({ id })
    .first();
}

function getPostById(id) {
    return db('posts')
        .select('image_url', 'title', 'instructions')
        .where({ id })
        .first();
}

function remove(id) {
    let deletedPost = {};
    db('posts')
    .where({ id })
    .first()
    .then(post => {
        deletedPost = post; 
    });
    return db('posts')
        .where('id', id)
        .del()
        .then(count => {
            if (count > 0) {
                return deletedPost;
            }
        });
}