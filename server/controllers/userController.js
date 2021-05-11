const { User } = require('../models')
const { comparePassword } = require('../helpers/password-helper')
const { generateToken } = require('../helpers/jwt-helper')

class UserController {

  static register (req, res, next) {
    //Untuk Register User
    const { name, email, password} = req.body
    User.create({name, email, password})
      .then(user => {
        res.status(201).json({
          success: true, message: 'user created', user: {
            id: user.id,
            email: user.email
          }
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static login (req, res, next) {
    const { email, password } = req.body
    //Untuk login pertama cari user berdasarkan email ke database
    User.findOne({ where: {email } })
      .then(user => {
        //Jika User Ditemukan
        if(user) {
          //Compare Password
          const comparedPassword = comparePassword(password, user.password)
          //Jika Password benar (true)
          if (comparedPassword) {
            //Generate Jsonwebtoken dengan payload berupa id user dan email user
            const access_token = generateToken({ id: user.id, email: user.email })
            //Balikkan berupa jsonwebtoken dengan key bernama access_token
            res.status(200).json({ access_token })
          } else {
            //Jika Password salah
            next({
              name: 'invalid email or password'
            })
          }
        } else {
          //jika user tidak ditemukan berdasar password maka kirim error
          next({
            name: 'invalid email or password'
          })
        }
      })
      .catch(err => {
        next({
          name: 'invalid email or password'
        })
      })
  }
}


module.exports = UserController