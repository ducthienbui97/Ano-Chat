import React from 'react';
import Button from '@atlaskit/button';
import TextArea from '@atlaskit/text-area';
import {Div,H1,P} from './Style.jsx';


export default class ChatForm extends React.PureComponent{
	state = {
		chatText: ''
	}
	render(){
		return (
			<Div>
				<form onSubmit= {(e) => {
					e.preventDefault();
					this.props.handleClick(this.state.chatText);
					this.setState({chatText: ''});
					this.textArea.setState({value: ''});
				}}>
					<TextArea
						cols = {100}
						value = {this.state.chatText}
						onChange = {(e) => this.setState({chatText : e.target.value})}
						ref = {(text) => {this.textArea = text}} isLabelHidden/>
					<br/>
					<Button type='submit'>
						Send
					</Button>
				</form>
			</Div>
			);
	}
}