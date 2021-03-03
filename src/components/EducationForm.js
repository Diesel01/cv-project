import React from "react"; 

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

export {EducationForm} ;  
