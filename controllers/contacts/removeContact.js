const { Contact } = require("../../schema");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
	const { contactId } = req.params;
	const removeBook = await Contact.findByIdAndDelete(contactId);
	console.log(removeBook);
	if (!removeBook) {
		throw HttpError(404, "Not found");
	}
	res.json({ message: "Remove success" });
};

module.exports = removeContact;
