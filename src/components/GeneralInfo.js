import React from "react";

export default class GeneralInfo extends React.Component{
    render(){ 
        return(
            <div> 
                <h2>
                    {this.props.firstName} {this.props.secondName} 
                    <button onClick = { () => {document.getElementById("editGenInfoForm").hidden = false} }> Edit </button>
                </h2>

                <p> Date of birth: {this.props.dateBirth} </p>

                <p> Email:  {this.props.email} </p>

                <p> Phone: {this.props.phone} </p>
            </div>
        )
    }
}