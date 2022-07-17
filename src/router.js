const Router = require("express");
const assetCustomerController = require("./controllers/assetCustomer.controller");
const router = Router();

router.post('/investimentos/compra', assetCustomerController.buyOrder)


module.exports = router;
