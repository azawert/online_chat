import jwt from 'jsonwebtoken';
import { buildVerificationCode, extractNameFromEmail, generateToken, getTokenFromHeader, sendMail } from '../utils/index.js'
import User from '../models/User.js';
import Message from '../models/Message.js';


class UserController {
	async sendCode(req, res) {
		const { email } = req.body
		const verificationCode = buildVerificationCode()
		const name = extractNameFromEmail(email)

		await User.findOneAndUpdate({ email }, { verificationCode, name }, { upsert: true })

		const mailOptions = {
			from: process.env.USER_EMAIL,
			to: email,
			subject: 'Волшебный код',
			text: verificationCode,
		}

		sendMail(mailOptions, (e) => {
			if (e) {
				return res.status(500).json({ message: 'Error' })
			}

			res.status(200).json({ message: 'Код отправлен' })
		})

	}

	async verificationCodeCheck(req, res) {
		const { verificationCode, email } = req.body

		const user = await User.findOne({ email })

		if (!user) {
			return res.status(404).json({ message: "not found" })
		}

		if (user && user.verificationCode === verificationCode) {
			const token = generateToken(email)
			res.json({ token });
		} else {
			res.status(401).json({ message: 'Invalid code' });
		}
	}

	async updateUserName(req, res) {
		const { newName } = req.body
		const token = getTokenFromHeader(req)

		if (!token) {
			return res.status(401).json({ message: 'unauthorized' })
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			const email = decoded.email

			const user = await User.findOneAndUpdate({ email }, { name: newName })

			if (!user) {
				return res.status(404).json({ message: 'not found' })
			}

			res.status(200).json({ message: 'Email updated successfully' });
		} catch (e) {
			console.error('update-name error:', e)
			res.status(500).json({ message: 'unexpected error' })
		}
	}

	async getMessages(req, res) {
		try {
			const messages = await Message.find();
			res.status(200).json(messages);
		} catch (error) {
			console.error('Error retrieving messages:', error);
			res.status(500).json({ message: 'Error retrieving messages' });
		}
	}

	async getMe(req, res) {
		const token = getTokenFromHeader(req)

		if (!token) {
			return res.status(401).json({ message: 'unauthorized' })
		}
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			const email = decoded.email

			const user = await User.findOne({ email })

			return res.status(200).json({ ...user })
		} catch (e) {
			console.error('error while getting info about user', e)
			res.status(500).json({ message: 'Error while getting info about user' })
		}
	}
}

export const controller = new UserController()