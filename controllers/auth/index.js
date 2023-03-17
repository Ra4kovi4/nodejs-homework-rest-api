const { ctrlWrapper } = require("../../helpers");
const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const currentUser = require("./curentUser");
const logoutUser = require("./logoutUser");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verifyMail = require("./verifyMail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
	registerUser: ctrlWrapper(registerUser),
	loginUser: ctrlWrapper(loginUser),
	currentUser: ctrlWrapper(currentUser),
	logoutUser: ctrlWrapper(logoutUser),
	updateSubscription: ctrlWrapper(updateSubscription),
	updateAvatar: ctrlWrapper(updateAvatar),
	verifyMail: ctrlWrapper(verifyMail),
	resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
