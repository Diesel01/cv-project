import React from "react"; 
// import {format} from "date-fns"; 

const GraduateForm = (props) => { 
    const { editEduGraduate } = props; 
    return(
        <div>
            <form hidden id = "editGraduateForm"> 
                <label htmlFor = "level" name = 'levelG'>Level: </label>
                <input type = 'text' id = "level" name = 'levelG' onChange = {editEduGraduate}/>

                <label htmlFor = "course" name = 'courseG'>Course: </label>
                <input type = 'text' id = "course" name = 'courseG' onChange = {editEduGraduate}/>

                <label htmlFor = "institution" name = 'institutionG'>Institution: </label>
                <input type = 'text' id = "institution" name = 'institutionG' onChange = {editEduGraduate} />
                
                <label htmlFor = "startDate" name = 'startDateG'>Start date: </label>
                <input type = 'month' id = 'startDate' name = 'startDateG' onChange = {editEduGraduate}/>

                <label htmlFor = "endDate" name = 'endDateG'>End date: </label>
                <input type = 'month' id = 'endDate' name = 'endDateG' onChange = {editEduGraduate}/>

                <button onClick = { 
                    (e) => { e.preventDefault();
                    let form = document.getElementById("editGraduateForm"); form.hidden = true; form.reset() } }> 
                    Close 
                </button>
            </form>
        </div>
    )
    
}

export default GraduateForm;