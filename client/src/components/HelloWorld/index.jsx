import React, { PropTypes } from 'react'
import { helloShape } from './commons'
import LastHelloWorld from './lasthelloworld'
import NewHelloWorldForm from './newhelloworldform'
import HelloWorldTable from './helloworldtable'
import '../../stylesheets/modules/helloworld.scss'

class HelloWorld extends React.Component {
  componentDidMount() {
    this.props.fetchHelloList()
    setInterval(this.props.fetchHelloList, 30000)
  }

  render() {
    const { hellos, handleNewHello } = this.props

    return (
      <div>
        <div className="jumbotron">
          <LastHelloWorld hello={hellos[0]} />
          <NewHelloWorldForm handleNewHello={handleNewHello} />
        </div>
        <div className="row marketing">
          {
            hellos.length > 0
                ? <HelloWorldTable helloList={hellos} />
                : <div className="text-center"><h3>There is no Hello yet!</h3></div>
          }
        </div>
      </div>
    )
  }
}

HelloWorld.propTypes = {
  fetchHelloList: PropTypes.func.isRequired,
  handleNewHello: PropTypes.func.isRequired,
  hellos: PropTypes.arrayOf(PropTypes.shape(helloShape)).isRequired,
}

export default HelloWorld
