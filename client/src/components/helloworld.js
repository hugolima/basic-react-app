import React, { PropTypes } from 'react'
import helloConfig from 'server/config.js'
import 'stylesheets/modules/helloworld.scss'

const helloShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

const LastHelloWorld = ({hello}) => (
  <div className="helloworld__last">
    <h1 className="text-left">Last Hello</h1>
    <p className="text-left">Name: <strong>{hello ? hello.name : 'Nobody yet'}</strong></p>
    <p className="text-left">Local Date: <strong>{hello ? hello.date : 'No local date'}</strong></p>
  </div>
)

LastHelloWorld.propTypes = {
  hello: PropTypes.shape(helloShape)
}

class NewHelloWorldForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNewHelloSubmit = this.handleNewHelloSubmit.bind(this)
    this.hasErrorsForElement = this.hasErrorsForElement.bind(this)
    this.state = {
      errors: [],
      newName: ''
    }
  }

  handleNameChange(e) {
    this.setState({newName: e.target.value})
  }

  handleNewHelloSubmit(e) {
    e.preventDefault();
    let newName = this.state.newName.trim()

    this.setState({errors: [], newName: ''})

    this.props.onNewHello({
      id: 0,
      _id: new Date().getTime(),
      name: newName,
      date: '' + new Date()
    }, errors => {
      this.setState({
        errors,
        newName
      })
    })
  }

  hasErrorsForElement(id) {
    const errors = this.state.errors.filter(error => {
      if (error.id_element === id) {
        return true
      }
      return false
    })

    return !!errors.length
  }

  render() {
    return (
      <form className="helloworld__new-form" onSubmit={this.handleNewHelloSubmit}>
        <div className={this.hasErrorsForElement('element_hello_name') ? 'form-group has-error' : 'form-group'}>
          <input type="text" className="form-control input-lg" maxLength={helloConfig.maxLengthName}
              placeholder="Be the last one, type your name..."
              value={this.state.newName}
              onChange={this.handleNameChange} />
        </div>
        <p className="text-left"><button type="submit" className="btn btn-success">Say Hello</button></p>
      </form>
    )
  }
}

const HelloWorldRow = ({hello}) => (
  <tr>
    <td>{hello.id || ''}</td>
    <td>{hello.name}</td>
    <td>{hello.date}</td>
  </tr>
)

HelloWorldRow.propTypes = {
  hello: PropTypes.shape(helloShape).isRequired
}

const HelloWorldTable = ({helloList}) => {
  let helloRows = helloList.map(hello => {
    let rowId = hello.id || hello._id
    return <HelloWorldRow hello={hello} key={rowId} />
  })

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Local Date</th>
          </tr>
        </thead>
        <tbody>{helloRows}</tbody>
      </table>
    </div>
  )
}

HelloWorldTable.propTypes = {
  helloList: PropTypes.arrayOf(PropTypes.shape(helloShape)).isRequired
}

class HelloWorldComponent extends React.Component {
  componentDidMount() {
    this.props.fetchHelloList()
    setInterval(this.props.fetchHelloList, 30000)
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <LastHelloWorld hello={this.props.hellos[0]} />
          <NewHelloWorldForm onNewHello={this.props.handleNewHello} />
        </div>
        <div className="row marketing">
          {
            this.props.hellos.length > 0
                ? <HelloWorldTable helloList={this.props.hellos} />
                : <div className="text-center"><h3>There is no Hello yet!</h3></div>
          }
        </div>
      </div>
    )
  }
}

export default HelloWorldComponent
