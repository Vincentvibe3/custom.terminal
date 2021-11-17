import { HSVColor, HSV2HEX } from "./colorUtils";

export function renderBorders(element:HTMLElement, color:HSVColor, weight:string){
    let borderColor = {h:color.h, s:color.s, v:color.v}
    if (color.v == 0){
        borderColor.s = 0
    }
    if (color.v > 0.5){
        borderColor.v = borderColor.v-0.2
    } else {
        borderColor.v = borderColor.v+0.2
    }

    if (element.tagName === "INPUT"){
        element.style.border = `${HSV2HEX(borderColor)} ${weight} solid`
    } else {
        element.style.outline = `${HSV2HEX(borderColor)} ${weight} solid`
    }
}