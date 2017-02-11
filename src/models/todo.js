import mongoose, { Schema } from 'mongoose';

const todo = mongoose.model('todo', new Schema({
	title: String,
	description: String
}));

export default todo;