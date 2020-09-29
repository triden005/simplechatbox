import React from "react";

import Score from "./scoreboard";


class Gamescreen extends React.Component{

  state={
    points:[{no:1,player:"satyam",point:100},{no:2,player:"utkarsh",point:"200"}],
    me:null,
    users:[]
  }
  componentDidMount(){

    this.props.socket.on("updatedscore",(data)=>{
      this.setState({points:data});
    })
    
    this.props.socket.on("resetrank",()=>{
      this.setState({me:null});
    })
    this.props.socket.on("userslist",(data)=>{
      this.setState({users:data});
    })




  }
  start=()=>{
    this.props.socket.emit("start");
  }

  divs=(number)=>{
    console.log(number);
    if(this.state.me===null){
      this.props.socket.emit("getrank",this.props.user);
      this.props.socket.on(`rank${this.props.user.name}${this.props.user.secret}`,(rank)=>{
        console.log(rank)
        if(rank===1){
          this.props.socket.emit("chat message",{author:this.props.user.name,message:"I am the lukky King"});
        }
        else if(rank===2){
          this.props.socket.emit("chat message",{author:this.props.user.name,message:"I am going to find the thief"});
        }
        this.setState({me:rank});
      })
    }
    else{
      var a=this.props.user;
      a={...a,find:number};
      this.props.socket.emit("decision",(a));
    }
  }

  render(){
    var b="";
    if(this.state.me){
      if(this.state.me===1){
        b="You Are The King"
      }
      else if(this.state.me===2){
        b="You are the Sipahi"
      }
      else if(this.state.me===4){
        b="you are the thief"
      }
      else if(this.state.me===3){
        b="you are the undercover Minister"
      }
    }
    var x=null;
    if(this.state.me===null || this.state.me===1){
      x=(  <button type="button"
              className="btn btn-dark" 
              onClick={()=>this.start()}
            >Restart</button>)
    }
    return (
      <div style ={{minHeight:"800px",minWidth:"80%" }}>
        <div>{b}</div>
        
          <div display="inline-block " style={{justifyContent:"space-evenly",margin:"20px 0px 5px 0px"}}>
            <div style={{...square,background:"#f44336",marginRight:"10px"} } onClick={()=>this.divs(1)}>{this.state.users[0]? this.state.users[0]:"Player1"}</div>
            <div style={{...square,background:"#2196F3"}} onClick={()=>this.divs(2)}>{this.state.users[1]? this.state.users[1]:"Player2"}</div>
          </div>
          <div display="inline-block">
            <div style={{...square,background:"#ff9800",marginRight:"10px"}} onClick={()=>this.divs(3)}>{this.state.users[2]? this.state.users[2]:"Player3"}</div>
            <div style={{...square,background:"#4CAF50"}} onClick={()=>this.divs(4)}>{this.state.users[3]? this.state.users[3]:"Player4"}</div>
          </div>
          
          
          {/* <button type="button"
                className="btn btn-dark" 
                onClick={()=>this.start()}
               >start</button> */}
          
          <div style={{fontWeight:600}}>{x}</div>
          <div>
            score table
            <table className="table">
              <thead>
                <tr>
                  {/* <th scope="col">playerNo</th> */}
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