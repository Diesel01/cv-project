import React from "react";
import Education from "./Education";
import JobExp from './JobExp';
import FontSelector from "./FontSelector";
import Draggable from 'react-draggable';

export default class ViewMode extends React.Component{ 
    render(){ 
        const { generalInfo, education, jobExp } = this.props; 
        return(
            <div id = "viewMode" hidden = {true}>
                <Draggable>
                    <div> 
                        <h2 id = "fullName">
                            {generalInfo.firstName} {generalInfo.secondName} 
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
                                <Education {...object} key = {object.id} 
                                onClick = {
                                    ()=>{return (<FontSelector classInput = "educationList" hidden = {false} />)}
                                }/>
                            ) 
                        } ) }
                    </ul>
                </Draggable>

                <Draggable>
                    <ul className = "jobExpList">
                        {jobExp.map( object => { 
                            return(<JobExp {...object} key = {object.id}/>) 
                        } ) }
                    </ul>
                </Draggable>
            </div>
        )
    }
}