import { OAuth2Strategy } from 'passport-google-oauth';
import config from './config';
import User from './../models/user';

export default new OAuth2Strategy({
	clientID: config.google.clientID,
	clientSecret: config.google.clientSecret,
	callbackURL: config.google.callbackURL
}, (accessToken, refreshToken, profile, done) => {
	const options = {
		$or: [
			{ 'google.id': profile.id },
			{ email: profile.emails[0].value }
		]
	};
	User.findOne(options, (err, user) => {
		if (err) return done(err);

		if (!user) {
			const newUser = new User({
				name: profile.displayName,
				email: profile.emails[0].value,
				username: profile.username || profile.emails[0].value,
				provider: 'google',
				google: profile._json,
				authToken: accessToken
			});

			newUser.save(err => {
				if (err) console.log(err);
				return done(err, user);
			});
		} else {
			return done(err, user);
		}
	});
});
