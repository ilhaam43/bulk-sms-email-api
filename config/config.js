require("dotenv").config();
var config = {};

config.port = process.env.PORT || 5000;
config.accountSid = process.env.TWILIO_ACCOUNT_SID;
config.authToken = process.env.TWILIO_AUTH_TOKEN;
config.twilioNumber = process.env.TWILIO_NUMBER;

module.exports = config;
