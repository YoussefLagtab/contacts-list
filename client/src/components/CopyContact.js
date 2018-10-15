import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CopyIcon from '@material-ui/icons/FileCopy'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default class CopyContact extends Component {
	render() {
		let { firstname, lastname, phone } = this.props.contact
		return (
			<CopyToClipboard
				text={`${firstname} ${lastname}: ${phone}`}
				onCopy={() => {
					alert('contact copied!')
				}}
			>
				<IconButton aria-label="edit" onClick={this._copyContact}>
					<CopyIcon />
				</IconButton>
			</CopyToClipboard>
		)
	}
}
