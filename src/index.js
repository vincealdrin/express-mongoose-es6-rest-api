import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';

import passportConfig from './passport';
import router from './router';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
	limit: '100kb'
}));

app.use(passport.initialize());

const listen = () => {
	passportConfig();
	router(app);
	app.listen(process.env.PORT || 3000, function() {
		console.log(`Running on port ${this.address().port}`);
	});
};

const connectDb = () => {
	const options = {};
	return mongoose.connect('mongodb://localhost/todo', options).connection;
};

connectDb()
	.on('error', console.log)
	.on('disconnect', connectDb)
	.on('open', listen);

export default app;
