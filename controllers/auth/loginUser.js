const { User } = require("../../schema");
const { HttpError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { SECRET_KEY } = process.env;

const loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(401, "Email or password invalid");
	}

	const comparePassword = await bcrypt.compare(password, user.password);

	if (!comparePassword) {
		throw HttpError(401, "Email or password invalid");
	}

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	await User.findByIdAndUpdate(user._id, { token });
	res.json({
		code: 200,
		status: "Success",
		data: { email: user.email, subscription: user.subscription, token },
	});
};

module.exports = loginUser;
