import { Router } from 'express';
import passport from 'passport';
import users from './controllers/users';

export default (app) => {
	const api = Router();

	app.get('/auth/facebook', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/', scope: ['email'] }));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/', session: false }));

	app.get('/auth/google', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/' }));
	app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/', session: false }));

	app.get('/auth/github', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/' }));
	app.get('/auth/github/callback', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/', session: false }));

	app.use('/api', api);
}
