import passport from 'passport';
import mongoose from 'mongoose';

import local from './local.js';
import google from './google.js';
import facebook from './facebook.js';
import twitter from './twitter.js';
import github from './github.js';

export default () => {
  passport.use(local);
  passport.use(google);
  passport.use(facebook);
  passport.use(twitter);
  passport.use(github);
};
