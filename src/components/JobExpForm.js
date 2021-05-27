import React from "react"; 
import "../styles/Forms.css";

const JobExpForm = (props) => { 
    const { editJobExp, toggleForm } = props; 
    return(
            <form id = "jobExpForm" className = "form"> 

                <div className = "input" style = {{display: "flex"}}>
                    <p> <b>Please enter your job experience:</b> </p> 
                    <button onClick = {() => {toggleForm("jobExp")}} className = 'button'>
                        <img src = 'imgs/close.svg' alt = 'Close general info form' />
                    </button>
                </div>

                <div className = "input">
                    <label htmlFor = "company" name = 'company'> Company: </label>
                    <input type = 'text' id = "company" name = 'company' />        
                </div>
        
                <div className = "input">
                    <label htmlFor = "positionTitle" name = 'positionTitle'>Position title: </label>
                    <input type = 'text' id = "positionTitle" name = 'positionTitle' />
                </div>

                <div className = "input">
                    <label htmlFor = "responsibleFor" name = 'responsibleFor'>Responsible for: </label>
                    <input type = 'text' id = "responsibleFor" name = 'responsibleFor' />
                </div>
                
                <div className = "input">
                    <label htmlFor="startDate">Start date:</label>
                    <input type = "date" id = "startDateJob"></input>
                </div>

                <div className = "input">
                    <label htmlFor="endDate">End date:</label>
                    <input type = "date" id = "endDateJob"></input>
                </div>
                    

                <button type = "submit" name = "submit" 
                    className = "button-Form"
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
