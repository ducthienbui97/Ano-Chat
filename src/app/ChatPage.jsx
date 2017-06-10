import React from 'react';
import FireBase from './FireBase.jsx';
import LandingPage from './LandingPage.jsx';
import Peer from './Peer.jsx';
import ChatForm from './ChatForm.jsx';
import {Div,H1,P,RightBubble,LeftBubble} from './Style.jsx';

export default class ChatPage extends React.PureComponent{
	state = {
			peer: Peer.connect(),
			my_id: '',
			peer_id: '',
			initialized: false,
			connected: false,
			chatMsgs:   []
		}
	
	componentWillMount(){
		this.state.peer.on('open', (id) => {
    		console.log('My peer ID is: ' + id);
    		this.setState({
        		my_id: id,
        		initialized: true
        		},() =>{
        			FireBase.getLastUser().then((id) => {
        				if(id != '' && id != this.state.my_id)
        					this.setState({peer_id:id},()=>{
        						this.connect(this.state.peer_id);
        						FireBase.setLastUser('');
        					});
        				else
        					FireBase.setLastUser(this.state.my_id);
        				})
        			});
			});
		this.state.peer.on('connection', (connection) => {
    		console.log('someone connected');
    		console.log(connection); 
    		this.setState({
        		conn: connection
    			}, () => {
	        		this.state.conn.on('open', () => {
	            		this.setState({
    	            		connected: true
        	    		});
	        		});
	        		console.log(this.state);
		        	this.state.conn.on('data', (data) => this.addMessage(data,1));
				});
			});
		}
	
	componentWillUnmount(){
		this.state.peer.destroy();
		}
	
	connect(peer_id){
		let connection = this.state.peer.connect(peer_id);
		this.setState({
			conn: connection
			},() => {
				console.log(connection);
				this.state.conn.on('open',() =>{
					this.setState({
                	connected: true
        	    	});
				});
				this.state.conn.on('data', (data) => this.addMessage(data,1));
			});
		}
	
	sendMessage(data){
		console.log(data);
		this.state.conn.send(data);
		this.addMessage(data,0);
	}

	displayMessage(message,index){
		if(message.type)
			return <LeftBubble key = {index}>{message.text}</LeftBubble>;
		else
			return <RightBubble key = {index}>{message.text}</RightBubble>;
		}
	addMessage(message,type){
		this.setState((state)=> ({chatMsgs:state.chatMsgs.concat({
			text:message,
			type: type
				})
			}));
		}

	render() {
		if(this.state.connected){
			let messages = this.state.chatMsgs.map((mess,idx) =>this.displayMessage(mess,idx))
			return (
					<div>
						<Div>
							{messages}
						</Div>
						<br/>
						<ChatForm handleClick = {(mess) => this.sendMessage(mess)}/>
					</div>
				);
			}
		else if(this.state.initialized){
			return <Div><H1>Waiting for someone to connect</H1></Div>;
			}
		else
			return <Div><H1>Loading</H1></Div>; 
		}
	}