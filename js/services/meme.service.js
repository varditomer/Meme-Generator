'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            font: 'impact',
            align: 'left',
            color: 'white',
            strokeColor: 'black',
            pos: { x: 10, y: 40 },
            direction: 'start',
            isSelected: true,
            isDrag: false,
        },
        {
            txt: 'Enough of this shit!',
            size: 40,
            font: 'impact',
            align: 'left',
            color: 'white',
            strokeColor: 'black',
            pos: { x: 10, y: 470 },
            direction: 'start',
            isSelected: false,
            isDrag: false            
        }
    ]
}

var gdeepCoppyGmeme

// Getters
function getMeme() {
    return gMeme
}

// Setters:
function setSelectedMemeImg(selectedImgId) {
    gMeme.selectedImgId = selectedImgId
}

// line handle
function setLineTxt(memeTxt) {
    gMeme.lines[getSelectedLineIdx()].txt = memeTxt
}

function switchSelectedLine() {
    const currLineIdx = getSelectedLineIdx()

    gMeme.lines[currLineIdx].isSelected = false
    if (currLineIdx + 1 > gMeme.lines.length - 1) {
        gMeme.lines[0].isSelected = true
    }
    else {
        gMeme.lines[currLineIdx + 1].isSelected = true
    }
    repositionLineHighlighter((gMeme.lines[getSelectedLineIdx()].size + 10), (gMeme.lines[getSelectedLineIdx()].pos.y - (gMeme.lines[getSelectedLineIdx()].size)))
}

function addLine(canvasHeight) {
    if (gMeme.lines.length === 3) return
    const newLine = {
        txt: 'I sometimes eat Falafel',
        size: 40,
        font: 'impact',
        align: 'left',
        color: 'white',
        strokeColor: 'black',
        pos: { x: 10, y: canvasHeight / 2 },
        direction: 'start',
        isSelected: true,
        isDrag: false
    }
    if (gMeme.lines.length) gMeme.lines[getSelectedLineIdx()].isSelected = false
    gMeme.lines.push(newLine)
    repositionLineHighlighter((gMeme.lines[getSelectedLineIdx()].size + 10), (gMeme.lines[getSelectedLineIdx()].pos.y - (gMeme.lines[getSelectedLineIdx()].size)))
    if (gMeme.lines.length === 3) return disableAdd()
}

function removeSelectedLine() {
    const deletedLineIdx = getSelectedLineIdx()
    switchSelectedLine()
    if (gMeme.lines.length === 1) handleNoLinesLeft()
    gMeme.lines.splice(deletedLineIdx, 1)
}

function restoreDefaultMemeLines() {
    gMeme = gdeepCoppyGmeme
    repositionLineHighlighter((gMeme.lines[0].size + 10), 0)
}

// font size & align
function changeFSize(change) {
    const currLineIdx = getSelectedLineIdx()
    gMeme.lines[currLineIdx].size += change
    gMeme.lines[currLineIdx].pos.y += change
    repositionLineHighlighter((gMeme.lines[currLineIdx].size + 10), (gMeme.lines[currLineIdx].pos.y - (gMeme.lines[currLineIdx].size)))
}

function setLineDirection(direction) {
    const currLineIdx = getSelectedLineIdx()
    gMeme.lines[currLineIdx].direction = direction
}

// font & color
function setLineFont(font) {
    const currLine = getSelectedLineIdx()
    gMeme.lines[currLine].font = font
}


function setFillColor(fillColor) {
    const currLine = getSelectedLineIdx()
    gMeme.lines[currLine].color = fillColor
}

function setStrokeColor(strokeColor) {
    const currLine = getSelectedLineIdx()
    gMeme.lines[currLine].strokeColor = strokeColor
}

// Services
function downloadCanvas(elCanvas, elLink) {
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = elCanvas.toDataURL(/* DEFAULT: 'image/png'*/) // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    // console.log('data', data) // Decoded the image to base64 
    elLink.href = data // Put it on the link
    elLink.download = 'my-canvas' // Can change the name of the file
}

// helpers functions
function updateLineHeight(canvasHeight) {
    gMeme.lines[1].pos.y = canvasHeight - 15
}

function getSelectedLineIdx() {
    return gMeme.lines.findIndex(line => line.isSelected)
}

function deepCoppyGmeme() {
    gdeepCoppyGmeme = JSON.parse(JSON.stringify(gMeme));
}