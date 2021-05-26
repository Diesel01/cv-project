import React, {useState} from "react";
import { Draggable } from "react-beautiful-dnd";
import "../styles/CV.css";

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
                    className = "jobExpList draggable-div"
                >

                    <div className = "item-div">
                        <h3>Professional Experience</h3>
                        <button onClick = {() => {props.toggleForm("jobExp")}} className = "button">
                            <img src = 'imgs/editInfo.svg' alt = 'Edit professional experience' />
                        </button>
                        
                        <button onClick = {() => {props.showStyleSelector("jobExp")}} className = "button">
                            <img src = 'imgs/editStyle.svg' alt = 'Edit styling' />
                        </button>

                        <button onClick = {() => {toggleShowItems()}} className = "button">
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
                                        <div className = "item-div">
                                            <li key = {item.id}>
                                                {item.positionTitle} in {item.company}, from {item.startDate} until {item.endDate}, responsible for {item.responsibleFor}
                                            </li>
                                            <button onClick = {()=>{props.deleteState('jobExp', item.id)}} className = "button">
                                                <img src = 'imgs/close.svg' alt = 'Delete' />
                                            </button>
                                        </div>
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