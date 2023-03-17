const { User } = require("../../schema");
const { HttpError } = require("../../helpers");

const verifyEmail = async (req, res) => {
	const { verificationToken } = req.params;
	const user = await User.findOne({ verificationToken });
	if (!user) {
		throw HttpError(404, "Email not found");
	}
	await User.findByIdAndUpdate(user._id, {
		verify: true,
		verificationToken: null,
	});
	res.json({
		code: 200,
		status: "Success",
		message: "Email verification was successful",
	});
};

module.exports = verifyEmail;
