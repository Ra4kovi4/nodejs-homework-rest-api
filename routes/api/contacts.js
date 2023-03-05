const express = require("express");
const router = express.Router();
const { contacts: controllers } = require("../../controllers");

const { validateBody, isValidId, authenticate } = require("../../middlewars");
const {
	contacts: { addSchema, updateSchema },
} = require("../../schema");

router.get("/", authenticate, controllers.listContacts);

router.get("/:contactId", authenticate, isValidId, controllers.getContactById);

router.post("/", authenticate, validateBody(addSchema), controllers.addContact);

router.delete(
	"/:contactId",
	authenticate,
	isValidId,
	controllers.removeContact
);

router.put(
	"/:contactId",
	authenticate,
	isValidId,
	validateBody(addSchema),
	controllers.updateContactById
);

router.patch(
	"/:contactId/favorite",
	authenticate,
	isValidId,
	validateBody(updateSchema),
	controllers.updateStatusContact
);
module.exports = router;
