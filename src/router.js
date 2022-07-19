const {validateQuantity, errorHandler, tokenValidator }  = require("./middlewares/");
const Router = require("express");
const {assetCustomerController, customerController, assetController} = require("./controllers/");
const router = Router();

router.post('/investimentos/compra', tokenValidator ,validateQuantity, assetCustomerController.buyOrder)
router.post('/investimentos/venda', tokenValidator, validateQuantity, assetCustomerController.sellOrder)

router.get('/cliente/:id', customerController.getCustomerAssets)

router.get('/ativos/:codAtivo', assetController.getByCode)

router.post('/login', customerController.signInCustomer)

router.use(errorHandler)
module.exports = router;
