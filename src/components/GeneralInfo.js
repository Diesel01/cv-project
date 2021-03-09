import React from "react";

export default class GeneralInfo extends React.Component{
    render(){ 
        const {firstName, secondName, dateBirth, email, phone, deleteState} = this.props
        return(
            <div> 
                <h2>
                    {firstName} {secondName} 
                    <button onClick = {() => {deleteState("generalInfo", "firstName")}}>x</button>                    
                </h2>

                <p> Date of birth: {dateBirth} <button onClick = {() => {deleteState("generalInfo", "dateBirth")}}>x</button> </p>

                <p> Email:  {email} <button onClick = {() => {deleteState("generalInfo", "email")}}>x</button> </p>

                <p> Phone: {phone} <button onClick = {() => {deleteState("generalInfo", "phone")}}>x</button></p>

                <button onClick = { () => {document.getElementById("editGenInfoForm").hidden = false} }> Edit </button>
            </div>

        )
    }
}