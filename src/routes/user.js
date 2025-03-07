import { Router } from 'express';
import { controller as UserController } from '../controllers/UserController.js';

const router = Router()

/**
 * @swagger
 * /api/user/send-code:
 *   post:
 *     summary: Send verification code to email
 *     tags: [User ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Code sent successfully
 *       500:
 *         description: Error sending code
 */
router.post('/', UserController.sendCode)



/**
 * @swagger
 * /api/user/verification-code-check:
 *   post:
 *     summary: Verify the code sent to email
 *     tags: [User ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verificationCode:
 *                 type: string
 *                 example: 123456
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Token generated successfully
 *       401:
 *         description: Invalid code
 *       404:
 *         description: User not found
 */
router.post('/verification', UserController.verificationCodeCheck)

/**
 * @swagger
 * /api/user/update-name:
 *   patch:
 *     summary: Update user name
 *     tags: [User  ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newName:
 *                 type: string
 *                 example: New Name
 *     responses:
 *       200:
 *         description: Name updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Unexpected error
 */
router.patch('/update-name', UserController.updateUserName)

/**
 * @swagger
 * /api/user/messages:
 *   get:
 *     summary: Retrieve all messages
 *     tags: [User ]
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 60c72b2f9b1e8a001c8e4e1f
 *                   senderEmail:
 *                     type: string
 *                     example: user@example.com
 *                   text:
 *                     type: string
 *                     example: Hello, this is a message!
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2023-01-01T12:00:00Z
 *       500:
 *         description: Error retrieving messages
 */
router.get('/messages', UserController.getMessages)

export default router