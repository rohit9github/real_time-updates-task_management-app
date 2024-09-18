const admin = require("firebase-admin");
const serviceAccount = require("./task-management-ec909-firebase-adminsdk-kugyo-36519e43c4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
