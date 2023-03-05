const express = require("express");
const router = express.Router();
const {
	users: { registerSchema, loginSchema, updateSchema },
} = require("../../schema");
const { authenticate } = require("../../middlewars");

const { validateBody } = require("../../middlewars");
const { auth: controllers } = require("../../controllers");

router.post("/signup", validateBody(registerSchema), controllers.registerUser);
router.post("/login", validateBody(loginSchema), controllers.loginUser);
router.get("/current", authenticate, controllers.currentUser);
router.post("/logout", authenticate, controllers.logoutUser);
router.patch(
	"/",
	authenticate,
	validateBody(updateSchema),
	controllers.updateSubscription
);

module.exports = router;
