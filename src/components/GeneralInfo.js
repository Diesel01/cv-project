import React from "react";

export default class GeneralInfo extends React.Component{
    render(){ 
        const {firstName, secondName, dateBirth, email, phone} = this.props
        return(
            <div> 
                <h2>
                    {firstName} {secondName} 
                    <button onClick = { () => {document.getElementById("editGenInfoForm").hidden = false} }> Edit </button>
                </h2>

                <p> Date of birth: {dateBirth} </p>

                <p> Email:  {email} </p>

                <p> Phone: {phone} </p>
            </div>
        )
    }
}