import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import TextField from '@material-ui/core/TextField'

import { CREATE_CONTACT, CONTACTS_QUERY } from '../gql'

export default class CreateContact extends Component {
	constructor() {
		super()
		this.state = {
			firstname: '',
			lastname: '',
			phone: ''
		}

		this.inputRef = React.createRef()
	}
	sumbit = async (e, createContact) => {
		let { firstname, lastname, phone } = this.state
		if (e.key !== 'Enter' || firstname === '' || lastname === '' || phone === '') return

		await createContact({
			variables: {
				firstname,
				lastname,
				phone
			}
		})
		this.inputRef.current.focus()
	}

	render() {
		let { firstname, lastname, phone } = this.state
		return (
			<Mutation
				mutation={CREATE_CONTACT}
				update={(cache, { data: { createContact } }) => {
					if (!createContact) return alert('phone number already exists!')
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
				{createContact => (
					<form onKeyPress={e => this.sumbit(e, createContact)} noValidate autoComplete="off">
						<TextField
							inputRef={this.inputRef}
							label="FirstName"
							value={firstname}
							onChange={e => this.setState({ firstname: e.target.value })}
							margin="normal"
							required
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
