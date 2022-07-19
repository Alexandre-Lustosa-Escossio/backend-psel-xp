const swaggerConfig = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "XP Inc Backend Api",
      description: "Api feita como parte do processo seletivo para desenvolvedor de software na empresa XP",
      version: "1.0"
    },
    servers: [{
      url: "http://localhost:3000",
      description: "Servidor Local"
    }]
  },
  apis: ["./src/router.js"]
}

module.exports = swaggerConfig