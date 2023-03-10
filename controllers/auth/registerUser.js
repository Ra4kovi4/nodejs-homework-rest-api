const { User } = require("../../schema");
const { HttpError } = require("../../helpers");

const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const registerUser = async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, "Email already in use");
	}
	const hashPassword = await bcrypt.hash(password, 10);
	const avatarUrl = gravatar.url(email);
	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarUrl,
	});

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
