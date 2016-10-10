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

  const handleNewHello = (hello) => {
    dispatch(addHello(hello))
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
