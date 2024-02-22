const admin = require("firebase-admin")
const serviceAccountKey = require("../inference-service-account-key.json")

module.exports = function() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey, "newApp"),
  });
}

