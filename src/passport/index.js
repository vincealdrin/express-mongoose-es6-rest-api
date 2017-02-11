import passport from 'passport';

import local from './local';
import google from './google';
import facebook from './facebook';
import github from './github';

export default () => {
	passport.use(local);
	passport.use(google);
	passport.use(facebook);
	passport.use(github);
};
