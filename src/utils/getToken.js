/**
 * Extracts the token from the authorization header of a request.
 *
 * @param {Object} req - The request object containing headers.
 * @returns {string|null} The extracted token or null if the authorization header is missing or malformed.
 */
export const getTokenFromHeader = (req) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return null;
	}
	const token = authHeader.split(' ')[1];
	return token || null;
};