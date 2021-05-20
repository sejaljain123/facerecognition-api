const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const imageurl = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: 'queenie.db.elephantsql.com',
    user: 'ahhaedkf',
    password: 'X3g9Z6-tF5CQrHLB3EI_l7CVVGD8JfiA',
    database: 'ahhaedkf',
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, bcrypt, db);
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
  imageurl.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
