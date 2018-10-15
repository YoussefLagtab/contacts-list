import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import TextField from '@material-ui/core/TextField'

import { CREATE_CONTACT, CONTACTS_QUERY } from '../gql'

export default class CreateContact extends Component {
	state = {
		firstname: '',
		lastname: '',
		phone: ''
	}
	sumbit = (e, createContact) => {
		let { firstname, lastname, phone } = this.state
		if (e.key !== 'Enter' || firstname === '' || lastname === '' || phone === '') return
		// console.log(firstname, lastname, phone)
		createContact({
			variables: {
				firstname,
				lastname,
				phone
			}
		})
	}
	render() {
		let { firstname, lastname, phone } = this.state
		return (
			<Mutation
				mutation={CREATE_CONTACT}
				update={(cache, { data: { createContact } }) => {
					let { contacts } = cache.readQuery({ query: CONTACTS_QUERY })
					if (!contacts) contacts = []

					cache.writeQuery({
						query: CONTACTS_QUERY,
						data: { contacts: contacts.concat([createContact]) }
					})
					this.setState({
						firstname: '',
						lastname: '',
						phone: ''
					})
				}}
			>
				{(createContact, { data }) => (
					<form onKeyPress={e => this.sumbit(e, createContact)} noValidate autoComplete="off">
						<TextField
							required
							label="FirstName"
							value={firstname}
							onChange={e => this.setState({ firstname: e.target.value })}
							margin="normal"
						/>
						<TextField
							required
							label="Lastname"
							value={lastname}
							onChange={e => this.setState({ lastname: e.target.value })}
							margin="normal"
						/>
						<TextField
							required
							label="Phone"
							value={phone}
							onChange={e => this.setState({ phone: e.target.value })}
							margin="normal"
						/>
					</form>
				)}
			</Mutation>
		)
	}
}
