'use strict'

let gElMemeSection //el memeSection
let gElCanvasContainer //el canvas-container selector
let gElCanvas //el canvas selector
let gCtx //canvas context selector
let gImg

function initMeme(imgIdx) {
    // Init Selectors
    gElMemeSection = document.querySelector('.meme-editor')
    gElCanvasContainer = document.querySelector('.canvas-container')
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    // Set selected meme img and show meme editor
    gImg = null // no selected el img ready
    setSelectedMemeImg(imgIdx)
    gElMemeSection.classList.remove('hide')

    resizeCanvas()
    renderMeme()
    setLineHeight() // repositioning line by canvas position 

    // Add page resize ev-listener
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
        // setLineHeight()
    })
}

function renderMeme() {
    const { selectedImgId } = getMeme()

    //draw image on canvas
    const imgUrl = getImgUrl(selectedImgId)
    const img = new Image() // Create a new html img element
    img.src = imgUrl // Send a network req to get that image, define the img src
    
    // After img was selected and el img was prepared - prevent from preparing again
    if (gImg) {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        //Render line of txt on top of canvas
        drawMemeTextLines()
        return
    } // When the image ready draw it on the canvas
    img.onload = () => {
        gImg = img
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        //Render line of txt on top of canvas
        drawMemeTextLines()
    }
}

function drawMemeTextLines() {
    const { lines } = getMeme()
    for (let lineIdx = 0; lineIdx < 2; lineIdx++) {  
        drawText(lineIdx, lines)
    }
}

function drawText(lineIdx, lines) {
    const { color, strokeColor, font, pos, size, txt} = lines[lineIdx]
    gCtx.font = `${size}px ${font}`
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color

    gCtx.fillText(txt, pos.x, pos.y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, pos.x, pos.y) // Draws (strokes) a given text at the given (x, y) position.
}

function resizeCanvas() {
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = gElCanvasContainer.offsetWidth

    // Unless needed, better keep height fixed.
    // gElCanvas.height = gElCanvasContainer.offsetHeight
    // renderMeme()
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

function onDownloadCanvas(elLink) {
    downloadCanvas(gElCanvas, elLink)
}

function setLineHeight() {
    updateLineHeight(gElCanvasContainer.offsetHeight)
}

// On Set functions
function onInputMemeLineText(evMemeLineText) {
    const memeTxt = evMemeLineText.target.value
    setLineTxt(memeTxt)
    renderMeme()
}

function onSwitchLine() {
    switchSelectedLine()
}

function onChangeFSize(change) {
    changeFSize(change)
    renderMeme()
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
