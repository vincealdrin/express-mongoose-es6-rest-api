import passport from 'passport';

import jwt from './jwt';
import local from './local';
import google from './google';
import facebook from './facebook';
import github from './github';

export default () => {
	passport.use(jwt);
	passport.use(local);
	passport.use(google);
	passport.use(facebook);
	passport.use(github);
};
