import express = require('express');
import { Express } from 'express';
import dotenv = require('dotenv');
import { routes } from './routes/routes';
import passport = require('passport');
import { passportJwt } from './config/passport';

dotenv.config();

const app: Express = express();

require('./config/database');

passportJwt(passport);

const port = process.env.SERVER_PORT || 3000;

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => {
  console.log('Server is listening on port: ', port);
});
