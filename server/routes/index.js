const router = require('express').Router()
const userRoute = require('./userRoute')
const catalogRoute = require('./catalogRoute')

router.use(userRoute)
router.use('/catalogs', catalogRoute)


module.exports = router