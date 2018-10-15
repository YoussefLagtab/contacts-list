import gql from 'graphql-tag'

const CONTACTS_QUERY = gql`
	{
		contacts {
			id
			firstname
			lastname
			phone
			createdAt
			lastModified
		}
	}
`
const CREATE_CONTACT = gql`
	mutation CreateContact($firstname: String!, $lastname: String!, $phone: String!) {
		createContact(firstname: $firstname, lastname: $lastname, phone: $phone) {
			id
			firstname
			lastname
			phone
			createdAt
			lastModified
		}
	}
`
const UPDATE_CONTACT = gql`
	mutation UpdateContact($id: ID!, $firstname: String!, $lastname: String!, $phone: String!) {
		updateContact(id: $id, firstname: $firstname, lastname: $lastname, phone: $phone) {
			id
			firstname
			lastname
			phone
			createdAt
			lastModified
		}
	}
`
const REMOVE_CONTACT = gql`
	mutation RemoveContact($id: ID!) {
		removeContact(id: $id)
	}
`

export { CONTACTS_QUERY, CREATE_CONTACT, UPDATE_CONTACT, REMOVE_CONTACT }
