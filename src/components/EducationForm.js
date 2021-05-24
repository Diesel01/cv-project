import React from "react"; 
import "../styles/Forms.css";

const EducationForm = (props) => { 
    const { editEducation, toggleForm } = props; 
    return(
        <div>
            <form id = "educationForm" className = "form"> 
                <div className = "input" style = {{display: "flex"}}>
                    <p><b>Please enter your educational information:</b> </p> 
                    <button onClick = {() => {toggleForm("education")}}>X</button>
                </div>

                <div className = "input">
                    <label htmlFor = "highSchool" name = 'level'>Highschool </label>
                    <input type = 'radio' id = "highSchool" name = 'level' value = "Highschool" />
                </div>

                <div className = "input">
                    <label htmlFor = "undergraduate" name = 'level'>Undergraduate </label>
                    <input type = 'radio' id = "undergraduate" name = 'level' value = "Undergraduate" />
                </div>

                <div className = "input">
                    <label htmlFor = "graduate" name = 'level'>Graduate </label>
                    <input type = 'radio' id = "graduate" name = 'level' value = 'Graduate' />
                </div>

                <div className = "input">
                    <label htmlFor = "course" name = 'course'>Course: </label>
                    <input type = 'text' id = "course" name = 'course' />
                </div>

                <div className = "input">
                    <label htmlFor = "institution" name = 'institution'>Institution: </label>
                    <input type = 'text' id = "institution" name = 'institution'  />
                </div>
                
                <div className = "input">
                    <label htmlFor="startDate">Start date:</label>
                    <input type = "date" id = "startDate"></input>
                </div>

                <div className = "input">
                    <label htmlFor="endDate">End date:</label>
                    <input type = "date" id = "endDate"></input>
                </div>

                <button type = "submit" name = "submit" onClick = { 
                    (e) => { 
                    e.preventDefault();
                    editEducation(); 
                    let form = document.getElementById("educationForm"); 
                    form.reset() } 
                }> 
                    Submit 
                </button>
            </form>
        </div>
    )
    
}

export {EducationForm} ;  
