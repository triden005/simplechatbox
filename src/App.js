import React from "react";
import socketIOClient from "socket.io-client"; 

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';

import Appnavbar from "./components/appnavbar";
import Messagebox from "./components/messagebox";
import Gamescreen from "./components/gamescreen";

const ENDPOINT = "http://localhost:4001";

var socket=socketIOClient(ENDPOINT);

export default class App extends React.Component{

	state={
		user:null,
	}
	setuser=(data)=>{
		this.setState({user:data});
	}
	render(){
		return (
			<div className="App">
				<Appnavbar />
				<div style={{justifyContent:"space-between" ,display:"flex"}}>
					<div
						style={{
						width: "58%",
					
						// border: "1px solid red",
						display: "inline-block"
						}}
						>
						<Messagebox  socket={socket} setuser={this.setuser}/>
					</div>
					<div
						style={{
						width: "40%",
		
						// border: "1px solid blue",
						display: "inline-block"
						}}
						>
						<Gamescreen socket={socket}  user={this.state.user}/>
					</div>
				</div>
			</div>
		);
	}
}
