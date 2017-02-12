import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from './config';
import User from './../models/user';

const jwtOption = {
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: jwtSecret
};
export default new Strategy(jwtOption, ({ id }, done) => {
	User.findById(id, (err, user) => {
		if (err) return done(err);
		return done(null, user);
	});
});
