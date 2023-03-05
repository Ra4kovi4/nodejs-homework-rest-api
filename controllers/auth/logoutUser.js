const { User } = require("../../schema");

const logoutUser = async (req, res) => {
	const { _id } = req.user;

	await User.findByIdAndUpdate(_id, { token: null });
	res.json({
		code: 200,
		status: "Success",
		message: "Success logout",
	});
};

module.exports = logoutUser;
