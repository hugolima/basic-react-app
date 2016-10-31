import React, { PropTypes } from 'react'
import { helloShape } from './commons'

function LastHelloWorld({ hello }) {
  return (
    <div className="helloworld__last">
      <h1 className="text-left">Last Hello</h1>
      <p className="text-left">Name: <strong>{ hello ? hello.name : 'Nobody yet' }</strong></p>
      <p className="text-left">Local Date: <strong>{ hello ? hello.date : 'No local date' }</strong></p>
    </div>
  )
}

LastHelloWorld.propTypes = {
  hello: PropTypes.shape(helloShape),
}

export default LastHelloWorld
