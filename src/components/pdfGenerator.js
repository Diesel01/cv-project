import React, {useState, useEffect} from 'react';
import { Page, Text, Document, StyleSheet, Font, View, usePDF } from '@react-pdf/renderer';
import { fontsArray } from "./StyleSelector";


const PdfGenerator = props => {

    const [styles, setStyles] = useState({})

    function getFont(){ 
        for (let i = 0; i < fontsArray.length; i++){ 
            let font = fontsArray[i]; 
            Font.register({
                family: font.family, 
                fonts:[{
                    src: font.src, 
                    fontStyle: font.style, 
                    fontWeight: font.weight
                }]
            })
        }
        console.log(Font)
    }

    function createStyles(){          
        const cssRules = document.getElementById('editableStyles').sheet.cssRules; 
            console.log(cssRules)
            const styleSheets = StyleSheet.create({
                page: {
                    flexDirection: 'row',
                    backgroundColor: '#E4E4E4'
                },

                view: { 
                    padding: "15px"
                },  
                
                fullName: { 
                    fontFamily: cssRules[0].style.fontFamily !== "" ?  cssRules[0].style.fontFamily : "Roboto", 
                    fontSize: parseInt(cssRules[0].style.fontSize), 
                    fontWeight: cssRules[0].style.fontWeight, 
                    fontStyle: cssRules[0].style.fontStyle, 
                    color: cssRules[0].style.color 
                }, 
        
                educationList: { 
                    fontFamily: cssRules[1].style.fontFamily !== "" ?  cssRules[1].style.fontFamily : "Roboto",
                    fontSize: parseInt(cssRules[1].style.fontSize), 
                    fontWeight: cssRules[1].style.fontWeight, 
                    fontStyle: cssRules[1].style.fontStyle, 
                    color: cssRules[1].style.color 
                },  
        
                jobExpList: { 
                    fontFamily: cssRules[2].style.fontFamily !== "" ?  cssRules[2].style.fontFamily : "Roboto",
                    fontSize: parseInt(cssRules[2].style.fontSize), 
                    fontWeight: cssRules[2].style.fontWeight, 
                    fontStyle: cssRules[2].style.fontStyle, 
                    color: cssRules[2].style.color 
                }
        
            })
            console.log(styleSheets)
        
        return styleSheets
    }

    useEffect( () => {
        function getStyle(){
            getFont(); 
            const styleSheet = createStyles(); 
            setStyles(styleSheet)
        }
        getStyle()
    }, []) 
   
    const doc = (
        <Document>
            <Page size="A4" style={styles.page}>

                <View>
                    <Text style={styles.fullName}>
                    {props.generalInfo.fullName}
        
                    Date of birth: {props.generalInfo.dateBirth}
        
                    Email:  {props.generalInfo.email}
        
                    Phone: {props.generalInfo.phone}
                    </Text>
    
                </View>
               
                <View style = {styles.view}>
                {props.education.map(object => { 
                    return (
                        <Text style={styles.educationList}>
                           {object.level} in {object.course} at {object.institution}, from {object.startDate} until {object.endDate} 
                        </Text>
                        )
                    })
                }
                </View>

                <View>
                {props.jobExp.map(object => {
                    return ( 
                        <Text style={styles.jobExpList}>
                            {object.positionTitle} in {object.company}, from {object.startDate} until {object.endDate}, responsible for {object.responsibleFor}
                        </Text>
                        )
                    })
                }
                </View>
            </Page>
        </Document>
    )

    const [instance] = usePDF( {document: doc} )

    return (
        <a href={instance.url} target= "_blank" rel = "noreferrer">Open in new tab</a>
    )
}

export default PdfGenerator

//pass Blob provider here? 