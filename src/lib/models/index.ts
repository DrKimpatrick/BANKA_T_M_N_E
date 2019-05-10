/* eslint-disable @typescript-eslint/no-var-requires */
import * as mongoose from 'mongoose';
import * as validator from 'validator';
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [6, 50],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Name should contain alpha-numeric characters only',
    }),
];

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name',
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        validate: usernameValidator,
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
    isAdmin: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'client',
    },
});

// Plugin for Mongoose that turns duplicate errors into regular Mongoose validation errors.
UserSchema.plugin(uniqueValidator, { message: '{PATH} of value {VALUE} is already taken, try another' });

export default mongoose.model('Users', UserSchema);
