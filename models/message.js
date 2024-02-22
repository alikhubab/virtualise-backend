const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  toId: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  fromId: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});


const Message = mongoose.model("Message", messageSchema);

function validateUser(user) {
  const schema = Joi.object().keys({
    text: Joi.string()
      .min(2)
      .max(1024)
      .required(),
    toId: Joi.string()
      .min(5)
      .max(255)
      .required(),
    fromId: Joi.string()
      .min(5)
      .max(255)
  });

  return schema.validate(user);
}

exports.Message = Message;
exports.validate = validateUser;
