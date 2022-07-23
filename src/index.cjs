const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = require('./app');
const swaggerConfig = require('./docs/swagger.config');
require('dotenv').config();

const swaggerDoc = swaggerJSDoc(swaggerConfig);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

module.exports = server;