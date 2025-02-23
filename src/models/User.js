import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	verificationCode: { type: String },
	name: { type: String, unique: true, required: true }
})

const User = model('user', userSchema)

export default User