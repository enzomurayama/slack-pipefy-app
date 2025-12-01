require("dotenv").config();

module.exports = {
  SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
  SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
  SLACK_APP_TOKEN: process.env.SLACK_APP_TOKEN,

  PIPEFY_TOKEN: process.env.PIPEFY_TOKEN,
  PIPE_ID: process.env.PIPE_ID,
};
