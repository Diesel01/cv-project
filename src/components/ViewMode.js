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
        this.getTransformValues = this.getTransformValues.bind(this)
    }

    getTransformValues = (index, id) => {
        const element = document.getElementsByClassName("react-draggable")[index]
        const style = window.getComputedStyle(element)
        const matrix = style['transform'] || style.mozTransform;
        let values = {};

        if (matrix === 'none' || typeof matrix === 'undefined') { //I'm not sure if this conditional is really necessary
            values = { x: 0, y: 0}
            this.setState({
                ...this.state, 
                [`transform${id}`]: values
            }, () => {console.log(this.state)})
            return    
        }

        const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', '); 
        values = { x: matrixValues[4], y: matrixValues[5]}
        this.setState({
            ...this.state, 
            [`transform${id}`]: values
        }, () => {console.log(this.state)})
    };

    render(){ 
        const { generalInfo, education, jobExp } = this.props; 
        return(
            <>
            {console.log(this.props)}
                <div id = "viewMode">
                    <div 
                        id = "pageA4" 
                        style = {{
                            position: 'relative',
                            margin: '10px', 
                            height: "842px", 
                            width: "595px" 
                        }}
                    >
                        {/* <Draggable 
                            bounds = "parent"
                            // offsetParent = {document.getElementById("pageA4")}
                            onStop = { () =>{
                                this.getTransformValues(0, "GeneralInfo");
                            }}
                        > */}
                            <div style = { {width: '50%'} }> 
                                <h2 className = "fullName">
                                    {generalInfo.fullName}
                                </h2>

                                <p> Date of birth: {generalInfo.dateBirth} </p>

                                <p> Email:  {generalInfo.email} </p>

                                <p> Phone: {generalInfo.phone} </p>

                            </div>                
                        {/* </Draggable> */}

                        <Draggable
                            bounds = "parent"
                            offsetParent = {document.getElementById("pageA4")}
                            onStop = { () =>{
                                 this.getTransformValues(1, "Education");
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
                            bounds = "parent"
                            offsetParent = {document.getElementById("pageA4")}
                            onStop = { () =>{
                                 this.getTransformValues(2, "JobExp");
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
                </div>

                {/* <PdfGenerator {...this.props} /> */}
            </>
        )
    }
}