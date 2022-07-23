const Router = require('express');
const { validateQuantity, errorHandler, tokenValidator, validateCashAmount, checkIfCustomerIsOwner } = require('./middlewares');
const { assetCustomerController, customerController, assetController, checkingAccountController } = require('./controllers');

const router = Router();

/** 
 * @swagger
 * tags:
 *  name: Investimentos
 *  description: Endpoints voltados para operações de investimentos
 * tags:
 *  name: Clientes
 *  description: Endpoints voltados para operações de clientes
 * */

/** 
 * @swagger
 * components:
 *  schemas:
 *    Investimento:
 *      type: object
 *      required:
 *        - codCliente
 *        - codAtivo
 *        - qtdeAtivo
 *      properties:
 *        codCliente:
 *          type: number
 *        codAtivo:
 *          type: string
 *        qtdeAtivo:
 *          type: number
 *      example:
 *        codCliente: 1
 *        codAtivo: xpbr31
 *        qtdeAtivo: 21
 *    Cliente:
 *      type: object
 *      required:
 *        - nome
 *        - email
 *        - senha
 *      properties:
 *        nome:
 *          type: string
 *        email:
 *          type: string
 *        senha:
 *          type: string
 *      example:
 *       nome: Guilherme Benchimol
 *       email: guilherme.benchimol@xp.inc
 *       senha: codigoxp
 *    Token:
 *     type: string
 *     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcwNzIxMzU5fQ
 * */

/**
 * @swagger
 *   /investimentos/comprar:
  *    post:
  *      tags: [Investimentos]
  *      description: Realiza a operação de compra de ativos e retorna um objeto com dados do cliente, incluindo a nova quantidade de ações
  *      parameters:
  *      - in: body
  *        name: body
  *        required: true
  *        schema:
  *          $ref: '#/components/schemas/Investimento'
  *      responses:
  *        200:
  *          content:
  *            application/json:
  *              schema:
  *                type: object
  *                $ref: '#/components/schemas/Investimento'
  *        401:
  *          description: É necessário o envio do token de autorização
  *        422:
  *          description: Quantidade de ações inválida ou em formato inválido
  * @swagger
  *  /investimentos/vender:
  *    post:
  *      tags: [Investimentos]
  *      description: Realiza a operação de venda de ativos e retorna um objeto com dados do cliente, incluindo a nova quantidade de ações
  *      parameters:
  *      - in: body
  *        name: body
  *        required: true
  *        schema:
  *          $ref: '#/components/schemas/Investimento'
  *      responses:
  *        200:
  *          content:
  *            application/json:
  *              schema:
  *                type: object
  *                $ref: '#/components/schemas/Investimento'
  *        401:
  *          description: É necessário o envio do token de autorização
  *        422:
  *          description: Quantidade de ações inválida ou em formato inválido  
  * 
*/

router.post('/investimentos/comprar', tokenValidator , validateQuantity, assetCustomerController.buyOrder);
router.post('/investimentos/vender', tokenValidator, validateQuantity, assetCustomerController.sellOrder);

/** 
 * @swagger
  *  /clientes/registro:
  *    post:
  *      tags: [Clientes]
  *      description: Realiza o cadastro de clientes e retorna um objeto com dados do cliente
  *      parameters:
  *      - in: body
  *        name: body
  *        required: true
  *        schema:   
  *          $ref: '#/components/schemas/Cliente' 
  *      responses:
  *        200:
  *          content:
  *            application/json:
  *              schema:
  *                type: string
  *                $ref: '#/components/schemas/Token'
  *        422:
  *          description: Email já cadastrado
  * @swagger
  *  /clientes/:id:
  *    get:
  *      tags: [Clientes]
  *      description: Busca um cliente pelo id
  *      parameters:
  *      - in: path
  *        name: id
  *        required: true
  *        schema:
  *         type: number
  *      responses:
  *        200:
  *          content:
  *            application/json:
  *              schema:
  *                type: object
  *                $ref: '#/components/schemas/Cliente'
 * */

router.post('/clientes/registro', customerController.registerCustomer);
router.get('/clientes/:id', tokenValidator, checkIfCustomerIsOwner, customerController.getCustomerAssets);

/** 
 * @swagger
 * tags:
 *  name: Ativos
 *  description: Endpoints voltados para informações dos ativos
 * */

router.get('/ativos/:codAtivo', assetController.getByCode);

/** 
 * @swagger
 * tags:
 *  name: Conta Corrente
 *  description: Endpoints voltados para operações na conta corrente
 * */
router.post('/conta/saque', tokenValidator, validateCashAmount, checkingAccountController.createWithdrawalOrder);
router.post('/conta/deposito', tokenValidator, validateCashAmount, checkingAccountController.createDepositOrder); 
router.get('/conta/:codCliente', tokenValidator, checkingAccountController.getById);

/** 
 * @swagger
 * tags:
 *  name: Registro e Autenticação
 *  description: Endpoints voltados para operações de cadastro e login
 * */

router.post('/login', customerController.signInCustomer);

router.post('/orderbook', customerController.orderBook);

//router.use(errorHandler);
module.exports = router;
