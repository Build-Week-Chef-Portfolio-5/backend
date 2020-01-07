const Posts = require('./posts-model');
const Chefs = require('../chefs/chefs-model');
const db = require('../data/db-config');


describe('Posts Model', function() {
    beforeEach(async () => {
        await db('posts').truncate();
    });

    describe('addPost()', function() {
        it ('should add a post', async function() {
            await Chefs.addPost({ image_url: 'test url', title: 'test title', meal_type: 'test meal', ingredients: 'test ingredients', instructions: 'test instructions', chef_id: 1 });

            const posts = await db('posts');
            expect(posts).toHaveLength(1);
        });

        it ('should add three different posts; does recipe test title 1 exist?', async function() {
            await Chefs.addPost({ image_url: 'test url1', title: 'test title1', meal_type: 'test meal1', ingredients: 'test ingredients1', instructions: 'test instructions1', chef_id: 1 });
            await Chefs.addPost({ image_url: 'test url2', title: 'test title2', meal_type: 'test meal2', ingredients: 'test ingredients2', instructions: 'test instructions2', chef_id: 1 });
            await Chefs.addPost({ image_url: 'test url3', title: 'test title3', meal_type: 'test meal3', ingredients: 'test ingredients3', instructions: 'test instructions3', chef_id: 1 });

            const threePosts = await db('posts');
            expect(threePosts).toHaveLength(3);
            expect(threePosts[0].title).toBe('test title1');
        });
    });
});


describe('Posts Model', function() {
    beforeEach(async () => {
        await db('posts').truncate();
    });

    describe('remove()', function() {
        it ('should remove a post', async function() {
            await Chefs.addPost({ image_url: 'test url', title: 'test title', meal_type: 'test meal', ingredients: 'test ingredients', instructions: 'test instructions', chef_id: 1 });
            await Posts.remove(1);

            const posts = await db('posts');
            expect(posts).toHaveLength(0);
        });

        it ('should not remove post that doesnt exist', async function() {
            await Chefs.addPost({ image_url: 'test url1', title: 'test title1', meal_type: 'test meal1', ingredients: 'test ingredients1', instructions: 'test instructions1', chef_id: 1 });
            await Chefs.addPost({ image_url: 'test url2', title: 'test title2', meal_type: 'test meal2', ingredients: 'test ingredients2', instructions: 'test instructions2', chef_id: 1 });
            await Chefs.addPost({ image_url: 'test url3', title: 'test title3', meal_type: 'test meal3', ingredients: 'test ingredients3', instructions: 'test instructions3', chef_id: 1 });
            await Posts.remove(5);

            const threePosts = await db('posts');
            expect(threePosts).toHaveLength(3);
        });
    });
});