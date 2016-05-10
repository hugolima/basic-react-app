const path = require('path')
const express = require('express')
const app = express()
const jsonParser = require('body-parser').json()
const helloWorldController = require('./controllers/helloworld');

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../client/app')))

app.route('/api/hellos')
  .get((req, res) => {
    let helloList = helloWorldController.getHelloList()

    setTimeout(() => {
      res.json(helloList)
    }, 2000)
  })
  .post(jsonParser, (req, res) => {
    let newlyHello = helloWorldController.addHello(req.body)

    setTimeout(() => {
      res.json(newlyHello)
    }, 2000)
  })

app.listen(app.get('port'), () => {
    console.log('Server started: http://localhost:' + app.get('port') + '/')
});
