export interface RGBColor{
    r:number,
    g:number,
    b:number
}

export interface HSVColor{
    h:number,
    s:number,
    v:number,
}

export function HEX2RGB(hex:string):RGBColor{
  hex = hex.replace("#", "")
  let hexR = hex.slice(0, 2)
  let hexG = hex.slice(2, 4)
  let hexB = hex.slice(4, 6)
  return {r:parseInt(hexR, 16), g:parseInt(hexG, 16), b:parseInt(hexB, 16)}
}

export function RGB2HSV(color:RGBColor){
  let r = color.r/255
  let g = color.g/255
  let b = color.b/255
  let v = Math.max(r, g, b)
  let c = v-Math.min(r, g, b)
  let l = v-(c/2)

  let hue:number;
  if (c===0){
    hue = 0
  } else if (v===r){
    hue = 60*(0+(g-b)/c)
  } else if (v===g){
    hue = 60*(2+(b-r)/c)
  } else if (v===b){
    hue = 60*(4+(r-g)/c)
  }
  if (hue < 0){
    hue = 360+hue
  }

  let val:number;
  let sat:number;
  if (l===0||l===1){
    sat = 0
    val = l+sat*Math.min(l, 1-l)
  } else {
    let satL = (v-l)/Math.min(l, 1-l)
    val = l+satL*Math.min(l, 1-l)
    sat = 2*(1-(l/val))
  }
  return {h:hue, s:sat, v:val}
}

export function HSV2RGB(color:HSVColor):RGBColor{
    let hue = (color.h==360 ? 0 : color.h)
    let sat = color.s
    let val = color.v

    let r = 0;
    let g = 0;
    let b = 0;

    let chroma = val * sat;
    let hPrime = hue/60;
    let intHPrime = Math.floor(hPrime);
    let x = chroma*(1-Math.abs(hPrime%2-1));
    switch (intHPrime){
      case 0:
        r = chroma;
        g = x;
        break;
      case 1 :
        r = x;
        g = chroma;
        break;
      case 2:
        g = chroma;
        b = x;
        break;
      case 3:
        g = x;
        b = chroma;
        break;
      case 4:
        r = x;
        b = chroma;
        break;
      case 5:
        r = chroma;
        b = x;
        break;
    }
    let m = val-chroma
    return {
        r:255*(r+m),
        g:255*(g+m),
        b:255*(b+m)
    }
  
  }