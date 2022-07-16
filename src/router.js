const Router = require("express");
const assetCustomerController = require("./controllers/assetCustomer.controller");
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
})

router.get('/investimentos/compra', assetCustomerController.buyOrder)


module.exports = router;
