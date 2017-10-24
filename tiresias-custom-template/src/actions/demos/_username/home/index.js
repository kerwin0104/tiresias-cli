function action (req, res) {
  req.getTemplatePath((err, path) => {
    if (err) {
      res.send('template not found.') // or "throw err"
    } else {
      var data = {
        myVar: 'this is myVar from \'acitons/demos/_username/home/index.js\'.',
        params: req.tiresias.params
      }
      res.render(path, data)
    }
  })
}
module.exports = action
