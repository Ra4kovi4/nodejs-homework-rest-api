const currentUser = (req, res, next) => {
	const { email, subscription, avatarUrl } = req.user;
	res.json({
		code: 200,
		status: "Success",
		data: {
			email,
			subscription,
			avatarUrl,
		},
	});
};

module.exports = currentUser;
