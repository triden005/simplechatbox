import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';
import Appnavbar from "./components/appnavbar";
import Messagebox from "./components/messagebox";
import Gamescreen from "./components/gamescreen";


export default function App() {
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
					<Messagebox />
				</div>
				<div
					style={{
					width: "40%",
	
					// border: "1px solid blue",
					display: "inline-block"
					}}
					>
					<Gamescreen />
				</div>
			</div>
		</div>
	);
}
