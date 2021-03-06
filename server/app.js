const path = require('path')
const express = require('express')
const app = express()
const jsonParser = require('body-parser').json()
const compression = require('compression')
const helloWorldController = require('./controllers/helloworld')
const isProd = process.env.NODE_ENV === 'production'

app.set('port', (process.env.PORT || 3000))

if (isProd) {
  app.use(compression())
}

app.use('/', express.static(path.join(__dirname, '../client/app')))
app.use(jsonParser)

app.route('/api/hellos')
    .get((req, res) => {
      let helloList = helloWorldController.getHelloList()
      res.json(helloList)
    })
    .post((req, res) => {
      let newlyHello = helloWorldController.addHello(req.body)
      res.json(newlyHello)
    })

app.listen(app.get('port'), () => {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})
