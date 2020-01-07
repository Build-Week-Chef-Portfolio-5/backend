const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const chefsRouter = require('../chefs/chefs-router');
const postsRouter = require('../posts/posts-router');

const server = express();



server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/chefs', chefsRouter);
server.use('/api/chefs/posts', postsRouter);


module.exports = server;