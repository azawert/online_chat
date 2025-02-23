import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Message from '../models/Message.js';

export const setupSocket = (io) => {
	io.on('connection', (socket) => {
		console.log('Client connected');

		socket.on('sendMessage', async (data) => {
			const { token, text } = data;
			if (!token) {
				return socket.emit('unauthorized', { messages: 'no token' });
			}

			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET);
				const senderEmail = decoded.email;

				const user = await User.findOne({ email: senderEmail });

				if (!user) {
					return socket.emit('error', { message: 'User not found' });
				}

				const { _id: sender, email } = user;

				const message = new Message({ sender, text, senderEmail });
				await message.save();
				const { createdAt } = message;

				io.emit('message', { sender, text, email, createdAt });
			} catch (e) {
				console.error('Error sending message:', e);
				socket.emit('error', { message: 'Error sending message' });
			}
		});

		socket.on('disconnect', () => {
			console.log('Client disconnected');
		});
	});
};