const axios = require("axios");
const config = require("../config");

module.exports = {
  async createEventoRisco(titulo, descricao) {
    const mutation = {
      query: `
        mutation {
          createCard(
            input: {
              pipe_id: ${config.PIPE_ID_EVENTO_RISCO}
              fields_attributes: [
                { field_id: "o_qu", field_value: "${titulo}" }
                { field_id: "descri_o_do_evento", field_value: "${descricao}" }
              ]
            }
          ) {
            card {
              id
              title
            }
          }
        }
      `,
    };

    const res = await axios.post(
      "https://api.pipefy.com/graphql",
      mutation,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.PIPEFY_TOKEN}`,
        },
      }
    );

    return res.data.data.createCard.card;
  },
};
