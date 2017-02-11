import mongoose, { Schema } from 'mongoose';

const user = mongoose.model('User', new Schema({
    name: String,
    username: {
        type: String,
        lowercase: true,
        unique: true
    },
    password: String
}));

export default user;