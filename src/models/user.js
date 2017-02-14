import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const User = new Schema({
	first_name: { type: String, default: '' },
	last_name: { type: String, default: '' },
	email: { type: String, default: '', unique: true },
	username: { type: String, default: '', unique: true },
	provider: { type: String, default: '' },
	password: { type: String, default: '' },
	// role: { type: String, default: '' },
	facebook: Object,
	twitter: Object,
	github: Object,
	google: Object
}, { versionKey: false });

User.pre('save', function(next) {
	const user = this;
	const SALT_ROUNDS = 10;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
		if (err) next(err);
		bcrypt.hash(user.password, salt, null, (bcryptErr, hash) => {
			if (bcryptErr) next(bcryptErr);
			user.password = hash;
			next();
		});
	});
});

User.methods.comparePassword = function(candidatePassword, cb) {
	const user = this;
	bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
		if (err) return cb(err);
		cb(null, isMatch);
	});
}

export default mongoose.model('User', User);
