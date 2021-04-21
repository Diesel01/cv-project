import React from "react";
import Education from "./Education";
import JobExp from './JobExp';
import Draggable from 'react-draggable';
import PdfGenerator from "./pdfGenerator.js";

export default class ViewMode extends React.Component{ 
    render(){ 
        const { generalInfo, education, jobExp } = this.props; 
        return(
            <>
                <div id = "viewMode">

                    <Draggable>
                        <div> 
                            <h2 className = "fullName">
                                {generalInfo.fullName}
                            </h2>

                            <p> Date of birth: {generalInfo.dateBirth} </p>

                            <p> Email:  {generalInfo.email} </p>

                            <p> Phone: {generalInfo.phone} </p>

                        </div>                
                    </Draggable>

                    <Draggable>
                        <ul className = "educationList">
                            {education.map( object => { 
                                return(
                                    <Education {...object} key = {object.id} />
                                ) 
                            } ) }
                        </ul>
                    </Draggable>

                    <Draggable>
                        <ul className = "jobExpList">
                            {jobExp.map( object => { 
                                return(
                                    <JobExp {...object} key = {object.id}/>
                                ) 
                            } ) }
                        </ul>
                    </Draggable>

                </div>

                <button onClick = { () => { PdfGenerator(generalInfo, education, jobExp) } }> 
                    Click here to open your CV as a PDF
                </button>
                {/* maybe pass props as one object?  */}
            </>
        )
    }
}