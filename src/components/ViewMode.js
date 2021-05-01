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

            activeDrags: 0,
            deltaPosition: {
                x: 0, y: 0
            },
            controlledPosition: {
                x: -400, y: 200
            }
        }
        this.handleDrag = this.handleDrag.bind(this)
    }

    handleDrag = event => {
        let x = event.x; 
        let y = event.y;
        this.setState({
            ...this.state, 
            deltaPosition: {
                x: x,
                y: y
            }
        }, () => {console.log(this.state.deltaPosition)});
    };
    render(){ 
        const { generalInfo, education, jobExp } = this.props; 
        return(
            <>
                <div id = "viewMode">
                    <div style = {{
                        position: 'relative',
                        margin: '10px', 
                        height: "842px", 
                        width: "595px" 
                    }}>
                        <Draggable 
                            bounds = "parent"
                            onDrag = { () => { 
                                let value = document.getElementsByClassName("react-draggable")[0].style.transform
                                this.setState({ ...this.state, transformGeneralInfo: value })
                            }}
                            onStop = {                                this.handleDrag
                            } 
                        >
                            <div style = { {width: '50%'} }> 
                                <h2 className = "fullName">
                                    {generalInfo.fullName}
                                </h2>

                                <p> Date of birth: {generalInfo.dateBirth} </p>

                                <p> Email:  {generalInfo.email} </p>

                                <p> Phone: {generalInfo.phone} </p>

                            </div>                
                        </Draggable>

                        <Draggable
                            bounds = "parent"
                            onDrag = { () => { 
                                let value = document.getElementsByClassName("react-draggable")[1].style.transform
                                this.setState({ ...this.state, transformEducation: value })
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
                            onDrag = { () => { 
                                let value = document.getElementsByClassName("react-draggable")[2].style.transform
                                this.setState({ ...this.state, transformJobExp: value })
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

                <PdfGenerator 
                    { ... {...this.props, 
                        transformGeneralInfo: this.state.deltaPosition,
                        transformEducation: this.state.transformEducation, 
                        transformJobExp: this.state.transformJobExp
                    } } 
                />
            </>
        )
    }
}