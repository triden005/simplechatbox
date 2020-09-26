import React from "react";

import Score from "./scoreboard";

class Gamescreen extends React.Component{

  state={
    points:[{no:1,player:"satyam",point:100},{no:2,player:"utkarsh",point:"200"}]
  }

  render(){
    return (
      <div style ={{minHeight:"800px",minWidth:"80%" }}>
          <div display="inline-block " style={{justifyContent:"space-evenly",margin:"20px 0px 5px 0px"}}>
            <div style={{...square,background:"#f44336",marginRight:"10px"}}> player1</div>
            <div style={{...square,background:"#2196F3"}}>player2</div>
          </div>
          <div display="inline-block">
            <div style={{...square,background:"#ff9800",marginRight:"10px"}}>player3</div>
            <div style={{...square,background:"#4CAF50"}}>player4</div>
          </div>


          <div>
            score table
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">playerNo</th>
                  <th scope="col">Player</th>
                  <th scope="col">TotalPoints</th>
                </tr>
              </thead>
              <tbody>
                {this.state.points.map(data=>{
                  return <Score data={data} />
                })}
              </tbody>
            </table>
          </div>
      </div>
    )
  }



}
var square={
  height: "100px",
  width: "100px",
  backgroundColor: "#555",
  display:"inline-block"
}

export default Gamescreen;