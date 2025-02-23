import jwt from 'jsonwebtoken';

/**
 * Generates a JSON Web Token (JWT) for a given email address.
 *
 * @param {string} email - The email address to include in the token payload.
 * @param {string} [expiresIn='1h'] - Optional expiration time for the token. Defaults to '1h'.
 * @returns {string} The generated JWT.
 * @throws {Error} If token generation fails.
 */
export const generateToken = (email, expiresIn = '1h') => {
	try {
		return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn });
	} catch (error) {
		console.error('Error generating token:', error);
		throw new Error('Token generation failed');
	}
};