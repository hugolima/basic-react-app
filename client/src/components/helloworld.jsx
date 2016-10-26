import React, { PropTypes } from 'react'
import helloConfig from 'server/config.js'
import 'stylesheets/modules/helloworld.scss'

const helloShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}


// *** Last Hello World Component *** //

function LastHelloWorld({hello}) {
  return <div className="helloworld__last">
    <h1 className="text-left">Last Hello</h1>
    <p className="text-left">Name: <strong>{hello ? hello.name : 'Nobody yet'}</strong></p>
    <p className="text-left">Local Date: <strong>{hello ? hello.date : 'No local date'}</strong></p>
  </div>
}

LastHelloWorld.propTypes = {
  hello: PropTypes.shape(helloShape)
}


// *** Form New Hello World Component *** //

class NewHelloWorldForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNewHelloSubmit = this.handleNewHelloSubmit.bind(this)

    this.state = {validationError: {}, newName: ''}
  }

  componentDidMount() {
    this.helloNameInput.focus()
  }

  handleNameChange(e) {
    this.setState({validationError: {}, newName: e.target.value})
  }

  handleNewHelloSubmit(e) {
    e.preventDefault();
    let newName = this.state.newName.trim()

    this.setState({validationError: {}, newName: ''})
    this.helloNameInput.focus()
    this.props.handleNewHello({
      id: 0,
      _id: new Date().getTime(),
      name: newName,
      date: '' + new Date()
    }, (validationError) => {
      this.setState({validationError, newName})
    })
  }

  hasError(id) {
    return !!this.state.validationError[id]
  }

  getErrorMessage(id) {
    return this.state.validationError[id].message
  }

  render() {
    return (
      <form className="helloworld__new-form" onSubmit={this.handleNewHelloSubmit}>
        <div className={'form-group text-left' + (this.hasError('element_hello_name') && ' has-error')}>
          <input type="text" className="form-control input-lg" maxLength={helloConfig.maxLengthName} placeholder="Be the last one, type your name..."
              ref={i => this.helloNameInput = i}
              value={this.state.newName}
              onChange={this.handleNameChange} />
          {
            this.hasError('element_hello_name') && <label className="control-label helloworld__new-form__error-msg">{this.getErrorMessage('element_hello_name')}</label>
          }
        </div>
        <p className="text-left"><button type="submit" className="btn btn-success">Say Hello</button></p>
      </form>
    )
  }
}


// *** Hello World Table Row Component *** //

function HelloWorldRow({ hello }) {
  return <tr>
    <td>{hello.id || ''}</td>
    <td>{hello.name}</td>
    <td>{hello.date}</td>
  </tr>
}

HelloWorldRow.propTypes = {
  hello: PropTypes.shape(helloShape).isRequired
}


// *** Hello World Table List Component *** //

function HelloWorldTable({ helloList }) {
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


// *** Hello World Main Component *** //

class HelloWorldComponent extends React.Component {
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

export default HelloWorldComponent

// For unit tests
export const InternalComponents = {
  LastHelloWorld: LastHelloWorld,
  HelloWorldRow: HelloWorldRow,
  HelloWorldTable: HelloWorldTable
}