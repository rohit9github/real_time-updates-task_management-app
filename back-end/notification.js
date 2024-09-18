const admin = require("./firebaseAdmin");

const sendNotification = async (token, title, message) => {
  const payload = {
    notification: {
      title: title,
      body: message,
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(payload);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

module.exports = { sendNotification };
