const currentUser = (req, res, next) => {
	const { email, subscription } = req.user;
	res.json({
		code: 200,
		status: "Success",
		data: {
			email,
			subscription,
		},
	});
};

module.exports = currentUser;
