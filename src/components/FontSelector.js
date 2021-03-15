import React from 'react';

// Put items of Google fonts api into an array and map them into a radio input. 
// Put the imtes in a collapsible div and, after one is selected, display italics and weight options. 
// The inputs should be put into the 'data' url. 

export default class FormSelector extends React.Component{ 
    constructor(){ 
        super(); 

        this.selectFont = this.selectFont.bind(this)
    }
    
    selectFont(family, weight, italics, id){ 
        let data

        if (family.includes(" ")){ 
            let split = family.split(" "); 
            let addedInput = split[0].concat("+", split[1]) 
            data = `https://fonts.googleapis.com/css2?family=${addedInput}:${italics},wght@1,${weight}&display=swap`

        } else {
            data = `https://fonts.googleapis.com/css2?family=${family}:${italics},wght@1,${weight}&display=swap`
        }

        let style = document.createElement("link")
            style.rel = "stylesheet"; 
            style.href = data; 
        document.head.appendChild(style)

        let element = document.getElementById(`${id}`); 
            element.style.fontFamily = `${family}`
            element.style.fontWeight = weight
    }   

    render(){ 
        return(
            <>
                <input type = "text" id = "fontInput"></input>
                <input type = "range" id = "weightInput" min = "100" max = "900" step = "100" defaultValue = "400"></input>
                <input type = "checkbox" id = "italicInput"></input>
                <button onClick = { 
                    ()=>{ 
                        let fontInput = document.getElementById("fontInput").value; 
                        let weightInput = document.getElementById("weightInput").value; 
                        let italicInput = document.getElementById("italicInput").value; 
                        this.selectFont(fontInput, weightInput, italicInput, "fullName")
                    }
                } />
            </>
        )
    }
}