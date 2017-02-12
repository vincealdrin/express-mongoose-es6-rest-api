import dotenv from 'dotenv';

dotenv.config();

export const
			facebook = {
				clientID: process.env.FACEBOOK_CLIENTID,
				clientSecret: process.env.FACEBOOK_SECRET,
				callbackURL: 'http://localhost:3000/auth/facebook/callback'
			},
			twitter = {
				clientID: process.env.TWITTER_CLIENTID,
				clientSecret: process.env.TWITTER_SECRET,
				callbackURL: 'http://localhost:3000/auth/twitter/callback'
			},
			github = {
				clientID: process.env.GITHUB_CLIENTID,
				clientSecret: process.env.GITHUB_SECRET,
				callbackURL: 'http://localhost:3000/auth/github/callback'
			},
			google = {
				clientID: process.env.GOOGLE_CLIENTID,
				clientSecret: process.env.GOOGLE_SECRET,
				callbackURL: 'http://localhost:3000/auth/google/callback'
			},
			jwtSecret = process.env.JWT_SECRET;
