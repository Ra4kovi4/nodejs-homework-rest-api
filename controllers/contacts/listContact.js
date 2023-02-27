const { Contact } = require("../../schema");

//Search all contacts in the database
const listContacts = async (req, res) => {
	const contacts = await Contact.find();
	res.json(contacts);
};

module.exports = listContacts;
