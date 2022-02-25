import React from 'react';
import {Droppable} from 'react-beautiful-dnd'; 
import GeneralInfo from './GeneralInfo'; 
import Education from "./Education"; 
import JobExp from './JobExp'; 

const DragnDrop = props => {

    const {generalInfo, education, jobExp, componentOrder, toggleForm, showStyleSelector, deleteGeneralInfo, deleteState} = props; 

    return (
        <div>
            <Droppable droppableId = 'editDiv'>

                {provided => (
                    <div ref = {provided.innerRef} {...provided.droppableProps}>

                        {componentOrder.map( (component, index) => {
                            
                            if (component === 'generalInfo'){  
                                return ( 
                                    <GeneralInfo {...generalInfo} 
                                        toggleForm = {toggleForm}
                                        showStyleSelector = {showStyleSelector} 
                                        deleteGeneralInfo = {deleteGeneralInfo} 
                                        index = {index} 
                                    />
                                )
                            }

                            if (component === 'education'){
                                return(
                                    <Education {...education} 
                                        toggleForm = {toggleForm}
                                        showStyleSelector = {showStyleSelector} 
                                        deleteState = {deleteState} 
                                        index = {index} 
                                    /> 
                                )
                            }

                            if (component === 'jobExp'){ 
                                return(
                                    <JobExp {...jobExp}
                                        toggleForm = {toggleForm}
                                        showStyleSelector = {showStyleSelector}
                                        deleteState = {deleteState} 
                                        index = {index} 
                                    />
                                ) 
                            }
                        })}
                        
                        {provided.placeholder}
                    </div>
                )}

            </Droppable>
        </div> 
    )
}

export default DragnDrop