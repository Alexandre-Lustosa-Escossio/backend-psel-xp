const app = require("./app");
require('dotenv').config();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
})

module.exports =  server