const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const phoneRegexp = /^\d+$/;

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
			match: phoneRegexp,
			required: [true, "Set phone number for contact"],
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},

	{ versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	phone: Joi.string().length(10).pattern(phoneRegexp).required(),
	favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
	favorite: Joi.boolean().required(),
});
const schemas = {
	addSchema,
	updateSchema,
};

module.exports = {
	schemas,
	Contact,
};
