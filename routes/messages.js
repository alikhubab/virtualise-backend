const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const {Message, validate} = require("../models/message")
const express = require("express");
const router = express.Router();

router.post("/sendMessage", auth, async (req, res) => {
  console.log(req.user)
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.user._id);
  if (user) {
    user.sendFcmNotification(req.body.text)
  }
  req.body.fromId = user._id;
  let message = new Message(_.pick(req.body, ["toId", "fromId", "text"]))
  await message.save()

  res
    .send("Message sent successfully");
});

module.exports = router;
