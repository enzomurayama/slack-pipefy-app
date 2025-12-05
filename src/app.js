require("dotenv").config();
const { App, ExpressReceiver, LogLevel} = require("@slack/bolt");
const config = require("./config");

const registerCommands = require("./handlers/commands");
const registerViews = require("./handlers/views");
const registerEvents = require("./handlers/events");

let app;

if (process.env.USE_SOCKET_MODE === "true") {
  app = new App({
    signingSecret: config.SLACK_SIGNING_SECRET,
    token: config.SLACK_BOT_TOKEN,
    appToken: config.SLACK_APP_TOKEN,
    socketMode: true,
    logLevel: LogLevel.DEBUG
  });

  console.log("Rodando em SOCKET MODE");

  (async () => {
    await app.start();
    console.log("⚡ Slack app conectado via Socket Mode");
  })();
}

else {
  const receiver = new ExpressReceiver({
    signingSecret: config.SLACK_SIGNING_SECRET,
  });

  receiver.router.post("/slack/events", receiver.requestHandler());

  app = new App({
    token: config.SLACK_BOT_TOKEN,
    receiver,
  });

  // Servidor HTTP
  const port = process.env.PORT || 3000;
  receiver.app.listen(port, () => {
    console.log(`Rodando em HTTP Mode na porta ${port}`);
  });
}

registerCommands(app);
registerViews(app);
registerEvents(app);

module.exports = { app };
