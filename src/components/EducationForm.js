import React from "react"; 

const EducationForm = (props) => { 
    const { editEducation } = props; 
    return(
        <div>
            <form hidden id = "educationForm"> 
                <p>Please enter your education level:</p> 

                <br />
                <label htmlFor = "highSchool" name = 'level'>Highschool </label>
                <input type = 'radio' id = "highSchool" name = 'level' value = "Highschool" />

                <br />
                <label htmlFor = "undergraduate" name = 'level'>Undergraduate </label>
                <input type = 'radio' id = "undergraduate" name = 'level' value = "Undergraduate" />

                <br />
                <label htmlFor = "graduate" name = 'level'>Graduate </label>
                <input type = 'radio' id = "graduate" name = 'level' value = 'Graduate' />


                <label htmlFor = "course" name = 'course'>Course: </label>
                <input type = 'text' id = "course" name = 'course' />

                <label htmlFor = "institution" name = 'institution'>Institution: </label>
                <input type = 'text' id = "institution" name = 'institution'  />
                
                <span>
                    <label htmlFor="startDate">Start date:</label>
                    <input type = "date" id = "startDate"></input>
                </span>

                <span>
                    <label htmlFor="endDate">End date:</label>
                    <input type = "date" id = "endDate"></input>
                </span>

                <button type = "submit" name = "submit" onClick = { 
                    (e) => { 
                    e.preventDefault();
                    editEducation(); 
                    let form = document.getElementById("educationForm"); form.hidden = true; form.reset() } 
                }> 
                    Close 
                </button>
            </form>
        </div>
    )
    
}

export {EducationForm} ;  
