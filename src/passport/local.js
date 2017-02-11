import { Strategy } from 'passport-local';
import User from './../models/user';

export default new Strategy({
	usernameField: 'email',
	passwordField: 'password'
}, (email, password, done) => {
	User.findOne({ email }, (err, user) => {
		if (err) return done(err);
		if (!user) {
			return done(null, false, { message: 'Unknown user' });
		}

		return done(null, user);
	});
});
