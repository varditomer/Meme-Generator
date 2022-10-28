'use strict'

let gElMemeSection //el memeSection
let gElCanvasContainer //el canvas-container selector
let gElCanvas //el canvas selector
let gCtx //canvas context selector
let gElLineHighlighter //el canvas line-highlighter
let gImg

function initMeme(imgIdx) {
    // Init Selectors
    gElMemeSection = document.querySelector('.meme-editor')
    gElCanvasContainer = document.querySelector('.canvas-container')
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    gElLineHighlighter = gElCanvasContainer.querySelector('.line-highlighter')



    // Set selected meme img and show meme editor
    gImg = null // no selected el img ready
    setSelectedMemeImg(imgIdx)
    deepCoppyGmeme()
    gElMemeSection.classList.remove('hide')

    resizeCanvas()
    addListeners()
    renderMeme()
    setLineHeight() // repositioning line by canvas position 
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

//Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    console.log('Im from onDown')


}
function onMove(ev) {
    console.log('Im from onMove')


}
function onUp(ev) {
    console.log('Im from onUp')

}


function drawMemeTextLines() {
    const { lines } = getMeme()
    if (!lines) return
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        drawText(lineIdx, lines)
    }
}

function drawText(lineIdx, lines) {
    console.log(`lineIdx:`, lineIdx)
    const { color, strokeColor, font, pos, size, txt, direction } = lines[lineIdx]
    gCtx.font = `${size}px ${font}`
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    const middleOfCanvas = gElCanvas.width / 2;
    gCtx.beginPath()
    gCtx.stroke()
    gCtx.textAlign = direction;

    switch (direction) {
        case 'start':
            gCtx.fillText(txt, pos.x, pos.y) // Draws (fills) a given text at the given (x, y) position.
            gCtx.strokeText(txt, pos.x, pos.y) // Draws (strokes) a given text at the given (x, y) position.
            break;
        case 'end':
            gCtx.fillText(txt, gElCanvas.width - pos.x, pos.y) // Draws (fills) a given text at the given (x, y) position.
            gCtx.strokeText(txt, gElCanvas.width - pos.x, pos.y) // Draws (strokes) a given text at the given (x, y) position.

            break;
        case 'center':
            gCtx.fillText(txt, middleOfCanvas, pos.y) // Draws (fills) a given text at the given (x, y) position.
            gCtx.strokeText(txt, middleOfCanvas, pos.y) // Draws (strokes) a given text at the given (x, y) position.

            break;

        default:
            break;
    }
}

function resizeCanvas() {
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = gElCanvasContainer.offsetWidth

    // Unless needed, better keep height fixed.
    // gElCanvas.height = gElCanvasContainer.offsetHeight
    // renderMeme()
}

function handleNoLinesLeft() {
    gElLineHighlighter.classList.add('hide')
    updatElCurrLineInputTxt('')
    cursorsToNotAllowed()
    disableBtns()
}

function repositionLineHighlighter(height, top) {
    if (!getMeme().lines.length) return
    gElLineHighlighter.style.height = `${height}px`
    gElLineHighlighter.style.top = `${top}px`
}

function onDownloadCanvas(elLink) {
    downloadCanvas(gElCanvas, elLink)
}

function setLineHeight() {
    if (!getMeme().lines.length) return
    updateLineHeight(gElCanvasContainer.offsetHeight)
}

// On Set functions

// line handle
function onInputMemeLineText(evMemeLineText) {
    if (!getMeme().lines.length) return
    const memeTxt = evMemeLineText.target.value
    setLineTxt(memeTxt)
    renderMeme()
}

function onSwitchLine() {
    if (!getMeme().lines.length) return
    switchSelectedLine()
    updatElCurrLineInputTxt(getMeme().lines[getSelectedLineIdx()].txt)
    updatElCurrLineSelectFont(getMeme().lines[getSelectedLineIdx()].font)
}

// update ElCurrLineInputTxt by curr line content 
function updatElCurrLineInputTxt(lineContent) {
    const elInputTxt = gElMemeSection.querySelector('.meme-txt')
    elInputTxt.value = lineContent
}
// update ElCurrLineFont by curr line font
function updatElCurrLineSelectFont(lineFont) {
    const elSelectFont = document.getElementById('fonts')
    elSelectFont.value = lineFont
}

function onAddLine() {
    addLine(gElCanvasContainer.offsetHeight)
    renderMeme()
    cursorsToPointer()
    enableBtns()

}

function onRemoveLine() {
    if (!getMeme().lines.length) return
    removeSelectedLine()
    renderMeme()
    enableAdd()
}

function onRestoreDefaultMemeLines() {
    const { selectedImgId } = getMeme()
    restoreDefaultMemeLines()
    initMeme(selectedImgId)
    gElLineHighlighter.classList.remove('hide')
    cursorsToPointer()
    enableBtns()
    enableAdd()
}

// font size & align
function onChangeFSize(change) {
    if (!getMeme().lines.length) return
    changeFSize(change)
    renderMeme()
}

function onAlignLineTxt(direction) {
    if (!getMeme().lines.length) return
    setLineDirection(direction)
    renderMeme()
}

// font & color
function onSelectFont(evFontSelect) {
    if (!getMeme().lines.length) return
    setLineFont(evFontSelect.target.value)
    renderMeme()
}

function onSetSroke(evStrokeColor) {
    if (!getMeme().lines.length) return
    setStrokeColor(evStrokeColor.target.value)
    renderMeme()
}

function onSetFill(evFillColor) {
    if (!getMeme().lines.length) return
    setFillColor(evFillColor.target.value)
    renderMeme()
}

// Drag and Drop


// hide meme section
function hideMemeEditorSection() {
    if (!gElMemeSection.classList.contains('hide')) gElMemeSection.classList.add('hide')
}

// Cursors to not-allowed
function cursorsToNotAllowed() {
    gElMemeSection.querySelector('.switch').style.cursor = 'not-allowed'
    gElMemeSection.querySelector('.remove').style.cursor = 'not-allowed'
    gElMemeSection.querySelector('.increase').style.cursor = 'not-allowed'
    gElMemeSection.querySelector('.decrease').style.cursor = 'not-allowed'
    gElMemeSection.querySelector('.align-left').style.cursor = 'not-allowed'
    gElMemeSection.querySelector('.align-center').style.cursor = 'not-allowed'
    gElMemeSection.querySelector('.align-right').style.cursor = 'not-allowed'
    gElMemeSection.querySelector('.fonts').style.cursor = 'not-allowed'
    gElMemeSection.querySelector('.fill-color-selector').style.cursor = 'not-allowed'
    gElMemeSection.querySelector('.stroke-color-selector').style.cursor = 'not-allowed'
}
// Cursors to pointer
function cursorsToPointer() {
    gElMemeSection.querySelector('.switch').style.cursor = 'pointer'
    gElMemeSection.querySelector('.remove').style.cursor = 'pointer'
    gElMemeSection.querySelector('.increase').style.cursor = 'pointer'
    gElMemeSection.querySelector('.decrease').style.cursor = 'pointer'
    gElMemeSection.querySelector('.align-left').style.cursor = 'pointer'
    gElMemeSection.querySelector('.align-center').style.cursor = 'pointer'
    gElMemeSection.querySelector('.align-right').style.cursor = 'pointer'
    gElMemeSection.querySelector('.fonts').style.cursor = 'pointer'
    gElMemeSection.querySelector('.fill-color-selector').style.cursor = 'pointer'
    gElMemeSection.querySelector('.stroke-color-selector').style.cursor = 'pointer'
}

function disableBtns() {
    gElMemeSection.querySelector('.switch').setAttribute("disabled", "disabled")
    gElMemeSection.querySelector('.remove').setAttribute("disabled", "disabled")
    gElMemeSection.querySelector('.increase').setAttribute("disabled", "disabled")
    gElMemeSection.querySelector('.decrease').setAttribute("disabled", "disabled")
    gElMemeSection.querySelector('.align-left').setAttribute("disabled", "disabled")
    gElMemeSection.querySelector('.align-center').setAttribute("disabled", "disabled")
    gElMemeSection.querySelector('.align-right').setAttribute("disabled", "disabled")
    gElMemeSection.querySelector('.fonts').setAttribute("disabled", "disabled")
    gElMemeSection.querySelector('.fill-color-selector').setAttribute("disabled", "disabled")
    gElMemeSection.querySelector('.stroke-color-selector').setAttribute("disabled", "disabled")
    gElMemeSection.querySelector('.fill-color').setAttribute("disabled", "disabled")
    gElMemeSection.querySelector('.stroke-color').setAttribute("disabled", "disabled")
}

function enableBtns() {
    gElMemeSection.querySelector('.switch').removeAttribute("disabled")
    gElMemeSection.querySelector('.remove').removeAttribute("disabled")
    gElMemeSection.querySelector('.increase').removeAttribute("disabled")
    gElMemeSection.querySelector('.decrease').removeAttribute("disabled")
    gElMemeSection.querySelector('.align-left').removeAttribute("disabled")
    gElMemeSection.querySelector('.align-center').removeAttribute("disabled")
    gElMemeSection.querySelector('.align-right').removeAttribute("disabled")
    gElMemeSection.querySelector('.fonts').removeAttribute("disabled")
    gElMemeSection.querySelector('.fill-color-selector').removeAttribute("disabled")
    gElMemeSection.querySelector('.stroke-color-selector').removeAttribute("disabled")
    gElMemeSection.querySelector('.fill-color').removeAttribute("disabled")
    gElMemeSection.querySelector('.stroke-color').removeAttribute("disabled")
}

function disableAdd() {
    gElMemeSection.querySelector('.add').setAttribute("disabled", "disabled")
    gElMemeSection.querySelector('.add').style.cursor = 'not-allowed'
}

function enableAdd() {
    gElMemeSection.querySelector('.add').removeAttribute("disabled")
    gElMemeSection.querySelector('.add').style.cursor = 'pointer'
}