import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import { JWT_SECRET } from './main.json';

import User from './../models/user';

const localLogin = new LocalStrategy((username, password, done) => {
	User.findOne({ username }, (err, user) => {
		if (err) return done(err);
		if (!user) {
			return done(null, false, { message: 'Unknown user.' });
		}
		return done(null, user);
	});
});

const jwtOption = {
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: JWT_SECRET,
};
const jwtLogin = new JwtStrategy(jwtOption, ({ id }, done) => {
	User.findById(id, (err, user) => {
		if (err) return done(err);
		return done(null, user);
	});
});

passport.use(localLogin);
passport.use(jwtLogin);
