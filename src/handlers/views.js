const pipefy = require("../services/pipefy");
const slackService = require("../services/slack");

module.exports = (app) => {
  const slack = slackService(app.client);

  // Evento de Risco
  app.view("form_evento_risco", async ({ ack, view, body }) => {
    await ack();

    const titulo = view.state.values.titulo_block.titulo.value;
    const descricao = view.state.values.descricao_block.descricao.value;
    const user = body.user.id;

    try {
      const card = await pipefy.createEventoRisco(titulo, descricao);

      await slack.sendDM(
        user,
        `📌 Seu evento de risco foi enviado com sucesso!\n\n*${titulo}*\n\n*Card:* ${card.id}`
      );

    } catch (err) {
      console.error("Erro Pipefy:", err);
      await slack.sendDM(user, "⚠️ Erro ao enviar evento de risco.");
    }
  });

  // Novo Fornecedor
  app.view("form_novo_fornecedor", async ({ ack, view, body }) => {
    await ack();
    const user = body.user.id;
    const v = view.state.values;

    const data = {
      nome_fornecedor: v.nome_fornecedor.value.value,
      empresa_exterior: v.empresa_exterior.value.selected_option.value,
      tipo_contrato: v.tipo_contrato.value.selected_option.value,
      escopo_descricao: v.escopo_descricao.escopo_text.value,
      area_solicitante: v.area_solicitante.value.selected_option.value,
      confidencial: v.confidencial.value.selected_option.value,
      nome_solicitante: v.nome_solicitante.value.value,
      email_solicitante: v.email_solicitante.value.value,
      estado_fornecedor: v.estado_fornecedor.value.value,
      nome_aprovador: v.nome_aprovador.value.value,
      fornecedor_pontual: v.fornecedor_pontual.value.selected_option.value,
      dados_sensiveis: v.dados_sensiveis.value.value,
    };

    let arquivos = [];

    try {
      const fileBlock = v.anexos.value;

      if (fileBlock?.files?.length > 0) {
        arquivos = fileBlock.files.map((f) => ({
          id: f.id,
          title: f.title,
          mimetype: f.mimetype,
        }));
      }
    } catch (e) {
      console.warn("Nenhum arquivo anexado:", e);
    }

    try {
      const card = await pipefy.createNovoFornecedor(data, arquivos);

      await slack.sendDM(
        user,
        `👤 Novo fornecedor enviado com sucesso!\n\n*${data.nome_fornecedor}*\n\n*Card:* ${card.id}`
      );

    } catch (err) {
      console.error("Erro Pipefy:", err);
      await slack.sendDM(user, "⚠️ Erro ao enviar novo fornecedor.");
    }
  });

  // Pagamento RH
  app.view("form_pagamento_rh", async ({ ack, view, body }) => {
    await ack();
    const v = view.state.values;
    const user = body.user.id;

    const colaborador = v.colaborador.value.selected_user;
    const data = v.data_vencimento.value.selected_date;
    const valor = v.valor.value.value;

    let anexos = [];
    try {
      const fileBlock = v.anexos.value;

      if (fileBlock?.files?.length > 0) {
        anexos = fileBlock.files.map((f) => ({
          id: f.id,
          title: f.title,
          mimetype: f.mimetype,
        }));
      }
    } catch (e) {
      console.warn("Nenhum anexo encontrado:", e);
    }

    try {
      const card = await pipefy.createPagamentoRH(colaborador, data, valor, anexos);

      await slack.sendDM(
        user,
        `💰 Pagamento RH enviado com sucesso!\n\n*${colaborador}*\n*Valor:* R$${valor}\n\n*Card:* ${card.id}`
      );

    } catch (err) {
      console.error(err);
      await slack.sendDM(user, "⚠️ Erro ao enviar pagamento RH.");
    }
  });

  // Reembolso
  app.view("form_reembolso", async ({ ack, view, body }) => {
    await ack();
    
    const v = view.state.values;
    const user = body.user.id;

    const beneficiario = v.beneficiario.value.selected_user;
    const valor = v.valor.value.value;
    const categoria = v.categoria.value.selected_option.value;
    const data = v.data_vencimento.value.selected_date;

    const anexos = (body.files || []).map(f => ({
      id: f.id,
      title: f.title,
      mimetype: f.mimetype,
    }));

    try {
      const card = await pipefy.createReembolso(
        beneficiario,
        valor,
        categoria,
        data,
        anexos
      );

      await slack.sendDM(
        user,
        `💸 Reembolso enviado com sucesso!\n\n*${beneficiario}*\n*Valor:* R$${valor}\n\n*Card:* ${card.id}`
      );

    } catch (err) {
      console.error(err);
      await slack.sendDM(user, "⚠️ Erro ao enviar reembolso.");
    }
  });

  // Pagamento Geral
  app.view("form_pagamento", async ({ ack, view, body }) => {
    await ack();
    const v = view.state.values;
    const user = body.user.id;

    const solicitante = v.solicitante.value.selected_user;
    const fornecedor = v.fornecedor.value.value;
    const cnpj = v.cnpj.value.value;
    const valor = v.valor.value.value;
    const data = v.data_vencimento.value.selected_date;
    const area = v.area_responsavel.value.selected_option.value;

    let anexos = [];
    try {
      const fileBlock = v.anexos.value;

      if (fileBlock?.files?.length > 0) {
        anexos = fileBlock.files.map((f) => ({
          id: f.id,
          title: f.title,
          mimetype: f.mimetype,
        }));
      }
    } catch (e) {
      console.warn("Nenhum anexo:", e);
    }

    try {
      const card = await pipefy.createPagamento(
        solicitante,
        fornecedor,
        cnpj,
        valor,
        data,
        area,
        anexos
      );

      await slack.sendDM(
        user,
        `📤 Pagamento enviado com sucesso!\n\n*${solicitante}*\n*Fornecedor:* ${fornecedor}\n*Valor:* R$${valor}\n\n*Card:* ${card.id}`
      );

    } catch (err) {
      console.error(err);
      await slack.sendDM(user, "⚠️ Erro ao enviar solicitação de pagamento.");
    }
  });
};
