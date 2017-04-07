import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import { Home } from './layout'

const App = () => {
  return (
    <Provider store={store.configureStore()}>
      <div className="container">
        <Home />
      </div>
    </Provider>
  )
} 

ReactDOM.render(<App />, document.getElementById('root'))
