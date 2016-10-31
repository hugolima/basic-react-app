import React from 'react'
import HelloWorldContainer from './helloworld'
import imgGitLogo from '../images/GitHub_Logo.png'

function App() {
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

      <HelloWorldContainer />

      <footer className="footer">
        <p className="pull-left">Basic React Project</p>
        <a className="pull-right" href="https://github.com/hugolima/basic-react-app">
          <img className="index__img-logo-git" src={imgGitLogo} alt="GitHub Repository" />
        </a>
      </footer>
    </div>
  )
}

export default App
