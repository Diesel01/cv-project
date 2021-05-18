<div 
style = {{
  display: 'grid', 
  gridTemplateColumns: "auto auto"
}}
>
 
<div id = "editMode"
style = {{
  position: 'relative',
  margin: '10px',
  height: "842px", 
  width: "595px" 
}}
>

{/* General infomation section ---------------------------------------------------------------------- */}
  { this.state.generalInfo.display ?                      
    <GeneralInfo 
      {...this.state.generalInfo} 
      deleteGeneralInfo = {this.deleteGeneralInfo} 
      onStopHandle = {this.getTransformValues} 
    /> 
    : 
    null 
  }

  <button onClick = { () => {document.getElementById("editGenInfoForm").hidden = false} }> Edit general information </button>
  
  <GenInfoForm  editGeneralInfo = {this.editGeneralInfo}/>
  
  <button onClick = { () => { this.changeStyle("generalInfo"); } }> Edit style </button>
  
  { this.state.styleSelector.generalInfo ? 
    <StyleSelector elementId = "fullName"/> 
    : 
    null 
  }


{/* Education section ------------------------------------------------------------------------------- */}
  <Draggable
    onStop = { () => {this.getTransformValues(1, 'Education')} }
    bounds = "parent"
  >
    <ul className = "educationList" style = {{position: "static"}}>
      {this.state.education.items.map( object => { 
        return(
          <>
            <Education {...object} />
            <button onClick = {() => {this.deleteState("education", object.id)} }> X </button>
          </>
        )
      })}
    </ul>
  </Draggable>

  <button onClick = { () => {document.getElementById("educationForm").hidden = false} } > Edit education </button>
  <EducationForm editEducation = {this.editEducation}/>

  <button onClick = { () => { this.changeStyle("education"); } }> Edit style </button>
  { this.state.styleSelector.education ? <StyleSelector elementId = "educationList"/> : null }


{/* Job exeperience section ----------------------------------------------------------------------- */}
  <Draggable
    onStop = { () => {this.getTransformValues(2, 'JobExp')} }
    bounds = "parent"
  >
    <ul className = "jobExpList">

      {this.state.jobExp.items.map( object => { 

        return(
          <>
            <JobExp 
              {...object}   
              deleteState = {this.deleteState} 
              onStopHandle = {this.getTransformValues}
              key = {object.id}
            />
            <button onClick = {() => {this.deleteState("jobExp", object.id)} }> X </button>
          </>
        )

      })}

    </ul>
  </Draggable>

  <button onClick = { () => {document.getElementById("jobExpForm").hidden = false} } > Edit job experience </button>
  <JobExpForm  editJobExp = {this.editJobExp}/>

  <button onClick = { () => { this.changeStyle("jobExp"); } }> Edit style </button>
  { this.state.styleSelector.jobExp ? <StyleSelector elementId = "jobExpList"/> : null }

</div>

<button onClick = {() => { this.changecreatePDF() } }>Click here to render your CV as a PDF</button>

{this.state.createPDF ? <PdfGenerator {...this.state} /> : null }
</div>