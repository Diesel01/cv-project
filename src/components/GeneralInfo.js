import React from "react";
import {Draggable} from "react-beautiful-dnd";

export default class GeneralInfo extends React.Component{
    render(){ 
        const {fullName, dateBirth, email, phone, deleteGeneralInfo, index, showStyleSelector, toggleForm} = this.props
        return(
            <Draggable draggableId = "generalInfo" index = {index}>
                {provided => (
                    <div 
                        ref = {provided.innerRef} 
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className = "generalInfo"
                    > 
                        <div 
                            style = {{display: "flex"}}
                        >
                            <h2> {fullName} </h2>
                            <button onClick = {toggleForm}>Edit general info</button>
                            <button onClick = {showStyleSelector}>Edit styling</button>
                        </div>
                            

                        <button onClick = {() => {deleteGeneralInfo("fullName")}}>x</button>                    

                        <p> Date of birth: {dateBirth} <button onClick = {() => {deleteGeneralInfo("dateBirth")}}>x</button> </p>

                        <p> Email:  {email} <button onClick = {() => {deleteGeneralInfo("email")}}>x</button> </p>

                        <p> Phone: {phone} <button onClick = {() => {deleteGeneralInfo("phone")}}>x</button></p>

                    </div>
                )}
            </Draggable>
        )
    }
}