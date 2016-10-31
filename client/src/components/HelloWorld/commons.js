import { PropTypes } from 'react'

export default {
  helloShape: {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  },
}
