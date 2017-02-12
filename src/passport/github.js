import { Strategy } from 'passport-github';
import { github } from './config';
import User from './../models/user';

export default new Strategy({
	clientID: github.clientID,
	clientSecret: github.clientSecret,
	callbackURL: github.callbackURL
}, (accessToken, refreshToken, profile, done) => {
	const options = {
		$or: [
			{ 'github.id': parseInt(profile.id) },
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
				provider: 'github',
				github: profile._json,
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
