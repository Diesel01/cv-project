import React from 'react';
import {Droppable} from 'react-beautiful-dnd'; 
import GeneralInfo from './GeneralInfo'; 
import Education from "./Education"; 
import JobExp from './JobExp'; 

const DragnDrop = props => {

    const {generalInfo, education, jobExp, componentOrder, deleteGeneralInfo, deleteState} = props; 

    return (
        <div>
            <Droppable droppableId = 'editDiv'>

                {provided => (
                    <div ref = {provided.innerRef} {...provided.droppableProps}>

                        {componentOrder.map( (component, index) => {
                            // if (component === 'generalInfo'){  
                            //     return <GeneralInfo {...generalInfo} deleteGeneralInfo = {deleteGeneralInfo} index = {index} /> 
                            // }

                            // if (component === 'education' && education.items.length > 0){
                            //     return <Education {...education} deleteState = {deleteState} index = {index} /> 
                            // }

                            // if (component === 'jobExp' && jobExp.items.length > 0){ 
                            //     return <JobExp {...jobExp} deleteState = {deleteState} index = {index} /> 
                            // }

                            if (component === 'generalInfo'){  
                                return <GeneralInfo {...generalInfo} deleteGeneralInfo = {deleteGeneralInfo} index = {index} /> 
                            }

                            if (component === 'education'){
                                return <Education {...education} deleteState = {deleteState} index = {index} /> 
                            }

                            if (component === 'jobExp'){ 
                                return <JobExp {...jobExp} deleteState = {deleteState} index = {index} /> 
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