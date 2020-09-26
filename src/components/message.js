import React from "react";


var s1={textAlign:"right" ,borderRadius:"5px" ,background:"#84d6f4",marginBottom:"3px",marginTop:"3px",paddingLeft:"10px",paddingRight:"10px"};
export default function Message(props){
    
    if(props.author===props.me){
        
        return(
            <div style={s1}>
                {props.content+"  "}
            </div>
        )
    }
    
    else{
        var s2={...s1,textAlign:"left",background:"#91d569"}
        return (<div style={s2}>
            <span style={{fontSize:"small"}}>{props.author}</span>
            <br/>
            <span fontSize="large" paddingRight="10px" >{props.content}</span>
        </div>
        )

    }
    
}