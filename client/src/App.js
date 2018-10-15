import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'

import CreateContact from './components/CreateContact'
import ShowContacts from './components/ShowContacts'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Paper style={{ margin: '30px auto', width: 700, textAlign: 'center', padding: '20px' }}>
					<h1 style={{ color: '#757575' }}>Contacts list</h1>
					<CreateContact />
					<ShowContacts />
				</Paper>
			</div>
		)
	}
}

export default App
