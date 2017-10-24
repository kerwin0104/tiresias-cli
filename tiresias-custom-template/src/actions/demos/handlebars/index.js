function action (req, res) {
  req.getTemplatePath((err, path) => {
    if (err) {
      res.send('template not found.') // or "throw err"
    } else {
      var data = {
        myVar: 'this is myVar from \'acitons/demos/handlebars/index.js\'.'
      }
      res.render(path, data)
    }
  })
}
module.exports = action
