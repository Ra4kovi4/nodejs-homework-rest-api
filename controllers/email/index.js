const verifyEmail = require("./verifyMail");
const resendVerifyEmail = require("./resendVerifyEmail");
const { ctrlWrapper } = require("../../helpers");

module.exports = {
	verifyEmail: ctrlWrapper(verifyEmail),
	resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
