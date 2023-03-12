const { User } = require("../../schema");
const { HttpError } = require("../../helpers");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatars = async (req, res) => {
	const { path: tempUpload, originalname, mimetype } = req.file;
	const { _id } = req.user;

	if (mimetype !== "image/jpeg") {
		throw HttpError(400, "Avatar must have the extension .jpeg ");
	}

	const fileName = `${_id}_${originalname}`;

	const avatarUpload = path.join(avatarDir, fileName);

	await fs.rename(tempUpload, avatarUpload);
	Jimp.read(avatarUpload, (err, avatar) => {
		if (err) {
			throw HttpError(400);
		}
		avatar.resize(250, 250).write(avatarUpload);
	});
	const avatarUrl = path.join("avatars", fileName);

	await User.findByIdAndUpdate(_id, { avatarUrl });

	res.json({
		code: 200,
		status: "Success",
		data: {
			avatarUrl,
		},
	});
};

module.exports = updateAvatars;
