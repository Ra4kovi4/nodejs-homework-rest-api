const express = require("express");
const router = express.Router();

const {
	users: { verifySchema },
} = require("../../schema");

const { validateBody } = require("../../middlewars");
const { email: controllers } = require("../../controllers");

router.get("/verify/:verificationToken", controllers.verifyEmail);

router.post(
	"/verify",
	validateBody(verifySchema),
	controllers.resendVerifyEmail
);

module.exports = router;
