import { validateEmail } from './validateEmail.js';

export const extractNameFromEmail = (email) => {
	if (typeof email !== 'string' || validateEmail(email)) {
		return;
	}

	return email.split('@')[0];

}