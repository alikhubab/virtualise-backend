const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const admin = require("firebase-admin")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  fcmToken: {
    type: String,
    minlength: 5,
    maxlength: 1024
  },

  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

userSchema.methods.sendFcmNotification = function(text) {
  const payload = {
    notification: {
      type: "New Message",
      body: text,
    },
    data: {
    },
  };

  if(this.fcmToken){
    admin
        .messaging()
        .sendToDevice(this.fcmToken, payload)
        .then(function (response) {
          console.log('notification---resp', response.results[0]);
        })
        .catch(function (err) {
          console.log(err);
        });
  }
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    fcmToken: Joi.string()
        .min(5)
        .max(1024)
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
