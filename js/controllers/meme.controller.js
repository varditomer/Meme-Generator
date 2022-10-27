'use strict'

let gElCanvas
let gCtx
let gElCanvasContainer
const gElMemeSection = document.querySelector('.meme-editor')

function initMeme(imgIdx) {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    gElCanvasContainer = document.querySelector('.canvas-container')

    setSelectedMemeImg(imgIdx)
    gElMemeSection.classList.remove('hide')

    resizeCanvas()
    setLineHeight()

    window.addEventListener('resize', resizeCanvas)
}

function renderMeme() {
    const { selectedImgId } = getMeme()

    //draw image on canvas
    const imgUrl = getImgUrl(selectedImgId)
    const img = new Image() // Create a new html img element
    img.src = imgUrl // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        //Render line of txt on top of canvas
        drawText(0)
        drawText(1)
    }
}

function drawText(line = 0) {
    const { lines } = getMeme()
    const { color, strokeColor, font, pos, size, txt, isSelected } = lines[line]
    gCtx.font = `${size}px ${font}`
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color


    gCtx.fillText(txt, pos.x, pos.y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, pos.x, pos.y) // Draws (strokes) a given text at the given (x, y) position.
}



function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = gElCanvasContainer.offsetWidth

    // Unless needed, better keep height fixed.
    // gElCanvas.height = gElCanvasContainer.offsetHeight
    renderMeme()
}

function draw(ev) {
    const gCurrShape = 'text'
    const offsetX = ev.offsetX
    const offsetY = ev.offsetY
    console.log(offsetX, offsetY)
    // const { offsetX, offsetY } = ev

    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break
        case 'rect':
            drawRect(offsetX, offsetY)
            break
        case 'text':
            drawText('Hello', offsetX, offsetY)
            break
        case 'line':
            drawLine(offsetX, offsetY)
            break
    }
}

function onInputMemeText() {
    const memeTxt = gElMemeSection.querySelector('.meme-txt').value
    setLineTxt(memeTxt)
    renderMeme()

}

function onChangeFSize(change) {
    changeFSize(change)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    downloadCanvas(gElCanvas, elLink)
}

function setLineHeight() {
    updateLineHeight(gElCanvasContainer.offsetHeight)
}

function onSwitchLine() {
    switchSelectedLine()
}

function onSetSroke(evStrokeColor) {
    setStrokeColor(evStrokeColor.target.value)
    renderMeme()

}



function onSetFill(evFillColor) {
    setFillColor(evFillColor.target.value)
    renderMeme()
}

// hide meme section
function hideMemeEditorSection() {
    if (!gElMemeSection.classList.contains('hide')) gElMemeSection.classList.add('hide')
}
