const axios = require("axios");
const config = require("../config");
const FormData = require("form-data");

// Escape seguro para strings enviadas ao GraphQL
const escapeGQL = (str) =>
  String(str || "").replace(/"/g, '\\"').replace(/\n/g, "\\n");

// Faz upload de um arquivo do Slack para um campo de anexo do Pipefy
async function uploadAttachmentToPipefy(slackFile, cardId) {
  try {
    const { url_private_download, mimetype, title } = slackFile;

    const fileBytes = await axios.get(url_private_download, {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
    });

    const form = new FormData();
    form.append("file", fileBytes.data, { filename: title, contentType: mimetype });
    form.append("card_id", cardId);

    const res = await axios.post(
      "https://api.pipefy.com/attachments",
      form,
      {
        headers: {
          Authorization: `Bearer ${config.PIPEFY_TOKEN}`,
          ...form.getHeaders(),
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Erro ao enviar anexo ao Pipefy:", err.response?.data || err);
    return null;
  }
}

// Criar card genérico
async function createCard(pipeId, fields) {
  const fieldsGQL = fields
    .map(
      (f) =>
        `{ field_id: "${f.field_id}", field_value: "${escapeGQL(
          f.field_value
        )}" }`
    )
    .join("\n");

  const mutation = {
    query: `
      mutation {
        createCard(
          input: {
            pipe_id: ${pipeId},
            fields_attributes: [ ${fieldsGQL} ]
          }
        ) {
          card { id title }
        }
      }
    `,
  };

  const res = await axios.post("https://api.pipefy.com/graphql", mutation, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.PIPEFY_TOKEN}`,
    },
  });

  if (res.data.errors) {
    console.error("❌ PIPEFY ERROR:", JSON.stringify(res.data.errors, null, 2));
    throw new Error("Erro ao criar card no Pipefy");
  }

  if (!res.data.data.createCard) {
    console.error("❌ CREATECARD RETURNED NULL:", res.data);
    throw new Error("Pipefy retornou createCard = null");
  }

  return res.data.data.createCard.card;
}


module.exports = {
  // EVENTO DE RISCO
  async createEventoRisco(titulo, descricao) {
    return await createCard(config.PIPE_ID_EVENTO_RISCO, [
      { field_id: "o_qu", field_value: titulo },
      { field_id: "descri_o_do_evento", field_value: descricao },
    ]);
  },

  // NOVO FORNECEDOR 
  async createNovoFornecedor(data, anexos = []) {
    const card = await createCard(config.PIPE_ID_NOVO_FORNECEDOR, [
      { field_id: "nome_fornecedor", field_value: data.nome_fornecedor },
      { field_id: "empresa_exterior", field_value: data.empresa_exterior },
      { field_id: "tipo_contrato", field_value: data.tipo_contrato },
      { field_id: "escopo_descricao", field_value: data.escopo_descricao },
      { field_id: "area_solicitante", field_value: data.area_solicitante },
      { field_id: "confidencial", field_value: data.confidencial },
      { field_id: "nome_solicitante", field_value: data.nome_solicitante },
      { field_id: "email_solicitante", field_value: data.email_solicitante },
      { field_id: "estado_fornecedor", field_value: data.estado_fornecedor },
      { field_id: "nome_aprovador", field_value: data.nome_aprovador },
      { field_id: "fornecedor_pontual", field_value: data.fornecedor_pontual },
      { field_id: "dados_sensiveis", field_value: data.dados_sensiveis },
    ]);

    for (const file of anexos) {
      await uploadAttachmentToPipefy(file, card.id);
    }

    return card;
  },

  // PAGAMENTO RH
  async createPagamentoRH(colaborador, data, valor, anexos = []) {
    const card = await createCard(config.PIPE_ID_PAGAMENTO_RH, [
      { field_id: "colaborador", field_value: colaborador },
      { field_id: "data_vencimento", field_value: data },
      { field_id: "valor", field_value: valor },
    ]);

    for (const file of anexos) {
      await uploadAttachmentToPipefy(file, card.id);
    }

    return card;
  },

  // REEMBOLSO
  async createReembolso(beneficiario, valor, categoria, data, anexos = []) {
    const card = await createCard(config.PIPE_ID_REEMBOLSO, [
      { field_id: "nome", field_value: beneficiario },
      { field_id: "valor", field_value: valor },
      { field_id: "categorias", field_value: categoria },
      { field_id: "data_de_vencimento", field_value: data },
      { field_id: "anexo", field_value: "" } // 🔥 nunca envie anexos aqui
    ]);

    for (const file of anexos) {
      await uploadAttachmentToPipefy(file, card.id);
    }

    return card;
  },

  // PAGAMENTO GERAL
  async createPagamento(solicitante, fornecedor, cnpj, valor, data, area, anexos = []) {
    const card = await createCard(config.PIPE_ID_PAGAMENTO, [
      { field_id: "solicitante", field_value: solicitante },
      { field_id: "fornecedor", field_value: fornecedor },
      { field_id: "cnpj", field_value: cnpj },
      { field_id: "valor", field_value: valor },
      { field_id: "data_vencimento", field_value: data },
      { field_id: "area_responsavel", field_value: area },
    ]);

    for (const file of anexos) {
      await uploadAttachmentToPipefy(file, card.id);
    }

    return card;
  },
};
