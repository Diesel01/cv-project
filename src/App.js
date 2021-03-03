import  React from "react";
import GeneralInfo from "./components/GeneralInfo";
import { parseISO, format } from "date-fns";
import GenInfoForm from "./components/GenInfoForm";
import Education from "./components/Education";
import { EducationForm } from "./components/EducationForm";


class App extends React.Component{ 
  constructor(){ 
    super(); 

    this.state = { 

      generalInfo: {
        firstName: '',  
        secondName: '', 
        dateBirth: '', 
        email: '', 
        phone: ''
      }, 

      education: {
        // graduateSchool: {
        //   institutionGraduate:'', 
        //   startDateGraduate: '', 
        //   endDateGraduate: '', 
        //   courseGraduate: '',
        //   levelGraduate: ''
        // }, 
        // undergraduate:{ 
        //   institution:'', 
        //   startDate: '', 
        //   endDate: '', 
        //   course: '',
        //   level: '', 
        // },
      }
    } 

    this.editGeneralInfo = this.editGeneralInfo.bind(this)
    this.deleteGeneralInfo = this.deleteGeneralInfo.bind(this)

    this.editEducation = this.editEducation.bind(this)
  }

  editGeneralInfo(e){ 
    if(e.target.name !== 'dateBirth'){ 
      this.setState({
        generalInfo: { ...this.state.generalInfo, [e.target.name]: e.target.value }
      }, () => { console.log(this.state) })
    
    }else{ 
      let date = parseISO(e.target.value); 
      let today = new Date(); 
        if (date < today){
          let stringDate = format(date, "do 'of' MMMM, yyyy") 
          this.setState({
            generalInfo: { ...this.state.generalInfo, [e.target.name]: stringDate }
          }, () => { console.log(this.state) }) 
        }else{
          alert("Please insert a valid date")
        }
    }
  }
  
  deleteGeneralInfo(){ 
    this.setState({ 
      generalInfo: {
        firstName: "", 
        secondName: "",
        dateBirth: "",   
        email: "", 
        phone: ""
      }
    }, () => { console.log(this.state) })
  }

  editEducation(e){ 
    let stateProp
    let array = document.getElementsByName('level'); 
    
    for (let index = 0; index < array.length; index++) {
      if (array[index].checked === true){ 
        stateProp = array[index].value;
        this.setState({
          education: {...this.state.education, [stateProp]: { 
            level: stateProp, course: '', institution: '', startDate: '', endDate: ''
          } }
        })
      }    
    }
  
    if(e.target.name !== 'startDate' || 'endDate'){ 
      this.setState({
        education: { ...this.state.education, [stateProp]: { ...this.state.education[stateProp], [e.target.name]: e.target.value } }
        }, () => { console.log(this.state.education) } )

    }else{ 
      let date = parseISO(e.target.value); 
      let today = new Date(); 
        if (date < today){
          let stringDate = format(date, "do 'of' MMMM, yyyy") 
          this.setState({
            education: { ...this.state.education, stateProp: {...this.state.education.stateProp, [e.target.name]: stringDate } }
          }, () => { console.log(this.state.education.stateProp) }) 
        }else{
          alert("Please insert a valid date")
      }
    }
  }

  // editUndegraduate(e){ 
  //   if(e.target.name !== 'startDate' || 'endDate'){ 
  //     this.setState({
  //       education: { ...this.state.education, undergraduate: {...this.state.education.graduateSchool, [e.target.name]: e.target.value } }
  //       }, () => { console.log(this.state) }
  //     )
    
  //   }else{ 
  //     let date = parseISO(e.target.value);  
  //     let today = new Date(); 
  //       if (date < today){
  //         let stringDate = format(date, "do 'of' MMMM, yyyy") 
  //         this.setState({
  //           education: { ...this.state.education, undergraduate: {...this.state.education.graduateSchool, [e.target.name]: stringDate } }
  //         }, () => { console.log(this.state) }) 
  //       }else{
  //         alert("Please insert a valid date")
  //     }
  //   }
  // }

  render(){ 
    return(
      <div>

        <section>
          <GeneralInfo {... this.state.generalInfo} />
          <GenInfoForm  editGeneralInfo = {this.editGeneralInfo}/>
          <button onClick = {this.deleteGeneralInfo}> Delete </button>
        </section>

        <section>
          <Education {...this.state.education.graduateSchool} />
          <EducationForm editEducation = {this.editEducation}/>
        </section>
        
      </div>

    )
  }
}

export default App;
