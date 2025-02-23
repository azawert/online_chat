import { model, Schema } from 'mongoose';

const messageSchema = new Schema({
	sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
	text: { type: String, required: true },
	createdAt: { type: Date, default: Date.now() },
	senderEmail: { type: String, required: true }
})

const Message = model('message', messageSchema)

export default Message