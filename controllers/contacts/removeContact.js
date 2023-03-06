const { Contact } = require("../../schema");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
	const { contactId } = req.params;
	const removeBook = await Contact.findByIdAndDelete(contactId);

	if (!removeBook) {
		throw HttpError(404, "Not found");
	}
	res.json({ code: 200, status: "Success", message: "Remove success" });
};

module.exports = removeContact;
