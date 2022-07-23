const Router = require('express');
const { validateQuantity, errorHandler, tokenValidator, validateCashAmount, checkIfCustomerIsOwner } = require('./middlewares');
const { assetCustomerController, customerController, assetController, checkingAccountController } = require('./controllers');

const router = Router();

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
 *      type: string
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcwNzIxMzU5fQ
 *    Ativo:
 *      type: object
 *      required:
 *       - codAtivo
 *       - QtdeAtivo
 *       - Valor
 *      properties:
 *        codAtivo:
 *          type: string
 *        QtdeAtivo:
 *          type: number
 *        Valor:
 *          type: number
 *      example:
 *       codAtivo: xpbr31
 *       QtdeAtivo: 21
 *       Valor: R$ 21.00
 *    OperacaoCC:
 *      type: object
 *      required:
 *       - codCliente
 *       - Valor
 *      properties:
 *        codCliente:
 *          type: number
 *        Valor:
 *          type: number
 *      example:
 *       codCliente: 1
 *       Valor: R$ 21.00
 *    Login:
 *         type: object
 *         required:
 *           - email
 *           - senha
 *         properties:
 *           email:
 *             type: string
 *           senha:
 *             type: string
 *         example:
 *          email: guilherme.benchimol@xp.inc
 *          senha: codigoxp
 *    
* */

router.get('/', (req, res) => {
  res.send('Bem vindo ao XP Inc Backend Api, acesse /swagger para ver o documentação da api.');
})

/**
 * @swagger
 * tags:
 *  name: Investimentos
 *  description: Rotas para vender e comprar ativos
 * 
 * @swagger
 *   /investimentos/comprar:
  *    post:
  *      security:
  *       - bearerAuth: [] 
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
  *      security:
  *       - bearerAuth: [] 
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
 * tags:
 *  name: Clientes
 *  description: Rotas para manipulação de clientes
 * 
 * @swagger
  *  /clientes/registro:
  *    post:
  *      tags: [Clientes]
  *      description: Realiza o cadastro do cliente e retorna um objeto com seus dados
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
  *      security:
  *       - bearerAuth: [] 
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
  *          description: Retorna um objeto com dados do cliente
  *          content:
  *            application/json:
  *              schema:
  *                type: object
  *                $ref: '#/components/schemas/Cliente'
  *        404:
  *          description: Cliente não encontrado
  *        401:
  *          description: Usuário buscado não é usuário logado ou token de autorização inválido 
  * 
  * @swagger
  *  /login:
  *    post:
  *      tags: [Clientes]
  *      description: Realiza o login de um cliente e retorna um objeto com dados do cliente
  *      parameters:
  *      - in: body
  *        name: body
  *        required: true
  *        schema:
  *          $ref: '#/components/schemas/Login'
  *      responses:
  *        200:
  *          content:
  *            application/json:
  *              schema:
  *                type: string
  *                $ref: '#/components/schemas/Token'
  *        401:
  *          description: Email ou senha inválidos
  * 
  * 
  * */
 
 router.post('/clientes/registro', customerController.registerCustomer);
 router.post('/login', customerController.signInCustomer);
 router.get('/clientes/:id', tokenValidator, checkIfCustomerIsOwner, customerController.getCustomerAssets);
 
/**
 * @swagger
 *  tags:
 *    name: Ativos
 *    description: Rotas para manipulação de ativos
 * 
 * @swagger
 *  
 *  /ativos/:codAtivo:
 *    get:
 *       security:
  *       - bearerAuth: [] 
  *      tags: [Ativos]
  *      description: Busca um ativo pelo código
  *      responses:
  *        200:
  *          description: Retorna um objeto com dados do ativo
  *          content:
  *            application/json:
  *              schema:
  *                type: object
  *                $ref: '#/components/schemas/Ativo'
 * 
 * */

router.get('/ativos/:codAtivo',tokenValidator, assetController.getByCode);

/** 
 * @swagger
 * tags:
 *  name: Conta Corrente
 *  description: Rotas para manipulação de conta corrente
 * 
 * @swagger
 * /conta/saque:
 *   post:
 *     security:
  *       - bearerAuth: [] 
 *     tags: [Conta Corrente]
 *     description: Realiza o saque de uma conta corrente
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/OperacaoCC'
 *     responses:
 *       200:
 *         description: Retorna o status da requisição]
 *       404:
 *         description: Conta não encontrada
 *       409:
 *         description: Saldo insuficiente
 *       401:
 *         description: É necessário o envio do token de autorização
 * 
 * @swagger
 * /conta/deposito:
 *   post:
 *     security:
  *     - bearerAuth: [] 
 *     tags: [Conta Corrente]
 *     description: Realiza o depósito de uma conta corrente
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/OperacaoCC'
 *     responses:
 *       200:
 *         description: Retorna o status da requisição
 *       404:
 *         description: Conta não encontrada
 *       401:
 *         description: É necessário o envio do token de autorização
 *   
 * */
router.post('/conta/saque', tokenValidator, validateCashAmount, checkingAccountController.createWithdrawalOrder);
router.post('/conta/deposito', tokenValidator, validateCashAmount, checkingAccountController.createDepositOrder); 
router.get('/conta/:codCliente', tokenValidator, checkingAccountController.getById);


router.use(errorHandler);
module.exports = router;
