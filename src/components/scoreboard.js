import React from "react";
import {Fragment} from "react"

export default function Score(params){

    return(
        <Fragment>
            <tr>
                {/* <th scope="row">{params.data.no}</th> */}
                <td>{params.data.name}</td>
                <td>{params.data.score}</td>
            </tr>
        </Fragment>
    )
}