import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Todo = new Schema({
	title: { type: String, default: '' },
	description: { type: String, default: '' },
	photoPath: { type: String, default: '' }
}, { versionKey: false });

Todo.plugin(mongoosePaginate);

export default mongoose.model('Todo', Todo);
