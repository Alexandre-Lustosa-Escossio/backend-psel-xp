const Router = require("express");
const errorHandler = require('./middlewares/errorHandler')
const { assetCustomerController, customerController} = require("./controllers/");
const { validateQuantity } = require("./middlewares/assetOrderValidator");
const router = Router();

router.post('/investimentos/compra',validateQuantity, assetCustomerController.buyOrder)

router.post('/login', customerController.signInCustomer)

router.use(errorHandler)
module.exports = router;
