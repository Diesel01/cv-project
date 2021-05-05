import React from "react";
import Draggable from "react-draggable";

export default class GeneralInfo extends React.Component{
    render(){ 
        const {fullName, dateBirth, email, phone, deleteGeneralInfo, onStopHandle} = this.props
        return(
            <Draggable 
                onStop = { () => {onStopHandle(0, 'GeneralInfo')} }
                bounds = "parent"
            >
                <div style = { {width: '50%'} }> 
                    <h2 className = "fullName" id = "fullName">
                        {fullName} 
                    </h2>
                    <button onClick = {() => {deleteGeneralInfo("fullName")}}>x</button>                    

                    <p> Date of birth: {dateBirth} <button onClick = {() => {deleteGeneralInfo("dateBirth")}}>x</button> </p>

                    <p> Email:  {email} <button onClick = {() => {deleteGeneralInfo("email")}}>x</button> </p>

                    <p> Phone: {phone} <button onClick = {() => {deleteGeneralInfo("phone")}}>x</button></p>

                </div>
            </Draggable>
        )
    }
}