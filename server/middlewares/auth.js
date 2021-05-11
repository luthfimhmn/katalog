const { verifyToken } = require('../helpers/jwt-helper')
const { User, Catalog } = require('../models')

const authenticate = (req, res, next) => {
  try {
    let { id, email } = verifyToken(req.headers.access_token)
    User.findOne({
      where: { id, email }
    })
      .then(user => {
        req.loggedUser = { id: user.id, email: user.email}
        next()
      })
      .catch(err => {
        next(err)
      })
  } catch (error) {
    next(error)
  }
}

const authorize = (req, res, next) => {
  let catalogId = +req.params.id
  Catalog.findByPk(catalogId)
    .then(catalog => {
      if(!catalog) next({ name: '404'})
      else {
        if(catalog.UserId === req.loggedUser.id) {
          next()
        }
      }
    })
    .catch(err => {
      next(err)
    })

}

module.exports = {
  authenticate,
  authorize
}