import React from 'react';
import LandingPage from './LandingPage.jsx';
import ChatPage from './ChatPage.jsx';
export default class Main extends React.PureComponent{
	state = {
			started : false,
		}
	render() {
		if(!this.state.started){
			return <LandingPage handleClick = {() => {
				this.setState({started : true});
			}} />;
		}
		return <ChatPage />
		 
	}
}