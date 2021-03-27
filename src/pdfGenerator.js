import { fontArray } from "./components/StyleSelector.js";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const getStyle = (className) => { 
    console.log(fontArray)
    let cssRules = document.getElementById('editableStyles').sheet.cssRules; 
    let styleRule

    for (let i = 0; i < cssRules.length; i++){ 
        if (cssRules[i].selectorText === `.${className}`){
            styleRule = { 
                font: cssRules[i].style.fontFamily, 
                fontSize: cssRules[i].style.fontSize, 
                fontWeight: parseInt(cssRules[i].style.fontWeight), 
                color: cssRules[i].style.color
            }

            cssRules[i].style.fontStyle === 'italic' ? styleRule.italics = true : styleRule.italics = false; 

            for (let x = 0; x < fontArray.length; x++){ 
                if (fontArray[x].family === styleRule.font){ 
                    let files = fontArray[x].files; 

                    files.forEach(variant => {
                        if (variant === styleRule.fontWeight){ 
                            pdfMake.fonts = { 
                                [fontArray[x].family]: {
                                    [variant]: files.variant
                                }
                            }
                        }
                    })
                }
            }
        }
    }

    console.log(styleRule)
    console.log(pdfMake.fonts)
    return styleRule
}

const pdfGenerator = (generalInfo, education, jobExp) => { 
    
    let eduItems = [];
    for (let i = 0; i < education.length; i++){
        eduItems.push(
            `${education[i].level} in ${education[i].course} at ${education[i].institution}, from ${education[i].startDate} until ${education[i].endDate}`
        )
    }

    let jobExpItems = []; 
    for (let i = 0; i < jobExp.length; i++){
        jobExpItems.push(
            `${jobExp[i].level} in ${jobExp[i].course} at ${jobExp[i].institution}, from ${jobExp[i].startDate} until ${jobExp[i].endDate}`
        )
    }

    let doc = {
        content: [
            `${generalInfo}`, 

            {text: "Education:"}, 
            { 
                style: "educationList",  
                ul: eduItems 
            },

            {text: "Job experience:"}, 
            { ul: jobExpItems }
        ], 
        
        styles: {
            educationList: { 
                color: getStyle('educationList')
            }
        }
    }

    pdfMake.createPdf(doc).open() 
}

export default pdfGenerator