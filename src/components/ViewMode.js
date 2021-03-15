import React from "react";
import Education from "./Education";
import JobExp from './JobExp';
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
                    <ul>
                        {education.map( object => { 
                            return(<Education {...object} deleteState = {this.deleteState} key = {object.id}/>) 
                        } ) }
                    </ul>
                </Draggable>

                <Draggable>
                    <ul>
                        {jobExp.map( object => { 
                            return(<JobExp {...object} deleteState = {this.deleteState} key = {object.id}/>) 
                        } ) }
                    </ul>
                </Draggable>
            </div>
        )
    }
}