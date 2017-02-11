import { Strategy } from 'passport-facebook';
import config from './config';
import User from './../models/user';

export default new Strategy({
	clientID: config.facebook.clientID,
	clientSecret: config.facebook.clientSecret,
	callbackURL: config.facebook.callbackURL,
	profileFields: ['emails']
}, (accessToken, refreshToken, profile, done) => {
	const options = {
		$or: [
			{ 'facebook.id': profile.id },
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
				provider: 'facebook',
				facebook: profile._json,
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
