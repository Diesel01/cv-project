import React from 'react';
import { Page, Text, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { fontsArray } from "./StyleSelector";

function getFont(){ 
    // for (let i = 0; i < fontsArray.length; i++){ 
    //     let font = fontsArray[i]; 
    //     Font.register({
    //         family: font.family, 
    //         fonts:[{
    //             src: font.src, 
    //             fontStyle: font.style, 
    //             fontWeight: font.weight
    //         }]
    //     })
    // }

    Font.register(
        {
            family: fontsArray[0].family, 
            src: fontsArray[0].src, 
            fontStyle: fontsArray[0].style, 
            fontWeight: fontsArray[0].weight
        }, 
        
        {
            family: fontsArray[1].family, 
            src: fontsArray[1].src, 
            fontStyle: fontsArray[1].style, 
            fontWeight: fontsArray[1].weight
        },  
        
        {
            family: fontsArray[2].family, 
            src: fontsArray[2].src, 
            fontStyle: fontsArray[2].style, 
            fontWeight: fontsArray[2].weight
        }, 

    )
}

function createStyles(){  
    
    getFont()
       const cssRules = document.getElementById('editableStyles').sheet.cssRules; 
        console.log(cssRules)
        const styleSheets = StyleSheet.create({
            page: {
                flexDirection: 'row',
                backgroundColor: '#E4E4E4'
            },
            
            fullName: { 
                fontFamily: cssRules[0].style.fontFamily, 
                fontSize: cssRules[0].style.fontSize, 
                fontWeight: cssRules[0].style.fontWeight, 
                fontStyle: cssRules[0].style.fontStyle, 
                color: cssRules[0].style.color 
            }, 
    
            educationList: { 
                fontFamily: cssRules[1].style.fontFamily, 
                fontSize: cssRules[1].style.fontSize, 
                fontWeight: cssRules[1].style.fontWeight, 
                fontStyle: cssRules[1].style.fontStyle, 
                color: cssRules[1].style.color 
            },  
    
            jobExpList: { 
                fontFamily: cssRules[2].style.fontFamily, 
                fontSize: cssRules[2].style.fontSize, 
                fontWeight: cssRules[2].style.fontWeight, 
                fontStyle: cssRules[2].style.fontStyle, 
                color: cssRules[2].style.color 
            }
    
        })
        console.log(styleSheets)
    
    return styleSheets
}

const pdfGenerator = props => {

    const styles = createStyles()
    console.log(styles) 
   
    const doc = (
        <Document>
            <Page size="A4" style={styles.page}>
    
                <Text style={styles.fullName}>
                    {props.generalInfo.fullName}
        
                    Date of birth: {props.generalInfo.dateBirth}
        
                    Email:  {props.generalInfo.email}
        
                    Phone: {props.generalInfo.phone}
                </Text>
    
                    
                {props.education.map(object => { 
                    return (
                        <Text style={styles.educationList}>
                           {object.level} in {object.course} at {object.institution}, from {object.startDate} until {object.endDate} 
                        </Text>
                        )
                    })
                }
    
                {props.jobExp.map(object => {
                    return ( 
                        <Text style={styles.jobExpList}>
                            {object.positionTitle} in {object.company}, from {object.startDate} until {object.endDate}, responsible for {object.responsibleFor}
                        </Text>
                        )
                    })
                }
                </Page>
            </Document>
    )
    return doc
}

export default pdfGenerator