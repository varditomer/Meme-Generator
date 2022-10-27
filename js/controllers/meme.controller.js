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

    resizeCanvas()
    renderMeme()
    gElMemeSection.classList.remove('hide')
}

function renderMeme() {
    const {selectedImgId} = getMeme()
    
    //draw image on canvas
    const imgUrl = getImgUrl(selectedImgId)
    drawImg(imgUrl)


    //Todo: render line of txt on top of canvas



}

function drawImg(imgUrl = './images/meme-imgs (square)/0.jpg') {
    const img = new Image() // Create a new html img element
    img.src = imgUrl // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    img.onload = () => {
        
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(0)
    }
}

function drawText(line = 0) {
    const {lines} = getMeme()
    const currLine = lines[line]
    gCtx.lineWidth = 2
    gCtx.strokeStyle = currLine.strokeColor
    gCtx.fillStyle = currLine.color


    gCtx.font = `${currLine.size}px ${currLine.font}`
    gCtx.fillText(currLine.txt, currLine.pos.x, currLine.pos.y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(currLine.txt, currLine.pos.x, currLine.pos.y) // Draws (strokes) a given text at the given (x, y) position.
}



function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // Note: changing the canvas dimension this way clears the canvas
    console.log(`gElCanvasContainer.offsetWidth:`, gElCanvasContainer.offsetWidth)
    console.log(`gElCanvasContainer.offsetWidth - 200:`, gElCanvasContainer.offsetWidth - 200)
    gElCanvas.width = gElCanvasContainer.offsetWidth + 545
    // Unless needed, better keep height fixed.
    // gElCanvas.height = gElCanvasContainer.offsetHeight
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
    console.log(`memeTxt:`, memeTxt)
    setMemeText(memeTxt)
    renderMeme()

}

function onChangeFSize(change) {
    changeFSize(change)
    renderMeme()
}


// hide meme section
function hideMemeEditorSection() {
    if (!gElMemeSection.classList.contains('hide')) gElMemeSection.classList.add('hide')
}
