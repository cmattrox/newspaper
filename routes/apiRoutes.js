const db = require('../models')

module.exports = function (app) {
  // const sessionChecker = (req, res, next) => {
  //   if (req.session.user && req.cookies.user_sid) {
  //     res.redirect('/dashboard')
  //   } else {
  //     next()
  //   }
  // }

  app.get('/dashboard/:id', function (req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate('note')
      .then(function (dbArticle) {
        res.json(dbArticle)
      })
      .catch(function (err) {
        res.json(err)
      })
  })

  app.post('/dashboard/:id', function (req, res) {
    db.Note.create(req.body)
      .then(function (dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
      })
      .then(function (dbArticle) {
        res.json(dbArticle)
      })
      .catch(function (err) {
        res.json(err)
      })
  })
}