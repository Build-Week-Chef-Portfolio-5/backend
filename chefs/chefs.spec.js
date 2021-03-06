const db = require('../data/db-config');
const request = require('supertest');
const server = require('../api/server');


// ------------------- REGISTER ENDPOINT ---------------------- //
describe('Chefs Router', function() {
    beforeEach(async () => {
        await db('chefs').truncate();
    });

    describe('/register', function() {
        it ('should register a user', async function() {
            await request(server)
                .post('/api/chefs/register')
                .send({ username: 'User1', password: 'pass', name: 'Timmy', location: 'Texas', contact_info: 'timmy@email.com' })
                .expect(201);
        });

        it ('should NOT register a user', async function() {
            await request(server)
                .post('/api/chefs/register')
                .send({ username: 'User2' })
                .expect(400);
        });
    });
});



// ------------------- LOGIN ENDPOINT ---------------------- //
describe('Chefs Router', function() {
    describe('/login', function() {
        it ('should login a user', async function() {
            await request(server)
                .post('/api/chefs/register')
                .send({ username: 'User2', password: 'pass', name: 'Johnny', location: 'Texas', contact_info: 'johnny@email.com' })
            await request(server)
                .post('/api/chefs/login')
                .send({ username: 'User2', password: 'pass' })
                .expect(200);
        });

        it ('should NOT login a user', async function() {
            await request(server)
                .post('/api/chefs/login')
                .send({ username: 'User5', password: 'pass' })
                .expect(401);
        });
    });
})
