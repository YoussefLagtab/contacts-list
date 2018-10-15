import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { REMOVE_CONTACT, CONTACTS_QUERY } from '../gql'

export default class DeleteContact extends Component {
	_deleteContact = removeContact => {
		let c = window.confirm('delete contact: ' + this.props.name)
		if (!c) return
		removeContact({ variables: { id: this.props.id } })
	}
	render() {
		return (
			<Mutation
				mutation={REMOVE_CONTACT}
				update={(cache, { data: { removeContact } }) => {
					let { contacts } = cache.readQuery({ query: CONTACTS_QUERY })
					cache.writeQuery({
						query: CONTACTS_QUERY,
						data: { contacts: contacts.filter(c => c.id !== removeContact) }
					})
				}}
			>
				{(removeContact, { data }) => (
					<IconButton
						color="secondary"
						aria-label="edit"
						onClick={() => this._deleteContact(removeContact)}
					>
						<DeleteIcon />
					</IconButton>
				)}
			</Mutation>
		)
	}
}
