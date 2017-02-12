import { Router } from 'express';
import passport from 'passport';
import { login, register } from './controllers/authentication';
import todos from './controllers/todo';

export default (app) => {
	const api = Router();

	app.use('/api', api);
	api.route('/todos')
		.get((req, res) => {

		})
		.post((req, res) => {

		})
		.patch((req, res) => {

		})
		.delete((req, res) => {

		});

	const redirects = { successRedirect: '/', failureRedirect: '/' };
	const pauth = (provider, options = redirects) => passport.authenticate(provider, options);

	['facebook', 'google', 'github'].map(provider => {
		app.get(`/auth/${provider}`, pauth(provider), login);
		app.get(`/auth/${provider}/callback`, pauth(provider, { ...redirects, session: false }));
	});
	// app.get('/auth/google', pauth('google'), login);
	// app.get('/auth/google/callback', pauth('google', { ...redirects, session: false }));
	// app.get('/auth/github', pauth('github'), login);
	// app.get('/auth/github/callback', pauth('github', { ...redirects, session: false }));
	app.get('login', pauth('local'), login);
	app.get('register', pauth('local'), register);
};
