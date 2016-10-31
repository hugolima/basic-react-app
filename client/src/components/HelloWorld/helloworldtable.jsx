import React, { PropTypes } from 'react'
import HelloWorldRow from './helloworldrow'
import { helloShape } from './commons'

function HelloWorldTable({ helloList }) {
  const helloRows = helloList.map((hello) => {
    const rowId = hello.id || hello.id_temp
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
  helloList: PropTypes.arrayOf(PropTypes.shape(helloShape)).isRequired,
}

export default HelloWorldTable
