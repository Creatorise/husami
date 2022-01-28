const auth = require('./middlewares/auth');
const login = require('./controllers/login');
const users = require('./controllers/users');
const houses = require('./controllers/houses');

const cookie_parser = require('cookie-parser');
const express = require('express');
const api_router = express.Router();

api_router.use(express.json());
api_router.use(cookie_parser());

api_router.post('/login', login.send_auth_link);
api_router.get('/login/:auth_token', login.authenticate_link);

api_router.get('/logout', login.remove_auth_cookie);

api_router.get('/users', auth.admin, users.index);
api_router.get('/users/:id', auth.admin, users.show);
api_router.post('/users', auth.admin, users.store);
api_router.put('/users/:id', auth.admin, users.update);
api_router.delete('/users/:id', auth.admin, users.destroy);

api_router.get('/houses', auth.member, houses.index);

module.exports = api_router;
