import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import passport from 'passport';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import auth from './auth';
import config from './config/main.json';

const app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
	limit: config.bodyLimit
}));

app.use(compression({
	level: 9,
	memLevel: 9
}));

app.use(passport.initialize());

// connect to db
initializeDb(db => {
	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', passport.authenticate('jwt', { session: false }), api({ config, db }));

	// auth router
	app.use('/auth', auth);

	app.server.listen(process.env.PORT || config.port);

	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
