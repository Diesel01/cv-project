import React from 'react';
import {Droppable} from 'react-beautiful-dnd'; 
import GeneralInfo from './GeneralInfo'; 
import Education from "./Education"; 
import JobExp from './JobExp'; 

const DragnDrop = props => {

    const {generalInfo, education, jobExp, componentOrder} = props; 

    return (
        <div>
            <Droppable droppableId = 'editDiv'>

                {provided => (
                    <div ref = {provided.innerRef} {...provided.droppableProps}>

                        {componentOrder.map( (component, index) => {
                            if (component === 'generalInfo'){  
                                return <GeneralInfo {...generalInfo} index = {index} /> 
                            }

                            if (component === 'education' && education.items.length > 0){
                                return <Education {...education} index = {index} /> 
                            }

                            if (component === 'jobExp' && jobExp.items.length > 0){ 
                                return <JobExp {...jobExp} index = {index} /> 
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