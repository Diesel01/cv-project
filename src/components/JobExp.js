import React, {useState} from "react";
import { Draggable } from "react-beautiful-dnd";

const JobExp = props => {
    const [showItems, setShowItems] = useState(true); 

    const toggleShowItems = () => {
        let newValue = !showItems; 
        setShowItems(newValue);
    } 

    return (
        <Draggable draggableId = "jobExp" index = {props.index}>
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
                        <button onClick = {props.toggleForm}>Edit professional info</button>
                        <button onClick = {props.showStyleSelector}>Edit styling</button>
                        <button onClick = {() => {toggleShowItems()}}>
                            { showItems ? 
                                <img src = 'imgs/expandLess.svg' alt = 'Hide professional experience header' />
                                :
                                <img src = 'imgs/expandMore.svg' alt = 'Show professional experience header' />   
                            }
                        </button>
                    </div>
                    
                    { showItems ?
                        props.items.length > 0 ?
                            <ul>
                                {props.items.map( item => {
                                    return( 
                                        <>
                                        <li key = {item.id}>
                                            {item.positionTitle} in {item.company}, from {item.startDate} until {item.endDate}, responsible for {item.responsibleFor}
                                        </li>
                                        <button onClick = {()=>{props.deleteState('jobExp', item.id)}}>x</button>
                                        </>
                                    )
                                })}
                            </ul>
                            :
                            null
                        :
                        null
                    }   
                </div>
            )}
        </Draggable>
    )
}

export default JobExp;