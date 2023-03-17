const contactsRouter = require("./contacts");

const authRouter = require("./auth");
const verifyEmailRouter = require("./email");

module.exports = {
	contactsRouter,
	authRouter,
	verifyEmailRouter,
};
