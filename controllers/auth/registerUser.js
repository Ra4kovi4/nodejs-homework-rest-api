const { User } = require("../../schema");
const { HttpError, sendEmail } = require("../../helpers");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { BASE_URL } = process.env;

const registerUser = async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, "Email already in use");
	}
	const verificationToken = uuidv4();

	const hashPassword = await bcrypt.hash(password, 10);
	const avatarUrl = gravatar.url(email);
	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarUrl,
		verificationToken,
	});
	const verifyEmail = {
		to: email,
		subject: "Email Confirmation",
		html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to verify your email</a>`,
	};

	await sendEmail(verifyEmail);

	res.status(201).json({
		code: 201,
		status: "Created",
		data: {
			email: newUser.email,
			password,
			subscription: newUser.subscription,
			avatarUrl,
		},
	});
};
module.exports = registerUser;
