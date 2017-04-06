import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './layout/Home'
import store from './store'
import { Provider } from 'react-redux'

class App extends Component {
	render() {
		return (
			<Provider store={store.configureStore()}>
				<div className="container">
					<Home />
				</div>
			</Provider>
		)
	}
} 

ReactDOM.render(<App />, document.getElementById('root'))