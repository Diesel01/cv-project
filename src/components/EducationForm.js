import React from "react"; 
// import {format} from "date-fns"; 

const EducationForm = (props) => { 
    const { editEducation } = props; 
    return(
        <div>
            <form hidden id = "educationForm"> 
                <p>Please enter your education level:</p> 

                <br />
                <label htmlFor = "highSchool" name = 'level'>Highschool </label>
                <input type = 'radio' id = "highSchool" name = 'level' value = "highSchool" onChange = {editEducation}/>

                <br />
                <label htmlFor = "undergraduate" name = 'level'>Undergraduate </label>
                <input type = 'radio' id = "undergraduate" name = 'level' value = "undergraduate" onChange = {editEducation}/>

                <br />
                <label htmlFor = "graduate" name = 'level'>Graduate </label>
                <input type = 'radio' id = "graduate" name = 'level' value = 'graduate' onChange = {editEducation}/>


                <label htmlFor = "course" name = 'course'>Course: </label>
                <input type = 'text' id = "course" name = 'course' onChange = {editEducation}/>

                <label htmlFor = "institution" name = 'institution'>Institution: </label>
                <input type = 'text' id = "institution" name = 'institution' onChange = {editEducation} />
                
                <label htmlFor = "startDate" name = 'startDate'>Start date: </label>
                <input type = 'month' id = 'startDate' name = 'startDate' onChange = {editEducation}/>

                <label htmlFor = "endDate" name = 'endDateGraduate'>End date: </label>
                <input type = 'month' id = 'endDate' name = 'endDate' onChange = {editEducation}/>

                <button onClick = { 
                    (e) => { e.preventDefault();
                    let form = document.getElementById("educationForm"); form.hidden = true; form.reset() } }> 
                    Close 
                </button>
            </form>
        </div>
    )
    
}

// const UndergraduateForm = (props) => { 
//     const { editEduUndergraduate } = props; 
//     return(
//         <div>
//             <form hidden id = "editUndergraduateForm"> 
//                 <label htmlFor = "level" name = 'levelUndergraduate'>Level: </label>
//                 <input type = 'text' id = "level" name = 'levelUndergraduate' onChange = {editEduUndergraduate}/>

//                 <label htmlFor = "course" name = 'courseUndergraduate'>Course: </label>
//                 <input type = 'text' id = "course" name = 'courseUndergraduate' onChange = {editEduUndergraduate}/>

//                 <label htmlFor = "institution" name = 'institutionUndergraduate'>Institution: </label>
//                 <input type = 'text' id = "institution" name = 'institutionUndergraduate' onChange = {editEduUndergraduate} />
                
//                 <label htmlFor = "startDate" name = 'startDateUndergraduate'>Start date: </label>
//                 <input type = 'month' id = 'startDate' name = 'startDateUndergraduate' onChange = {editEduUndergraduate}/>

//                 <label htmlFor = "endDate" name = 'endDateUndergraduate'>End date: </label>
//                 <input type = 'month' id = 'endDate' name = 'endDateUndergraduate' onChange = {editEduUndergraduate}/>

//                 <button onClick = { 
//                     (e) => { e.preventDefault();
//                     let form = document.getElementById("editUndergraduateForm"); form.hidden = true; form.reset() } }> 
//                     Close 
//                 </button>
//             </form>
//         </div>
//     )
    
// }

export {EducationForm} ;  
// export {UndergraduateForm}; 