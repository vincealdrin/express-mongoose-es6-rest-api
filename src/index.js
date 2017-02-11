import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import passport from './passport';
import router from './router.js';

const app = express();

app.use(cors({
	exposedHeaders: ["Link"]
}));

app.use(bodyParser.json({
	limit: "100kb"
}));

connectDb()
	.on('error', console.log)
	.on('disconnect', connectDb)
	.on('open', listen);

function listen() {
	router(app);

	app.listen(process.env.PORT || 3000, function() {
		console.log(`Running on port ${this.address().port}`);
	});
}

function connectDb() {
	const options = {};

	return mongoose.connect("mongodb://localhost/todo", options).connection;
}

export default app;
