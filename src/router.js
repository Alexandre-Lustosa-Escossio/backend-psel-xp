const Router = require("express");
const assetCustomerController = require("./controllers/assetCustomer.controller");
const { validateQuantity } = require("./middlewares/assetOrderValidator");
const router = Router();

router.post('/investimentos/compra',validateQuantity, assetCustomerController.buyOrder)


module.exports = router;
