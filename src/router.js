const Router = require('express');
const { validateQuantity, errorHandler, tokenValidator, validateCashAmount } = require('./middlewares');
const { assetCustomerController, customerController, assetController, checkingAccountController } = require('./controllers');

const router = Router();

/** 
 * @swagger
 * tags:
 *  name: Investimentos
 *  description: Endpoints voltados para operações de investimentos
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

router.post('/investimentos/comprar', tokenValidator, validateQuantity, assetCustomerController.buyOrder);
router.post('/investimentos/vender', tokenValidator, validateQuantity, assetCustomerController.sellOrder);

/** 
 * @swagger
 * tags:
 *  name: Cliente
 *  description: Endpoints voltados para informações do cliente
 * */

router.post('/clientes/registro', customerController.registerCustomer);
router.get('/clientes/:id', customerController.getCustomerAssets);

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

router.use(errorHandler);
module.exports = router;
