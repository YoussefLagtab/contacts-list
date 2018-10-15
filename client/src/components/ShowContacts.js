import React, { Component } from 'react'
import { Query } from 'react-apollo'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'

import EditContact from './EditContact'
import DeleteContact from './DeleteContact'
import CopyContact from './CopyContact'

import { CONTACTS_QUERY } from '../gql'

class App extends Component {
	render() {
		return (
			<Query query={CONTACTS_QUERY}>
				{({ loading, error, data }) =>
					error ? (
						<p>Error!</p>
					) : loading ? (
						<CircularProgress size={50} />
					) : (
						<List>
							{!data.contacts ? (
								<p style={{ color: 'red' }}>no contacts!</p>
							) : (
								<>
									{data.contacts.map((c, i, arr) => (
										<div key={i}>
											<ListItem>
												<Avatar
													style={{ backgroundColor: '#269df3' }}
												>{`${c.firstname[0].toUpperCase()}${c.lastname[0].toUpperCase()}`}</Avatar>
												<ListItemText
													primary={`${c.firstname} ${c.lastname}`}
													secondary={c.phone}
												/>
												<ListItemSecondaryAction>
													<CopyContact contact={c} />

													<EditContact contact={c} />

													<DeleteContact id={c.id} name={`${c.firstname} ${c.lastname}`} />
												</ListItemSecondaryAction>
											</ListItem>
											{i !== arr.length - 1 && <Divider />}
										</div>
									))}
								</>
							)}
						</List>
					)
				}
			</Query>
		)
	}
}

export default App
