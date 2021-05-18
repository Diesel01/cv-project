import React from "react";
import { Draggable } from "react-beautiful-dnd";
export default class JobExp extends React.Component{ 

    render(){ 
        return (
            <Draggable draggableId = "jobExp" index = {this.props.index}>
                {provided => (
                    <div 
                        ref = {provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className = "jobExpList"
                    >
                         <div 
                            style = {{display: 'flex'}}
                        >
                            <h3>Professional Experience</h3>
                            <button onClick = {this.props.toggleForm}>Edit professional info</button>
                            <button onClick = {this.props.showStyleSelector}>Edit styling</button>
                        </div>

                        <ul>
                            {this.props.items.map( item => {
                                return( 
                                    <>
                                    <li key = {item.id}>
                                        {item.positionTitle} in {item.company}, from {item.startDate} until {item.endDate}, responsible for {item.responsibleFor}
                                    </li>
                                    <button onClick = {()=>{this.props.deleteState('jobExp', item.id)}}>x</button>
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