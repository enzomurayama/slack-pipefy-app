module.exports = (app) => {
  // Reporte de Evento de Risco
  app.command("/evento-risco", async ({ ack, body, client }) => {
    await ack();

    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: "form_evento_risco",
        title: { type: "plain_text", text: "Evento de Risco" },
        submit: { type: "plain_text", text: "Enviar" },
        close: { type: "plain_text", text: "Cancelar" },
        blocks: [
          {
            type: "input",
            block_id: "titulo_block",
            label: { type: "plain_text", text: "Título" },
            element: {
              type: "plain_text_input",
              action_id: "titulo",
            },
          },
          {
            type: "input",
            block_id: "descricao_block",
            label: { type: "plain_text", text: "Descrição do Evento" },
            element: {
              type: "plain_text_input",
              multiline: true,
              action_id: "descricao",
            },
          },
        ],
      },
    });
  });

  // Solicitação de Novo Fornecedor
  app.command("/novo-fornecedor", async ({ ack, body, client }) => {
    await ack();

    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: "form_novo_fornecedor",
        title: { type: "plain_text", text: "Novo Fornecedor" },
        submit: { type: "plain_text", text: "Enviar" },
        close: { type: "plain_text", text: "Cancelar" },

        blocks: [
          {
            type: "input",
            block_id: "nome_fornecedor",
            label: { type: "plain_text", text: "Nome do Fornecedor / Prestador de Serviço" },
            element: {
              type: "plain_text_input",
              action_id: "value",
            },
          },
          {
            type: "input",
            block_id: "empresa_exterior",
            label: { 
              type: "plain_text", 
              text: "O fornecedor está sediado no exterior?" 
            },
            element: {
              type: "static_select",
              action_id: "value",
              options: [
                { text: { type: "plain_text", text: "Sim" }, value: "sim" },
                { text: { type: "plain_text", text: "Não" }, value: "nao" },
              ],
            },
          },
          {
            type: "input",
            block_id: "tipo_contrato",
            label: { type: "plain_text", text: "Selecione o tipo de contrato / relação" },
            element: {
              type: "static_select",
              action_id: "value",
              options: [
                { text: { type: "plain_text", text: "Fornecedores/Prestadores de serviços" }, value: "fornecedor_prestador" },
                { text: { type: "plain_text", text: "Parceiros" }, value: "parceiros" },
                { text: { type: "plain_text", text: "Leads" }, value: "leads" },
                { text: { type: "plain_text", text: "Corban" }, value: "corban" },
              ],
            },
          },
          {
            type: "input",
            block_id: "escopo_descricao",
            label: {
              type: "plain_text",
              text: "Escopo da contratação"
            },
            element: {
              type: "plain_text_input",
              action_id: "escopo_text",
              multiline: true,
              placeholder: {
                type: "plain_text",
                text: "Descreva as atividades e valores envolvidos na contratação."
              }
            },
            hint: {
              type: "plain_text",
              text: "Forneça detalhes sobre escopo, atividades, custos estimados, entregáveis, etc."
            }
          },
          {
            type: "input",
            block_id: "area_solicitante",
            label: { type: "plain_text", text: "Área Solicitante" },
            element: {
              type: "static_select",
              action_id: "value",
              options: [
                { text: { type: "plain_text", text: "Diretoria" }, value: "diretoria" },
                { text: { type: "plain_text", text: "Comercial" }, value: "comercial" },
                { text: { type: "plain_text", text: "Produtos" }, value: "produtos" },
                { text: { type: "plain_text", text: "Cadastro e PLD" }, value: "cadastro_pld" },
                { text: { type: "plain_text", text: "Compliance" }, value: "compliance" },
                { text: { type: "plain_text", text: "Jurídico" }, value: "juridico" },
                { text: { type: "plain_text", text: "Inside Sales" }, value: "inside_sales" },
                { text: { type: "plain_text", text: "Tecnologia" }, value: "tecnologia" },
                { text: { type: "plain_text", text: "Operações" }, value: "operacoes" },
                { text: { type: "plain_text", text: "Financeiro" }, value: "financeiro" },
                { text: { type: "plain_text", text: "Gestão de Pessoas e Cultura Organizacional" }, value: "gpco" },
                { text: { type: "plain_text", text: "Marketing" }, value: "marketing" },
                { text: { type: "plain_text", text: "Customer Success" }, value: "customer_success" },
              ],
            },
          },
          {
            type: "input",
            block_id: "confidencial",
            label: { 
              type: "plain_text", 
              text: "Fornecedor / Prestador de Serviço Confidencial?" 
            },
            element: {
              type: "static_select",
              action_id: "value",
              options: [
                { text: { type: "plain_text", text: "Sim" }, value: "sim" },
                { text: { type: "plain_text", text: "Não" }, value: "nao" },
              ],
            },
            hint: {
              type: "plain_text",
              text: "O fornecedor deve ser tratado com sigilo, de forma restrita, apenas por pessoas específicas dentro da Up.p?"
            }
          },
          {
            type: "input",
            block_id: "nome_solicitante",
            label: { type: "plain_text", text: "Nome do Solicitante" },
            element: {
              type: "plain_text_input",
              action_id: "value",
            },
          },
          {
            type: "input",
            block_id: "email_solicitante",
            label: { type: "plain_text", text: "E-mail do Solicitante" },
            element: {
              type: "plain_text_input",
              action_id: "value",
            },
          },
          {
            type: "input",
            block_id: "anexos",
            label: { type: "plain_text", text: "Anexar Contrato / Termos / Ato Constitutivo" },
            element: {
              type: "file_input",
              action_id: "value",
            },
          },
          {
            type: "input",
            block_id: "estado_fornecedor",
            label: { 
              type: "plain_text", 
              text: "Estado onde o fornecedor está localizado" 
            },
            element: {
              type: "plain_text_input",
              action_id: "value",
            },
            hint: {
              type: "plain_text",
              text: "Ex.: SP, RJ, MG"
            }
          },
          {
            type: "input",
            block_id: "nome_aprovador",
            label: { 
              type: "plain_text", 
              text: "Nome do Aprovador" 
            },
            element: {
              type: "plain_text_input",
              action_id: "value",
            },
            hint: {
              type: "plain_text",
              text: "Inserir o nome do gestor direto que aprovou a solicitação do novo fornecedor"
            }
          },
          {
            type: "input",
            block_id: "fornecedor_pontual",
            label: { 
              type: "plain_text", 
              text: "É um fornecedor pontual?" 
            },
            element: {
              type: "static_select",
              action_id: "value",
              options: [
                { text: { type: "plain_text", text: "Sim" }, value: "sim" },
                { text: { type: "plain_text", text: "Não" }, value: "nao" },
              ],
            },
            hint: {
              type: "plain_text",
              text: "Compras não recorrentes e/ou fornecedores com serviços de valor abaixo de R$ 500,00 (quinhentos reais)"
            }
          },
          {
            type: "input",
            block_id: "dados_sensiveis",
            label: { 
              type: "plain_text", 
              text: "Os dados que o fornecedor irá processar são sensíveis?" 
            },
            element: {
              type: "plain_text_input",
              action_id: "value",
            },
            hint: {
              type: "plain_text",
              text: "Dados como nome, CPF, e-mail ou telefone. Se \"SIM\", detalhar quais dados o fornecedor utilizará e para qual finalidade"
            }
          },
        ],
      },
    });
  });

  // Solicitação de Pagamento - RH
  app.command("/pagamento-rh", async ({ ack, body, client }) => {
    await ack();

    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: "form_pagamento_rh",
        title: { type: "plain_text", text: "Pagamento - RH" },
        submit: { type: "plain_text", text: "Enviar" },
        close: { type: "plain_text", text: "Cancelar" },

        blocks: [
          {
            type: "input",
            block_id: "colaborador",
            label: { type: "plain_text", text: "Colaborador" },
            element: {
              type: "users_select",
              action_id: "value",
            },
          },
          {
            type: "input",
            block_id: "data_vencimento",
            label: { type: "plain_text", text: "Data de Vencimento" },
            element: {
              type: "datepicker",
              action_id: "value",
            },
          },
          {
            type: "input",
            block_id: "valor",
            label: { type: "plain_text", text: "Valor (R$)" },
            element: {
              type: "plain_text_input",
              action_id: "value",
              placeholder: { type: "plain_text", text: "Ex: 1500,00" }
            },
          },
          {
            type: "input",
            block_id: "anexos",
            label: { type: "plain_text", text: "Anexos" },
            element: {
              type: "file_input",
              action_id: "value",
            },
          },
        ],
      },
    });
  });

  // Solicitação de Reembolso
  app.command("/reembolso", async ({ ack, body, client }) => {
    await ack();

    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: "form_reembolso",
        title: { type: "plain_text", text: "Solicitação de Reembolso" },
        submit: { type: "plain_text", text: "Enviar" },
        close: { type: "plain_text", text: "Cancelar" },

        blocks: [
          {
            type: "input",
            block_id: "beneficiario",
            label: { type: "plain_text", text: "Beneficiário do Reembolso" },
            element: {
              type: "users_select",
              action_id: "value",
            },
          },
          {
            type: "input",
            block_id: "valor",
            label: { type: "plain_text", text: "Valor (R$)" },
            element: {
              type: "plain_text_input",
              action_id: "value",
              placeholder: { type: "plain_text", text: "Ex.: 200,00" },
            },
          },
          {
            type: "input",
            block_id: "categoria",
            label: { type: "plain_text", text: "Categoria" },
            element: {
              type: "static_select",
              action_id: "value",
              options: [
                { text: { type: "plain_text", text: "Confraternização" }, value: "confraternizacao" },
                { text: { type: "plain_text", text: "Copa e Cozinha" }, value: "copa_cozinha" },
                { text: { type: "plain_text", text: "Vale Transporte" }, value: "vale_transporte" },
                { text: { type: "plain_text", text: "Reembolso de Despesas" }, value: "despesas" },
                { text: { type: "plain_text", text: "Premiação" }, value: "premiacao" },
              ],
            },
          },
          {
            type: "input",
            block_id: "data_vencimento",
            label: { type: "plain_text", text: "Data de Vencimento" },
            element: {
              type: "datepicker",
              action_id: "value",
            },
          },
          {
            type: "input",
            block_id: "anexo",
            label: { type: "plain_text", text: "Anexo" },
            element: {
              type: "file_input",
              action_id: "value",
            },
          },
        ],
      },
    });
  });

  // Solicitação de Pagamento
  app.command("/pagamento", async ({ ack, body, client }) => {
    await ack();

    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: "form_pagamento",
        title: { type: "plain_text", text: "Solicitação de Pagamento" },
        submit: { type: "plain_text", text: "Enviar" },
        close: { type: "plain_text", text: "Cancelar" },

        blocks: [
          {
            type: "input",
            block_id: "solicitante",
            label: { type: "plain_text", text: "Solicitante" },
            element: {
              type: "users_select",
              action_id: "value",
            },
          },
          {
            type: "input",
            block_id: "fornecedor",
            label: { type: "plain_text", text: "Fornecedor" },
            element: {
              type: "plain_text_input",
              action_id: "value",
            },
          },
          {
            type: "input",
            block_id: "cnpj",
            label: { type: "plain_text", text: "CNPJ" },
            element: {
              type: "plain_text_input",
              action_id: "value",
              placeholder: { type: "plain_text", text: "Ex.: 12.345.678/0001-90" }
            },
          },
          {
            type: "input",
            block_id: "valor",
            label: { type: "plain_text", text: "Valor (R$)" },
            element: {
              type: "plain_text_input",
              action_id: "value",
              placeholder: { type: "plain_text", text: "Ex.: 1500,00" },
            },
          },
          {
            type: "input",
            block_id: "data_vencimento",
            label: { type: "plain_text", text: "Data de Vencimento" },
            element: {
              type: "datepicker",
              action_id: "value",
            },
          },
          {
            type: "input",
            block_id: "area_responsavel",
            label: { type: "plain_text", text: "Área Responsável" },
            element: {
              type: "static_select",
              action_id: "value",
              options: [
                { text: { type: "plain_text", text: "Finance" }, value: "finance" },
                { text: { type: "plain_text", text: "Compliance" }, value: "compliance" },
                { text: { type: "plain_text", text: "Comercial" }, value: "comercial" },
                { text: { type: "plain_text", text: "Produtos" }, value: "produtos" },
                { text: { type: "plain_text", text: "Tecnologia" }, value: "tecnologia" },
                { text: { type: "plain_text", text: "Marketing" }, value: "marketing" },
                { text: { type: "plain_text", text: "CS" }, value: "cs" },
                { text: { type: "plain_text", text: "Gestão de Pessoas" }, value: "gp" },
                { text: { type: "plain_text", text: "Prevenção" }, value: "prevencao" },
                { text: { type: "plain_text", text: "Jurídico" }, value: "juridico" },
                { text: { type: "plain_text", text: "Operações" }, value: "operacoes" },
                { text: { type: "plain_text", text: "Inside Sales" }, value: "inside_sales" },
              ],
            },
          },
          {
            type: "input",
            block_id: "anexos",
            label: { type: "plain_text", text: "Anexos" },
            element: {
              type: "file_input",
              action_id: "value",
            },
          },
        ],
      },
    });
  });
};
