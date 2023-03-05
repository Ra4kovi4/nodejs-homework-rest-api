const { Contact } = require("../../schema");

const addContact = async (req, res) => {
	const { _id: owner } = req.user;

	const newContact = await Contact.create({ ...req.body, owner });
	res.status(201).json({ code: 201, status: "Created", data: newContact });
};

module.exports = addContact;
