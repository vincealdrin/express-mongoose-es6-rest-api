import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Todo = new Schema({
	id: { type: String, default: '' },
	name: { type: String, default: '' },
	breed: { type: String, default: '' },
	gender: { type: String, default: '' },
	status: { type: String, default: '' },
	suburb: { type: String, default: '' }
}, { versionKey: false });

Todo.plugin(mongoosePaginate);

export default mongoose.model('Todo', Todo);
