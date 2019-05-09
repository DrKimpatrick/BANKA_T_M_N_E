import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name',
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        lowercase: true,
        validate: (value: string) => {
            return validator.isEmail(value);
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    password: {
        type: String,
        required: 'Password is required',
    },
});

export default mongoose.model('Users', UserSchema);
// module.exports = mongoose.model('Users', UserSchema);
