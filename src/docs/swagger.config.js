const swaggerConfig = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'XP Inc Backend Api',
      description: 'Api feita como parte do processo seletivo para desenvolvedor de software na empresa XP. A api disponibiliza rotas para realizar operações de compra e venda de ativos, deposito e saque em conta corrente, efetuar login e cadastro de usuários. Além disso, é possível buscar por informações de ativos e clientes específicos.',
      version: '1.0',
    },
    servers: [{
      url: 'http://localhost:3000',
      description: 'Servidor Local',
      
    }, {
      url: 'https://backend-api-xp.herokuapp.com/',
      description: 'Servidor Heroku',
      }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      }
    }
  },
  apis: ['./src/router.js'],
};

module.exports = swaggerConfig;