import React from 'react';

// Put items of Google fonts api into an array and map them into a radio input. 
// Put the imtes in a collapsible div and, after one is selected, display italics and weight options. 
    // Maybe do another map iteration with this.state.fontVariants, instead of assigning values to range and radio inputs?
// The inputs should be put into the 'data' url. 

export default class FormSelector extends React.Component{ 
    constructor(){ 
        super(); 
        this.state = { 
            fonts: [], 
            selectedFamily: "", 
            fontVariants: []
        }
        this.applyFont = this.applyFont.bind(this)
        this.fontHandler = this.fontHandler.bind(this)
        this.displayFontVariant = this.displayFontVariant.bind(this)
    }

    async componentDidMount(){ 
        let data = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAfSLRqUkls5peRZBi6YmLucrPIDxJ_zLM&sort=popularity", { mode: 'cors' })
        
        try { 
            let dataJson = await data.json(); 
            let families = dataJson.items; 
                families.length = 25; 
            this.setState({
                fonts: families
            })
        }
        catch { throw console.error() }  
    }

    fontHandler(font){
        this.setState({ 

            selectedFamily: font.family, 
            fontVariants: font.variants

        }, () => {console.log(this.state)})
    }

    displayFontVariant(variant){ 
        if (variant === "regular" || variant === "italic"){ 
            return { __html: variant[0].toUpperCase() + variant.slice(1) }

        } else { 
            let weight = variant.slice(0, 3) 
            let italic = variant.slice(3)
            return { __html: `Weight: ${weight}; ${italic} `}
        }
    }
    

    applyFont(variant, id){ 
        let element = document.getElementById(`${id}`); 
        let text = element.innerHTML

        let fam = this.state.selectedFamily.replace(/\s+/g, "+");
        let weight; 
        let italic;
        let url; 
        
        if (variant === "regular"){ 
            weight = "400"; 
            url = `https://fonts.googleapis.com/css2?family=${fam}:wght@${weight}&display=swap;text=${text}`
        }
        
        if (document.getElementById(`font-for-${id}`) === null){
            let style = document.createElement("link");
                style.rel = "stylesheet"; 
                style.href = url; 
                style.id = `font-for-${id}`
            document.head.appendChild(style)
        }else{ 
            let style = document.getElementById(`font-for-${id}`); 
            style.href = url; 
        }
          
        element.style.fontFamily = `${this.state.selectedFamily}`
        element.style.fontWeight = weight
    }   

    render(){ 
        return(
            <>
                {this.state.fonts.map( (font, index) => { 
                    return (
                        <div>  
                            <input name = "font" id = {font.family} type = "radio" key = {`input-${index}`}
                                onClick = {() => { this.fontHandler(font) }}
                            >
                            </input> 

                            <label name = "font" htmlFor = {font.family} key = {`label-${index}`}>
                                {font.family}
                            </label>
                        </div>
                    )
                })}

                {this.state.fontVariants.map( (variant, index) => { 
                    return (
                        <div>  
                            <input name = "font" id = {variant} type = "radio" key = {`inputVariant-${index}`}
                                onClick = {() => { this.applyFont(variant, "fullName") }}
                            >
                            </input> 

                            <label name = "font" htmlFor = {variant} id = {`label-${variant}`} key = {`labelVariant-${index}`}
                                dangerouslySetInnerHTML =  { this.displayFontVariant(variant) }>
                            </label>
                        </div>
                    )
                })}
            </>
        )
    }
}