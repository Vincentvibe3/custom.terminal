import { HSVColor, HSV2HEX, HSV2RGB, contrast } from "./colorUtils";

export function renderBorders(element:HTMLElement, color:HSVColor, weight:string){
    let borderColorDark = {h:color.h, s:color.s, v:color.v-0.2}
    let borderColorLight = {h:color.h, s:color.s, v:color.v+0.2}
    if (color.v == 0){
        borderColorDark.s = 0
        borderColorLight.s = 0
    }
    let contrastLight = contrast(HSV2RGB(color), HSV2RGB(borderColorLight))
    let contrastDark = contrast(HSV2RGB(color), HSV2RGB(borderColorDark))
    let borderColor = (contrastDark>contrastLight) ? borderColorDark : borderColorLight

    if (element.tagName === "INPUT"){
        element.style.border = `${HSV2HEX(borderColor)} ${weight} solid`
    } else {
        element.style.outline = `${HSV2HEX(borderColor)} ${weight} solid`
    }
}

export function renderColor(colorName:string, color:HSVColor){
    let elements:HTMLCollection = document.getElementsByClassName(colorName)
    
    let bgColor = color
    if (colorName.endsWith("_alt")){
        let colorDark = {h:color.h, s:color.s, v:color.v-0.2}
        let colorLight = {h:color.h, s:color.s, v:color.v+0.2}
        let contrastLight = contrast(HSV2RGB(color), HSV2RGB(colorLight))
        let contrastDark = contrast(HSV2RGB(color), HSV2RGB(colorDark))
        bgColor = (contrastDark>contrastLight) ? colorDark : colorLight
    }
    
    let contrastBlack = contrast(HSV2RGB(bgColor), {r:0, g:0, b:0})
    let contrastWhite = contrast(HSV2RGB(bgColor), {r:255, g:255, b:255})
    let textColor = (contrastBlack>contrastWhite) ? "black" : "white"
    if (bgColor.v===0){
        bgColor.s = 0
    }
    for (let element of elements){
        (element as HTMLElement).style.color = textColor;
        (element as HTMLElement).style.backgroundColor = HSV2HEX(bgColor)
    }
}