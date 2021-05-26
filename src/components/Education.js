import React, {useState} from "react";
import {Draggable} from "react-beautiful-dnd";
import "../styles/CV.css";

const Education = props => { 

    const [showItems, setShowItems] = useState(true); 

    const toggleShowItems = () => {
        let newValue = !showItems; 
        setShowItems(newValue);
    }
   
    return(
        <Draggable draggableId = "education" index = {props.index}>
            {provided => (
                <div 
                    ref = {provided.innerRef} 
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    className = "educationList draggable-div"
                >
                     
                    <div 
                        style = {{display: 'flex'}}
                    >
                        <h3>Education</h3>
                        <button onClick = {props.toggleForm}>
                            <img src = 'imgs/editInfo.svg' alt = 'Edit education info' />
                        </button>
                        
                        <button onClick = {props.showStyleSelector}>
                            <img src = 'imgs/editStyle.svg' alt = 'Edit styling' />
                        </button>
 
                        <button onClick = {() => {toggleShowItems()}}>
                            { showItems ? 
                                <img src = 'imgs/expandLess.svg' alt = 'Hide education header' />
                                :
                                <img src = 'imgs/expandMore.svg' alt = 'Show education header' />
                            }
                        </button>
                    </div>
                
                    { showItems ?
                        props.items.length > 0 ?
                            <ul>
                                {props.items.map(item => {
                                    return (
                                        <>
                                        <li key = {item.id}> {item.level} in {item.course} at {item.institution}, from {item.startDate} until {item.endDate} </li>
                                        
                                        <button onClick = {() => {props.deleteState("education", item.id)}}>
                                            <img src = 'imgs/close.svg' alt = 'Show education header' />
                                        </button>
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

export default Education;