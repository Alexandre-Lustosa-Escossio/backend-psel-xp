const {validateQuantity, errorHandler, tokenValidator }  = require("./middlewares/");
const Router = require("express");
const {assetCustomerController, customerController} = require("./controllers/");
const router = Router();

router.post('/investimentos/compra', tokenValidator ,validateQuantity, assetCustomerController.buyOrder)
router.post('/investimentos/venda', tokenValidator, validateQuantity, assetCustomerController.sellOrder)

router.post('/login', customerController.signInCustomer)

router.use(errorHandler)
module.exports = router;
