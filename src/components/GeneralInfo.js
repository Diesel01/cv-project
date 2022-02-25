import React from "react";
import {Draggable} from "react-beautiful-dnd";
import "../styles/CV.css";

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
                        className = "generalInfo draggable-div"
                    > 
                        <div className = "item-div item-header">
                            <h2> {fullName} </h2>

                            <div class = 'btns-div-itemHeader'>
                                <button onClick = {() => {deleteGeneralInfo("fullName")}} className = "button">
                                    <img src = 'imgs/close.svg' alt = 'Delete' />
                                </button>

                                <button onClick = {() => {toggleForm("generalInfo")}} className = "button">
                                    <img src = 'imgs/editInfo.svg' alt = 'Edit general info' />
                                </button>

                                <button onClick = {() => {showStyleSelector("generalInfo")}} className = "button">
                                    <img src = 'imgs/editStyle.svg' alt = 'Edit styling' />
                                </button>

                                <span class = "dragMe">
                                    <p>Drag me!</p>
                                </span>
                            </div>
                        </div>

                        <div className = "item-div">
                            <p> Date of birth: {dateBirth}</p>
                            <button onClick = {() => {deleteGeneralInfo("dateBirth")}} className = "button item-button">
                                <img src = 'imgs/close.svg' alt = 'Delete' />
                            </button>
                        </div> 
                        
                        <div className = "item-div">
                            <p> Email: {email}</p>
                            <button onClick = {() => {deleteGeneralInfo("email")}} className = "button item-button">
                                <img src = 'imgs/close.svg' alt = 'Delete' />
                            </button>
                        </div> 
                        
                        <div className = "item-div">
                            <p> Phone: {phone}</p>
                            <button onClick = {() => {deleteGeneralInfo("phone")}} className = "button item-button">
                                <img src = 'imgs/close.svg' alt = 'Delete' />
                            </button>
                        </div> 

                    </div>
                )}
            </Draggable>
        )
    }
}