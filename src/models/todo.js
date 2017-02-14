import mongoose, { Schema } from 'mongoose';

const Todo = new Schema({
	title: { type: String, default: '' },
	description: { type: String, default: '' },
	photoPath: { type: String, default: '' }
}, { versionKey: false });

export default mongoose.model('Todo', Todo);
