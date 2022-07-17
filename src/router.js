const Router = require("express");
const errorHandler = require('./middlewares/errorHandler')
const assetCustomerController = require("./controllers/assetCustomer.controller");
const { validateQuantity } = require("./middlewares/assetOrderValidator");
const router = Router();

router.post('/investimentos/compra',validateQuantity, assetCustomerController.buyOrder)

router.use(errorHandler)
module.exports = router;
