const listContacts = require("./listContact");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");
const updateStatusContact = require("./updateStatusContact");
const removeContact = require("./removeContact");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	removeContact: ctrlWrapper(removeContact),
	updateContactById: ctrlWrapper(updateContactById),
	updateStatusContact: ctrlWrapper(updateStatusContact),
};
