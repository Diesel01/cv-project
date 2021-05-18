import React from "react";
import {Draggable} from "react-beautiful-dnd";
export default class Education extends React.Component{ 
    render(){  
        return(
            <Draggable draggableId = "education" index = {this.props.index}>
                {provided => (
                    <div 
                        ref = {provided.innerRef} 
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className = "educationList"
                    >
                        <div 
                            style = {{display: 'flex'}}
                        >
                            <h3>Education</h3>
                            <button onClick = {this.props.toggleForm}>Edit education info</button>
                            <button onClick = {this.props.showStyleSelector}>Edit styling</button>
                        </div>

                        <ul>
                            {this.props.items.map(item => {
                                return (
                                    <>
                                    <li key = {item.id}> {item.level} in {item.course} at {item.institution}, from {item.startDate} until {item.endDate} </li>
                                    <button onClick = {() => {this.props.deleteState("education", item.id)}}>x</button>
                                    </>                              
                                )
                            })}
                        </ul>
                    </div>
                )}
            </Draggable>
        )
    }
}