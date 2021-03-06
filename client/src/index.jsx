/* global document */

import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import 'jquery'
import 'bootstrap-sass/assets/javascripts/bootstrap'
import configureStore from './store/configureStore'
import App from './containers/app'

import './stylesheets/base.scss'
import './stylesheets/modules/helloworld.scss'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)
