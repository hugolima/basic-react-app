
const fs = require('fs')
const filePath = './server/hellostore.json'

function checkFileExists() {
  try {
    fs.accessSync(filePath, fs.F_OK)
  } catch (e) {
    fs.writeFileSync(filePath, JSON.stringify({'last_id':0,'hellos':[]}), 'utf-8')
  }
}

function readJsonFromStore() {
  checkFileExists()
  let storeContent = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(storeContent)
}

function writeJsonToStore(jsonObject) {
  checkFileExists()
  fs.writeFileSync(filePath, JSON.stringify(jsonObject), 'utf-8')
}

class HelloWorldController {
  getHelloList() {
    let hellosObject = readJsonFromStore()
    return hellosObject.hellos
  }

  addHello(hello) {
    let hellosObject = readJsonFromStore()
    let lastId = hellosObject.last_id

    hello.id = lastId + 1
    hellosObject.last_id = hello.id
    hellosObject.hellos.unshift(hello)

    writeJsonToStore(hellosObject);
    return hello
  }
}

module.exports = new HelloWorldController()
