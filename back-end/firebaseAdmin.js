const admin = require("firebase-admin");
const serviceAccount = require("./servicesAction.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
