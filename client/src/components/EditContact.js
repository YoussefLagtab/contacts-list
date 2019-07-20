import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'

import { UPDATE_CONTACT, CONTACTS_QUERY } from '../gql'

export default class EditContact extends Component {
	state = {
		editing: false,
		firstname: '',
		lastname: '',
		phone: ''
	}
	componentWillMount() {
		let { firstname, lastname, phone } = this.props.contact
		this.setState({ firstname, lastname, phone })
	}
	sumbit = (e, updateContact) => {
		if (e.key === 'Enter') this._updateContact(updateContact)
	}
	_updateContact = updateContact => {
		let { firstname, lastname, phone } = this.state
		let { id } = this.props.contact
		if (!firstname || !lastname || !phone) return
		updateContact({
			variables: {
				id,
				firstname,
				lastname,
				phone
			}
		})
		this.setState({ editing: false })
	}
	handleOpen = () => {
		this.setState({ editing: true })
	}
	handleClose = () => {
		let { firstname, lastname, phone } = this.props.contact
		this.setState({ editing: false, firstname, lastname, phone })
	}
	render() {
		let { firstname, lastname, phone } = this.state
		return (
			<Mutation
				mutation={UPDATE_CONTACT}
				update={(cache, { data: { updateContact } }) => {
					let { contacts } = cache.readQuery({ query: CONTACTS_QUERY })
					cache.writeQuery({
						query: CONTACTS_QUERY,
						data: {
							contacts: contacts.map(c => (c.id === updateContact.id ? updateContact : c))
						}
					})
				}}
			>
				{updateContact => (
					<>
						<IconButton aria-label="edit" onClick={this.handleOpen}>
							<EditIcon />
						</IconButton>

						<Dialog
							open={this.state.editing}
							onClose={this.handleClose}
							aria-labelledby="form-dialog-title"
						>
							<DialogTitle id="form-dialog-title">Edit</DialogTitle>
							<DialogContent>
								<form onKeyPress={e => {this.sumbit(e, updateContact)}} noValidate autoComplete="off">
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
							</DialogContent>
							<DialogActions>
								<Button onClick={this.handleClose} color="secondary">
									Cancel
								</Button>
								<Button
									onClick={() => {
										this._updateContact(updateContact)
									}}
									color="primary"
								>
									Save
								</Button>
							</DialogActions>
						</Dialog>
					</>
				)}
			</Mutation>
		)
	}
}
