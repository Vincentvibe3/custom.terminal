import { HSV2RGB, HSVColor, RGB2HEX } from "./colorUtils";

export function renderBorders(element:HTMLElement, color:HSVColor, weight:string){
    let borderColor = {h:color.h, s:color.s, v:color.v}
    if (color.v == 0){
        borderColor.s = 0
    }
    if (color.v > 0.5){
        borderColor.v = borderColor.v-0.1
    } else {
        borderColor.v = borderColor.v+0.1
    }
    element.style.outline = `${RGB2HEX(HSV2RGB(borderColor))} ${weight} solid`
}