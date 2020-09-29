import React from "react";

import Message from "./message"



// var this.props.socket=socketIOClient(ENDPOINT);

class Messagebox extends React.Component{

  
  state={
    message:"",
    msg:[],
    authenticated:0,
  }
  componentDidMount(){
    
     this.props.socket.on("chat message",(data)=>{ //formatte author:"",message:""
        var a=this.state.msg;;
        a.unshift(data);
        if(a.length>12){
          a.pop();
        }
        this.setState({msg:a});
    })
    
    this.props.socket.on("reauthenticate",()=>{
      if(this.state.authenticated)
      this.sendsecret();
    })
    this.props.socket.on("userslist",(data)=>{
      this.setState({users:data});
    })
    
  }
  handelchange=(e)=>{
    this.setState({[e.target.name]:e.target.value});
    
  }

  sendmessage=()=>{
    // const this.props.socket=socketIOClient(ENDPOINT);
    this.props.socket.emit("chat message",{author:this.state.name,message:this.state.message});
    //formatte author:"",message:""
    this.setState({message:""});
  }

  sendsecret=()=>{
    this.props.socket.emit("login",{name:this.state.name,secret:this.state.secret});
    this.props.setuser({name:this.state.name,secret:this.state.secret});
    this.setState({authenticated:true});
  }
  
  

  render(){
    return (
      <div style={{minHeight:"800px",maxWidth:"80%"}}>
        <div className="jumbotron">
          <h1 className="display-4">Chat Box</h1></div>
          <div className="container">
          <div className="form-group" style={{display:"inline-flex",justifyContent:"stretch",minWidth:"80%"}}>
            <input type="text" 
                  className="form-control" 
                  name="name" 
                  disabled={this.state.authenticated}
                  value={this.state.name}
                  placeholder="name"
                  onChange={this.handelchange}/>

              <input type="text" 
              className="form-control" 
              name="secret" 
              value={this.state.secret}
              placeholder="your secret"
              disabled={this.state.authenticated}
              onChange={this.handelchange}/>

               <button type="button"
                className="btn btn-dark" 
                disabled={this.state.authenticated}
                onClick={()=>this.sendsecret()}
               >Set</button> 

               </div>    


              <div className="form-group" style={{display:"inline-flex",justifyContent:"stretch",minWidth:"80%"}}>
              <input type="text" 
                className="form-control" 
                name="message" 
                value={this.state.message}
                placeholder="Enter message"
                onChange={this.handelchange}/>
              <button type="button"
                className="btn btn-dark" 
                onClick={()=>this.sendmessage()}
               >Send</button>
              </div>
              <div style={{maxWidth:"80%",margin:"0 auto" }}>
              {this.state.msg.map(ms1=>{
                return <Message content={ms1.message} author={ms1.author} me={this.state.name} />;
              })}
              </div>
            
          </div>
      </div>
    )
  }



}

export default Messagebox;