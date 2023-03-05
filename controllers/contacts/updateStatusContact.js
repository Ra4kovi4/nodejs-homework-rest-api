const { Contact } = require("../../schema");
const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
	const { contactId } = req.params;

	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json({ code: 200, status: "Success", data: result });
};

module.exports = updateStatusContact;
