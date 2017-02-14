import mongoose from 'mongoose';

export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	mongoose.Promise = Promise;
	mongoose.connect('mongodb://127.0.0.1/toroapp');

	callback();
}
