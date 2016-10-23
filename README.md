# Cupom API

##API Rest da Aplicação CupomApp

<p>Esta aplicação tem como objetivo, a partitr da utilizaçõ do Node.js + Express, criar uma API, utilizando a linguagem de programação Javascript, que irá servir uma aplicação mobile cliente armazenando informações de um cupom fiscal enviadas por esta aplicação em um banco de dados PstgreSQL, esta api também armazena as  informações de todas as requisições http feitas pela aplicação também em uma base de dados PostgreSQL, a comunicação com a aplicação mobile é feita a partir de mensagens JSON. Para o desenvolvimento desta aplicação foram utilizados:</p>

  <ul>• Node.js 4.5.0;</ul>

  <ul>• PostgreSQL 9.4.1210;</ul>

  <ul>• NPM 2.15.9;</ul>

  <ul>• Express 4.14.0;</ul>

  <ul>• Body-Parser 1.15.2;</ul>

  <ul>• pg 6.1.0;</ul>

  <ul>• Atom 1.12.0.</ul>

<p>No desenvolvimento desta aplicação foi criado um arquivo "index.js" que importa os módulos do node e arquivos necessários a aplicação, cria o servidor (usando Express) e o coloca no ar. Além deste arquivo, esta aplicação também possui:</p>

  <ul>•	Controllers: Criam as possíveis rotas a serem utilizadas dentro da api, dentre os controllers estão:

  <ul>•	cupomController – cria as rotas relacionadas aos cupons (/cupom): GET mostrando todos os cupons
  cadastrados no banco de dados, POST adicionando um novo cupom, DELETE apagando um cupom, todas as
  rotas armazenam informações de sua requisição;</ul>

  <ul>•	requestController – cria as rotas relacionadas às requests (/request): GET mostrando todas as
  requests cadastradas no banco de dados, também possui uma rota (/delete) para apagar as requests
  salvas em banco;</ul>
  </ul>

  <ul>•	Models: Utilizando o modulo pg se conecta com um banco de dados PostgreSQL e faz a comunicação com este banco, criando assim os models:

  <ul>•	cupom – cria a tabela de cupom caso ainda não exista e faz a seleção, criação e destruição de
  cupons dentro do banco de dados;</ul>

  <ul>•	request – cria a tabela de requests caso ainda não exista e faz a seleção, criação e destruição de
  requests dentro do banco de dados;</ul>
  </ul>

<p>Para utilizar esta aplicação deve-se ter acesso a internet e possuir instalado em sua maquina a ferramenta Node.js e NPM. Os passos para a inicialização são:</p>

  1. Usando o console do sistema operacional entre na pasta do projeto;

  2. Instale os modulos do node.js usados no projeto: "npm install";

  3. Inicie o sistema: "npm start"
