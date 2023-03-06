const { ctrlWrapper } = require("../../helpers");
const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const currentUser = require("./curentUser");
const logoutUser = require("./logoutUser");
const updateSubscription = require("./updateSubscription");

module.exports = {
	registerUser: ctrlWrapper(registerUser),
	loginUser: ctrlWrapper(loginUser),
	currentUser: ctrlWrapper(currentUser),
	logoutUser: ctrlWrapper(logoutUser),
	updateSubscription: ctrlWrapper(updateSubscription),
};
