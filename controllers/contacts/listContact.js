const { Contact } = require("../../schema");
const { HttpError } = require("../../helpers");
//Search all contacts in the database

const listContacts = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 3, favorite } = req.query;
	const skip = (page - 1) * limit;
	let contacts;
	if (favorite) {
		contacts = await Contact.find(
			{ owner, favorite },
			"-createdAt -updatedAt",
			{
				skip,
				limit,
			}
		).populate("owner", "email");
		if (!contacts) {
			throw HttpError(404, "Not found");
		}
	} else {
		contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
			skip,
			limit,
			favorite: true,
		}).populate("owner", "email");
		if (!contacts) {
			throw HttpError(404, "Not found");
		}
	}

	res.json({ code: 200, status: "Success", data: contacts });
};

module.exports = listContacts;
