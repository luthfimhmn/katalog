const { Catalog } = require('../models')
class CatalogController {

  static getAllCatalog (req, res, next) {
    //Dapatkan semua Catalog dengan kepemilikan user id tertentu
    let UserId = req.loggedUser.id
    Catalog.findAll({ where: { UserId }, order: [['id', 'DESC']]})
      .then(catalogs => {
        res.status(200).json(catalogs)
      })
      .catch(err => {
        next(err)
      })
  }

  static getCatalogById (req, res, next) {
    //Dapatkan Catalog berdasar ID tertentu
    let id = +req.params.id
    let UserId = req.loggedUser.id
    Catalog.findByPk(id)
      .then(data => {
        if(data.UserId === UserId) {
          res.status(200).json(data)
        } else {
          next({
            name: 'Not Found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static createCatalog (req, res, next) {
    //Buat catalog baru
    let UserId = req.loggedUser.id
    let { name } = req.body
    Catalog.create({ name, UserId })
        .then(data => res.status(201).json(data))
        .catch(err => {
            next(err)

        })
  }
}

module.exports = CatalogController