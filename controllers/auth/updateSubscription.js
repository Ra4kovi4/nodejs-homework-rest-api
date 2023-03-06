const { User } = require("../../schema");
const { HttpError } = require("../../helpers");
const updateSubscription = async (req, res) => {
	const { _id, subscription: role } = req.user;

	const { subscription } = req.body;

	if (role === subscription) {
		throw HttpError(400, `Subscription already has a status  ${role}`);
	}

	const result = await User.findByIdAndUpdate(
		_id,
		{ subscription },
		{ new: true }
	);

	res.json({
		code: 200,
		status: "Success",
		data: {
			result,
		},
	});
};

module.exports = updateSubscription;
