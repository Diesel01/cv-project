import React from "react";
import Education from "./Education";
import JobExp from './JobExp';
import Draggable from 'react-draggable';
import PdfGenerator from "./pdfGenerator.js";

export default class ViewMode extends React.Component{ 
    constructor(){
        super(); 
        this.state = {
            transformGeneralInfo: "", 
            transformEducation: "", 
            transformJobExp: "", 
        }
    }
    render(){ 
        const { generalInfo, education, jobExp } = this.props; 
        return(
            <>
                <div id = "viewMode">

                    <Draggable 
                        onDrag = { () => { 
                            let value = document.getElementsByClassName("react-draggable")[0].style.transform
                            this.setState({ ...this.state, transformGeneralInfo: value } 
                                //, () => {console.log(this.state)} 
                            )
                        }} 
                    >
                        <div> 
                            <h2 className = "fullName">
                                {generalInfo.fullName}
                            </h2>

                            <p> Date of birth: {generalInfo.dateBirth} </p>

                            <p> Email:  {generalInfo.email} </p>

                            <p> Phone: {generalInfo.phone} </p>

                        </div>                
                    </Draggable>

                    <Draggable
                        onDrag = { () => { 
                            let value = document.getElementsByClassName("react-draggable")[1].style.transform
                            this.setState({ ...this.state, transformEducation: value }
                                // , () => {console.log(this.state)} 
                            )
                        }} 
                    >
                        <ul className = "educationList">
                            {education.map( object => { 
                                return(
                                    <Education {...object} key = {object.id} />
                                ) 
                            } ) }
                        </ul>
                    </Draggable>

                    <Draggable
                        onDrag = { () => { 
                            let value = document.getElementsByClassName("react-draggable")[2].style.transform
                            this.setState({ ...this.state, transformJobExp: value }
                                // , () => {console.log(this.state)} 
                            )
                        }} 
                    >
                        <ul className = "jobExpList">
                            {jobExp.map( object => { 
                                return(
                                    <JobExp {...object} key = {object.id}/>
                                ) 
                            } ) }
                        </ul>
                    </Draggable>

                </div>

                <PdfGenerator 
                    { ... {...this.props, 
                        transformGeneralInfo: this.state.transformGeneralInfo,
                        transformEducation: this.state.transformEducation, 
                        transformJobExp: this.state.transformJobExp
                    } } 
                />
            </>
        )
    }
}