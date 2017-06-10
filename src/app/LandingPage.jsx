import React from 'react';
import Button from '@atlaskit/button';
import {Div,H1,P} from './Style.jsx';

export default class LandingPage extends React.PureComponent{
	render(){
		return( 
			<Div>
			 	<H1> Welcome to Ano Chat </H1>
			 	<P>Ano Chat allows you to chat with a stranger without anonymously</P>
			 	<Div>
					<Button onClick = {this.props.handleClick}>
						Start a chat
					</Button>
				</Div>
			</Div>
		);
	}
}