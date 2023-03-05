const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegexp =
	/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const subscriptionTypes = ["starter", "pro", "business"];

const userSchema = new Schema({
	password: {
		type: String,
		minlength: 6,
		required: [true, "Password is required"],
	},
	email: {
		type: String,
		match: emailRegexp,
		required: [true, "Email is required"],
		unique: true,
	},
	subscription: {
		type: String,
		enum: subscriptionTypes,
		default: "starter",
	},
	token: {
		type: String,
		default: null,
	},
});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string().pattern(emailRegexp).required(),
	subscription: Joi.string().valid(...subscriptionTypes),
});

const loginSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string().pattern(emailRegexp).required(),
});

const updateSchema = Joi.object({
	subscription: Joi.string()
		.valid(...subscriptionTypes)
		.required(),
});

const schemas = {
	registerSchema,
	loginSchema,
	updateSchema,
};

const User = model("user", userSchema);

module.exports = {
	schemas,
	User,
};
