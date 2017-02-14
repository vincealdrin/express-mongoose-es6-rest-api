import passport from 'passport';
import { Router } from 'express';
import { version } from '../../package.json';
import register from './register';
import social from './social';
import login from './login';
import './../config/passport';

const auth = Router();

auth.post('/login', passport.authenticate('local', { session: false }), login);
auth.post('/social', social);
auth.post('/register', register);

// perhaps expose some API metadata at the root
auth.get('/', (req, res) => {
	res.json({ version });
});

export default auth;
