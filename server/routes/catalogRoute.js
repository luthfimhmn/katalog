const router = require('express').Router()
const CatalogController = require('../controllers/catalogController')
const { authenticate, authorize } = require('../middlewares/auth')

router.use(authenticate)
router.get('/', CatalogController.getAllCatalog)
router.post('/', CatalogController.createCatalog)
router.use(':id', authorize)
router.get('/:id', CatalogController.getCatalogById)

module.exports = router
