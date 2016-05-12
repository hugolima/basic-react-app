import React from 'react'
import {render} from 'react-dom'
import HelloWorldComponent from 'components/helloworld.js'
import imgGitLogo from './images/GitHub_Logo.png'
import 'stylesheets/base.scss'
import 'jquery'
import 'bootstrap-sass/assets/javascripts/bootstrap'

class HelloStore {
  constructor(uriApi) {
    this.uriApi = uriApi
  }

  getList(success, error) {
    $.ajax({
      url: this.uriApi,
      dataType: 'json',
      cache: false,
      success: (helloList) => {
        success(helloList)
      },
      error: (xhr, status, err) => {
        console.log('Error: ' + xhr + ' - ' + status + ' - ' + err)
        error(err)
      }
    })
  }

  add(hello, success, error) {
    $.ajax({
      url: this.uriApi,
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify(hello),
      success: (newlyHello) => {
        success(newlyHello)
      },
      error: (xhr, status, err) => {
        console.log('Error: ' + xhr + ' - ' + status + ' - ' + err)
        error(err)
      }
    })
  }
}

class App extends React.Component {
  render () {
    let helloStore = new HelloStore('/api/hellos')

    return (
      <div className="container">
        <div className="header clearfix">
          <nav>
            <ul className="nav nav-pills pull-right">
              <li role="presentation" className="active"><a href="/">Home</a></li>
            </ul>
          </nav>
          <h3 className="text-muted">Hello World React</h3>
        </div>

        <HelloWorldComponent store={helloStore} />

        <footer className="footer">
          <p className="pull-left">Basic React Project</p>
          <a className="pull-right" href="https://github.com/hugolima/basic-react-app">
            <img className="index__img-logo-git" src={imgGitLogo} />
          </a>
        </footer>
      </div>
    )
  }
}

render(<App/>, document.getElementById('content'))
