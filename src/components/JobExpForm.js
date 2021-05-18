import React from "react"; 

const JobExpForm = (props) => { 
    const { editJobExp, toggleForm } = props; 
    return(
            <form id = "jobExpForm"> 
                <p>Please enter your job experience:</p> 
                <button onClick = {() => {toggleForm("jobExp")}}>X</button>
                <br />

                <label htmlFor = "company" name = 'company'> Company: </label>
                <input type = 'text' id = "company" name = 'company' />

                <label htmlFor = "positionTitle" name = 'positionTitle'>Position title: </label>
                <input type = 'text' id = "positionTitle" name = 'positionTitle' />

                <label htmlFor = "responsibleFor" name = 'responsibleFor'>Responsible for: </label>
                <input type = 'text' id = "responsibleFor" name = 'responsibleFor' />
                
                <span>
                    <label htmlFor="startDate">Start date:</label>
                    <input type = "date" id = "startDateJob"></input>
                </span>

                <span>
                    <label htmlFor="endDate">End date:</label>
                    <input type = "date" id = "endDateJob"></input>
                </span>

                <button type = "submit" name = "submit" 
                    onClick = { (e) => { 
                        e.preventDefault();                     
                        editJobExp();
                        let form = document.getElementById("jobExpForm"); 
                        form.reset();  
                    }}
                >Submit 
                </button> 
            </form>
    )
    
}

export {JobExpForm} ;  
