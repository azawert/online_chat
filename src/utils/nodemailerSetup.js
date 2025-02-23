import { createTransport } from 'nodemailer';

let transporter = createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	requireTLS: true,
	auth: {
		user: process.env.USER_EMAIL,
		pass: process.env.USER_PASSWORD,
	},
});

transporter.verify(function (err, success) {
	if (err) { console.error(`SMTP Error: ${err}`); }
	if (success) {
		console.log("SMTP ready...");
	} else {
		console.error("SMTP not ready!");
	}
});

export const sendMail = transporter.sendMail.bind(transporter);