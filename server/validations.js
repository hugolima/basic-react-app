const { minLengthName, maxLengthName } = require('./config.js')
const idGenericError = 'generic_error'

function error(id_element, message) {
  return {
    id_element,
    message
  }
}

function validateHelloObject(hello) {
  const idElementName = 'element_hello_name'
  let errors = []

  if (!hello) {
    errors.push(error(idGenericError, 'Hello object not provided'))
  }

  if (!hello.name) {
    errors.push(error(idElementName, 'Who is giving the hello'))
  } else {
    if (hello.name.length < minLengthName) {
      errors.push(error(idElementName, `The name must have at least ${minLengthName} characters`))
    } else if (hello.name.length > maxLengthName) {
      errors.push(error(idElementName, `The name must have at most ${maxLengthName} characters`))
    }
  }

  return errors
}

const validations = {
  validateHelloObject
}

module.exports = validations
