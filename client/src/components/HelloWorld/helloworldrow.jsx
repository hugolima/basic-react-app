import React, { PropTypes } from 'react'
import { helloShape } from './commons'

function HelloWorldRow({ hello }) {
  return (
    <tr>
      <td>{hello.id || ''}</td>
      <td>{hello.name}</td>
      <td>{hello.date}</td>
    </tr>
  )
}

HelloWorldRow.propTypes = {
  hello: PropTypes.shape(helloShape).isRequired,
}

export default HelloWorldRow
