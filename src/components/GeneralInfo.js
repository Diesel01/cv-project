import React from "react";

export class GeneralInfo extends React.Component{
    render(){ 
        return(
            <div> 
                <h2>{this.props.firstName} {this.props.secondName}</h2>

                <p> { this.props.dateBirth } </p>

                <p> {this.props.email} </p>

                <p> {this.props.phone} </p>
            </div>
        )
    }
}