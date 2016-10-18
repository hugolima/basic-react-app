import { connect } from 'react-redux'
import { fetchHellos, addHello } from '../actions'
import HelloWorldComponent from '../components/helloworld.js'

function mapStateToProps(state) {
  return {
    hellos: state.hello.items
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const fetchHelloList = () => {
    dispatch(fetchHellos())
  }

  const handleNewHello = (hello, errorFn) => {
    function validationErrorsFn(errors) {
      const errorObj = errors.reduce((result, error) => {
        result[error.id_element] = {...error}
        return result
      }, {})
      errorFn(errorObj)
    }
    dispatch(addHello(hello, validationErrorsFn))
  }

  return {
    fetchHelloList,
    handleNewHello
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloWorldComponent)
