
const fs = require('fs')
const helloConfig = require('../config.js')
const { validateHelloObject } = require('../validations.js')
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

function validateHello(hello) {
  const errors = validateHelloObject(hello)

  if (errors.length > 0) {
    let message = errors.map(error => error.message).join(',')
    throw new Error(message)
  }
}

const helloWorldController = {
  getHelloList: () => {
    let hellosObject = readJsonFromStore()
    return hellosObject.hellos
  },
  addHello: (hello) => {
    let hellosObject = readJsonFromStore()
    let lastId = hellosObject.last_id

    validateHello(hello)

    hello.id = lastId + 1
    hello.name = hello.name.slice(0, helloConfig.maxLengthName)

    // Keeps the list at the maximum of defined elements
    if (hellosObject.hellos.length >= helloConfig.maxHellosStore) {
      hellosObject.hellos.pop()
    }

    hellosObject.last_id = hello.id
    hellosObject.hellos.unshift(hello)

    writeJsonToStore(hellosObject);
    return hello
  }
}

module.exports = helloWorldController
