module.exports = (client) => {
  return {
    async sendDM(userId, text) {
      return client.chat.postMessage({
        channel: userId,
        text,
      });
    }
  };
};
