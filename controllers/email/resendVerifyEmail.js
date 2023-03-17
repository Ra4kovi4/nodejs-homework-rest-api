const { User } = require("../../schema");
const { HttpError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(404, "Email not found");
	}

	if (user.verify) {
		throw HttpError(400, "Verification has already been passed");
	}

	const verifyEmail = {
		to: email,
		subject: "Email Confirmation",
		html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to verify your email</a>`,
	};

	await sendEmail(verifyEmail);

	res.json({
		code: 200,
		status: "Success",
		message: "Verification email sent",
	});
};

module.exports = resendVerifyEmail;
