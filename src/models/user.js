import mongoose, { Schema } from 'mongoose';

const User = mongoose.model('User', new Schema({
	name: { type: String, default: '' },
	email: { type: String, default: '' },
	username: { type: String, default: '' },
	provider: { type: String, default: '' },
	hashed_password: { type: String, default: '' },
	authToken: { type: String, default: '' },
	facebook: Object,
	twitter: Object,
	github: Object,
	google: Object,
}));

export default User;
