const pipefy = require("../services/pipefy");
const slackService = require("../services/slack");

module.exports = (app) => {
  const slack = slackService(app.client);

  app.view("form_evento_risco", async ({ ack, view, body }) => {
    await ack();

    const titulo = view.state.values.titulo_block.titulo.value;
    const descricao = view.state.values.descricao_block.descricao.value;
    const user = body.user.id;

    try {
      const card = await pipefy.createEventoRisco(titulo, descricao);

      await slack.sendDM(
        user,
        `🎉 Seu evento foi enviado com sucesso!\n\n📌 *${titulo}*\n🆔 Card: ${card.id}`
      );

    } catch (err) {
      console.error("Erro Pipefy:", err);

      await slack.sendDM(
        user,
        "⚠️ Ocorreu um erro ao enviar os dados para o Pipefy."
      );
    }
  });
};
