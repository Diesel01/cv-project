import React from "react";

export default class GeneralInfo extends React.Component{
    render(){ 
        const {firstName, secondName, dateBirth, email, phone, deleteGeneralInfo} = this.props
        return(
            <div> 
                <h2 id = "fullName">
                    {firstName} {secondName} 
                    <button onClick = {() => {deleteGeneralInfo("generalInfo", "firstName")}}>x</button>                    
                </h2>

                <p> Date of birth: {dateBirth} <button onClick = {() => {deleteGeneralInfo("dateBirth")}}>x</button> </p>

                <p> Email:  {email} <button onClick = {() => {deleteGeneralInfo("email")}}>x</button> </p>

                <p> Phone: {phone} <button onClick = {() => {deleteGeneralInfo("phone")}}>x</button></p>

            </div>

        )
    }
}