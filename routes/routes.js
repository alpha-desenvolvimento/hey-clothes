let express = require("express")
let router = express.Router();

let ProductController = require('../controllers/ProductController')
let UserController = require('../controllers/UserController')

router.get('/api/products/page/:num',ProductController.findAll)
router.get('/api/users',UserController.findAll)

module.exports = router;