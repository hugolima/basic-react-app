import React from 'react'
import HelloConfig from 'server/config.js'
import 'stylesheets/modules/helloworld.scss'

class LastHelloWorld extends React.Component {
  render() {
    return (
      <div className="helloworld__last">
        <h1 className="text-left">Last Hello</h1>
        <p className="text-left">Name: <strong>{this.props.hello ? this.props.hello.name : 'Nobody yet'}</strong></p>
        <p className="text-left">Local Date: <strong>{this.props.hello ? this.props.hello.date : 'No local date'}</strong></p>
      </div>
    )
  }
}

class NewHelloWorldForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNewHelloSubmit = this.handleNewHelloSubmit.bind(this)
    this.state = {
      newName: ''
    }
  }

  handleNameChange(e) {
    this.setState({newName: e.target.value})
  }

  handleNewHelloSubmit(e) {
    e.preventDefault();
    let newName = this.state.newName.trim()

    if (!newName) {
      return
    }

    this.props.onNewHello({
      id: '',
      _id: new Date().getTime(),
      name: newName,
      date: '' + new Date()
    })

    this.setState({newName: ''})
  }

  render() {
    return (
      <form className="helloworld__new-form" onSubmit={this.handleNewHelloSubmit}>
        <div className="form-group">
          <input type="text" className="form-control input-lg" maxLength={HelloConfig.maxLengthName}
              placeholder="Be the last one, type your name..."
              value={this.state.newName}
              onChange={this.handleNameChange} />
        </div>
        <p className="text-left"><button type="submit" className="btn btn-success">Say Hello</button></p>
      </form>
    )
  }
}

class HelloWorldRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.hello.id}</td>
        <td>{this.props.hello.name}</td>
        <td>{this.props.hello.date}</td>
      </tr>
    )
  }
}

class HelloWorldTable extends React.Component {
  render() {
    let helloRows = this.props.data.map((hello) => {
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
}

class HelloWorldComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleNewHello = this.handleNewHello.bind(this)
    this.updateHelloList = this.updateHelloList.bind(this)
    this.state = {
      helloList: []
    }
  }

  componentDidMount() {
    this.updateHelloList()
    setInterval(this.updateHelloList, 30000)
  }

  updateHelloList(helloList) {
    if (helloList) {
      this.setState({helloList: helloList})
    } else {
      this.props.store.getList(
        (listFromStore) => {
          this.setState({helloList: listFromStore})
        },
        (err) => {
          console.log('Error getting the hello list!')
        }
      )
    }
  }

  handleNewHello(newHello) {
    let oldHelloList = this.state.helloList.concat([])

    // Update immediately the UI list
    this.state.helloList.unshift(newHello)
    this.updateHelloList(this.state.helloList)

    // Try to save the new Hello in the server.
    // If OK, we update the hello list with data from the server, otherwise we bring back the old hello list.
    this.props.store.add(newHello,
      () => {
        this.updateHelloList()
      },
      (err) => {
        this.updateHelloList(oldHelloList)
        console.log('Error adding a new hello!')
      }
    )
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <LastHelloWorld hello={this.state.helloList[0]} />
          <NewHelloWorldForm onNewHello={this.handleNewHello} />
        </div>
        <div className="row marketing">
          {
            this.state.helloList.length > 0
                ? <HelloWorldTable data={this.state.helloList} />
                : <div className="text-center"><h3>There is no Hello yet!</h3></div>
          }
        </div>
      </div>
    )
  }
}

export default HelloWorldComponent
