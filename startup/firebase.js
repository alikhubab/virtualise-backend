const admin = require("firebase-admin")
const serviceAccountKey = require("../inference-service-account-key.json")

module.exports = function() {
  try {

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey, "newApp"),
  });
  }catch (e) {
    console.log(e)
  }
}

