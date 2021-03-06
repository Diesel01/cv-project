import React from "react"; 

const JobExpForm = (props) => { 
    const { editJobExp } = props; 
    return(
            <form hidden id = "jobExpForm"> 
                <p>Please enter your job experience:</p> 
                <br />

                <label htmlFor = "company" name = 'company'> Company: </label>
                <input type = 'text' id = "company" name = 'company' />

                <label htmlFor = "positionTitle" name = 'positionTitle'>Position title: </label>
                <input type = 'text' id = "positionTitle" name = 'positionTitle' />

                <label htmlFor = "responsibleFor" name = 'responsibleFor'>Responsoible for: </label>
                <input type = 'text' id = "responsibleFor" name = 'responsibleFor' />
                
                <label htmlFor = "startDate" name = 'startDate'>Start date: </label>
                <input type = 'month' id = 'startDate' name = 'startDate' />

                <label htmlFor = "endDate" name = 'endDateGraduate'>End date: </label>
                <input type = 'month' id = 'endDate' name = 'endDate' />

                <button type = "submit" name = "submit" onClick = { 
                    (e) => { 
                    editJobExp();
                    e.preventDefault()
                    let form = document.getElementById("jobExpForm"); 
                    form.hidden = true; form.reset();  } 
                    }
                /> 
            </form>
    )
    
}

export {JobExpForm} ;  
