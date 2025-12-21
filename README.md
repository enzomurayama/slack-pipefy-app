# Slack App - Integração Pipefy

App de integração entre Slack e Pipefy para envio de formulários e notificações.  

Projeto desenvolvido em JavaScript, com o objetivo de permitir que eventos/formulários sejam enviados do Slack para o Pipefy, facilitando a comunicação entre times e processos.

<br>

## ✨ Funcionalidades

- Envia dados de formulários do Slack para criar cards no Pipefy.  
- Permite configurar via variáveis de ambiente as credenciais e endpoints necessários.  
- Permite customizar campos conforme sua estrutura no Pipefy.

<br>

## 📜 Pré-requisitos

![Git](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

<br>

Antes de executar o projeto, certifique-se de que você possui:

- Uma **conta no Pipefy**;
- Um **pipe configurado** no Pipefy para recebimento dos cards.
- Um **workspace no Slack** com permissões para instalar aplicativos;

<br>

## 🛠️ Tecnologias

Tecnologias utilizadas: Node.js, JavaScript, Slack Bolt e Pipefy API.

![Skills](https://skills.syvixor.com/api/icons?i=nodejs,js,slack,google-sheets)

<br>

## **🤖 Criação do Slack App**

Este projeto requer um Slack App configurado no workspace.

Siga o guia oficial do Slack (Bolt para Node.js) para criar o app, configurar permissões e obter os tokens:

👉 https://api.slack.com/start/building/bolt-js

<br>

## 🪛 Configurações Iniciais

Clone o repositório

```
git clone https://github.com/enzomurayama/slack-pipefy-app.git
cd slack-pipefy-app
```

<br>

Instale as dependências

```
npm install
```

<br>

Crie um arquivo .env na raiz do projeto com base no .env.example

```
cp .env.example .env
```

Preencha as variáveis com os seus valores.

<br>

Após configurar o .env, inicie a aplicação com:

```
npm run dev
```

<br>

ou, em modo produção:
```
npm start
```

