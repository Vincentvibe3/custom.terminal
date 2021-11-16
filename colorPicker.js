
function drawColorPicker(clrCtx) {
    let gradient = clrCtx.createLinearGradient(0, 0, canvas.width, 0)
  
    gradient.addColorStop(0, "white")
    gradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`)
    clrCtx.fillStyle = gradient
    clrCtx.fillRect(0, 0, canvas.width, canvas.height)
    gradient = clrCtx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
    clrCtx.fillStyle = gradient
    clrCtx.fillRect(0, 0, canvas.width, canvas.height)
  
}

function updateColors(x, y){
  sat = x/canvas.width
  val = (canvas.height-y)/canvas.height
  rgbColor = HSB2RGB()
  activeColorDisplay.style.backgroundColor = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`
  currentbutton.style.backgroundColor = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`
  document.getElementById("color1").style.backgroundColor
  console.log(rgbColor)
}

function drawSliderThumb(){
  let y = (hue/360*slider.clientHeight)-sliderThumb.clientHeight/2
  sliderThumb.style.transform = `translate(-50%, ${-y}px)`
  sliderThumb.style.background = `hsl(${hue}, 100%, 50%)`
}

function drawCanvasThumb(){
  let y = canvas.clientHeight-(val*canvas.clientHeight)-canvasThumb.clientHeight
  let x = canvas.clientWidth-(sat*canvas.clientWidth)+canvasThumb.clientWidth
  canvasThumb.style.transform = `translate(-${x}px, ${y}px)`
  canvasThumb.style.background = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`
}

function displayValues(){
  let r = setZeros(Math.round(rgbColor[0]).toString(16))
  let g = setZeros(Math.round(rgbColor[1]).toString(16))
  let b = setZeros(Math.round(rgbColor[2]).toString(16))
  hexDisplay.innerHTML = `#${r}${g}${b}`
}

function HSB2RGB(){
  let r
  let g
  let b
  let tempHue
  if (hue == 360){
    tempHue = 0
  } else {
    tempHue = hue
  }
  let chroma = val * sat
  let hPrime = tempHue/60
  let intHPrime = Math.floor(hPrime)
  let x = chroma*(1-Math.abs(hPrime%2-1))
  switch (intHPrime){
    case 0:
      r = chroma
      g = x
      b = 0
      break;
    case 1 :
      r = x
      g = chroma
      b = 0
      break;
    case 2:
      r = 0
      g = chroma
      b = x
      break;
    case 3:
      r = 0
      g = x
      b = chroma
      break;
    case 4:
      r = x
      g = 0
      b = chroma
      break;
    case 5:
      r = chroma
      g = 0
      b = x
      break;
    default:
      r, g, b = 0
      break;
  }
  let m = val-chroma
  return [255*(r+m), 255*(g+m), 255*(b+m)]

}

function getPosition(rawx, rawy){
  var canvasRect = canvas.getBoundingClientRect()
  var initX = canvasRect.left
  var initY = canvasRect.top
  let canvasWidth = canvasRect.width
  let canvasHeight = canvasRect.height
  let x = Math.round((rawx-initX)/canvasWidth*canvas.width)
  let y = Math.round((rawy-initY)/canvasHeight*canvas.height)
  if (x >= canvasWidth){
    x = canvasWidth
  } else if (x <= 0){
    x = 0
  }
  if (y>= canvasHeight){
    y = canvasHeight
  } else if (y <= 0){
    y = 0
  }
  return [x, y]
}

function setZeros(text){
  let length = text.length
  let zeros = ""
  for (let amount = 2-length; amount>0; amount--){
    zeros+="0"
  }
  return zeros+text
}

function setCurrentButton(event){
  currentbutton = event.target
  console.log(currentbutton)
}

function drawButton(event, mouseover){
  console.log("hovered")
  if (mouseover){
    event.target.style.filter = "brightness(50%)"
  } else {
    event.target.style.filter = "brightness(100%)"
  }
  
}

var hue = 0
var sat = 1
var val = 1

let isDrawing = false;
let isDrawingSlider = false;

var body = document.body
var slider = document.getElementById("hueSlider")
var sliderThumb = document.getElementById("sliderThumb")
var canvasThumb = document.getElementById("canvasThumb")
var canvas = document.getElementById('colorPickerCanvas');
var hueSlider = document.getElementById("hueSlider")
var hexDisplay = document.getElementById("hex")
var clrCtx = canvas.getContext('2d', { alpha: false });
var colors = document.getElementsByClassName("color")
var activeColorDisplay = document.getElementById("activeColor").getElementsByClassName("view")[0]
var buttons = document.getElementsByClassName("color")
var currentbutton = document.getElementById("color1")

canvas.height = 240
canvas.width = 240

var selectorX = sat*canvas.width
var selectorY = (val-1)*canvas.height

hueSlider.value = 0
hexDisplay.innerHTML = hueSlider.value+setZeros(hueSlider.value)


for (let button of buttons) {
  button.addEventListener("click", e=> {
    setCurrentButton(e)
  })
  button.addEventListener("mouseover", e=>{
    drawButton(e, true)
  })
  button.addEventListener("mouseout", e=>{
    drawButton(e, false)
  })
}

hueSlider.oninput = function(){
  hue = this.value
  updateColors(selectorX, selectorY)
  drawColorPicker(clrCtx)
  drawSliderThumb()
  drawCanvasThumb()
}

sliderThumb.addEventListener("mousedown", e=> {
  hue = hueSlider.value
  updateColors(selectorX, selectorY)
  drawColorPicker(clrCtx)
  drawSliderThumb()
  drawCanvasThumb()
  isDrawingSlider = true
})

canvasThumb.addEventListener("mousedown", e=> {
    let coords = getPosition(e.pageX, e.pageY)
    selectorX = coords[0]
    selectorY = coords[1]
    isDrawing = true;
})

canvas.addEventListener("mousedown", e => {
  let coords = getPosition(e.pageX, e.pageY)
  selectorX = coords[0]
  selectorY = coords[1]
  isDrawing = true;
  updateColors(selectorX, selectorY)
  drawColorPicker(clrCtx);
  drawCanvasThumb()
  displayValues()
})

window.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    let coords = getPosition(e.pageX, e.pageY)
    selectorX = coords[0]
    selectorY = coords[1]
    updateColors(selectorX, selectorY)
    drawCanvasThumb()
    drawSliderThumb()
  } else if (isDrawingSlider===true) {
    let coords = getPosition(e.pageX, e.pageY)
    hueSlider.value = (slider.clientHeight-coords[1])/slider.clientHeight*360
    hue = hueSlider.value
    updateColors(selectorX, selectorY)
    drawColorPicker(clrCtx)
    drawSliderThumb()
    drawCanvasThumb()
  }
  displayValues()
});
  
window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    let coords = getPosition(e.pageX, e.pageY)
    selectorX = coords[0]
    selectorY = coords[1]
    updateColors(selectorX, selectorY)
    drawColorPicker(clrCtx);
    drawCanvasThumb()
    drawSliderThumb()
    isDrawing = false;
  } else if (isDrawingSlider === true){
    let coords = getPosition(e.pageX, e.pageY)
    hueSlider.value = (slider.clientHeight-coords[1])/slider.clientHeight*360
    hue = hueSlider.value
    updateColors(selectorX, selectorY)
    drawColorPicker(clrCtx)
    drawSliderThumb()
    drawCanvasThumb()
    isDrawingSlider = false;
  }
});

let rgbColor = HSB2RGB()
updateColors(canvas.width, 0)
drawColorPicker(clrCtx)
drawCanvasThumb()
drawSliderThumb()
var warningButton = document.getElementById("mobileWarning").getElementsByTagName("button")[0]
warningButton.onclick = function(){
  var warning = document.getElementById("mobileWarning")
  warning.style.display = "none"
  
}