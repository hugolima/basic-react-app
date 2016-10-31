import React, { PropTypes } from 'react'
import helloConfig from 'server/config'

class NewHelloWorldForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNewHelloSubmit = this.handleNewHelloSubmit.bind(this)

    this.state = { validationError: {}, newName: '' }
  }

  componentDidMount() {
    this.helloNameInput.focus()
  }

  getErrorMessage(id) {
    return this.state.validationError[id].message
  }

  hasError(id) {
    return !!this.state.validationError[id]
  }

  handleNameChange(e) {
    this.setState({ validationError: {}, newName: e.target.value })
  }

  handleNewHelloSubmit(e) {
    e.preventDefault();
    const newName = this.state.newName.trim()

    this.setState({ validationError: {}, newName: '' })
    this.helloNameInput.focus()
    this.props.handleNewHello({
      id: 0,
      id_temp: new Date().getTime(),
      name: newName,
      date: `${new Date()}`,
    }, (validationError) => {
      this.setState({ validationError, newName })
    })
  }

  render() {
    return (
      <form className="helloworld__new-form" onSubmit={this.handleNewHelloSubmit}>
        <div className={`form-group text-left ${this.hasError('element_hello_name') ? ' has-error' : ''}`}>
          <input
            id="helloName"
            type="text"
            className="form-control input-lg"
            maxLength={helloConfig.maxLengthName}
            ref={(i) => { this.helloNameInput = i }}
            value={this.state.newName}
            onChange={this.handleNameChange}
            placeholder="Be the last one, type your name..."
          />
          {
            this.hasError('element_hello_name') &&
              <label htmlFor="helloName" className="control-label helloworld__new-form--error-msg">
                {this.getErrorMessage('element_hello_name')}
              </label>
          }
        </div>
        <p className="text-left">
          <button type="submit" className="btn btn-success">Say Hello</button>
        </p>
      </form>
    )
  }
}

NewHelloWorldForm.propTypes = {
  handleNewHello: PropTypes.func.isRequired,
}

export default NewHelloWorldForm
