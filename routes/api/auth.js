const express = require("express");
const router = express.Router();

const {
	users: { registerSchema, loginSchema, updateSchema, verifySchema },
} = require("../../schema");
const { authenticate, upload } = require("../../middlewars");

const { validateBody } = require("../../middlewars");
const { auth: controllers } = require("../../controllers");

router.post("/signup", validateBody(registerSchema), controllers.registerUser);

router.get("/verify/:verificationToken", controllers.verifyMail);
router.post(
	"/verify",
	validateBody(verifySchema),
	controllers.resendVerifyEmail
);

router.post("/login", validateBody(loginSchema), controllers.loginUser);
router.get("/current", authenticate, controllers.currentUser);
router.post("/logout", authenticate, controllers.logoutUser);
router.patch(
	"/",
	authenticate,
	validateBody(updateSchema),
	controllers.updateSubscription
);
router.patch(
	"/avatar",
	authenticate,
	upload.single("avatar"),
	controllers.updateAvatar
);

module.exports = router;
