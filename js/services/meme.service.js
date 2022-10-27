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
            isSelected: true
        },
        {
            txt: 'Enough of this shit!',
            size: 40,
            font: 'impact',
            align: 'left',
            color: 'white',
            strokeColor: 'black',
            pos: { x: 10, y: 470 },
            isSelected: false
        }
    ]
}

function getMeme() {
    return gMeme
}

function setSelectedMemeImg(selectedImgId) {
    gMeme.selectedImgId = selectedImgId
}

function setLineTxt(memeTxt) {
    gMeme.lines[getSelectedLineIdx()].txt = memeTxt
}

function changeFSize(change) {
    gMeme.lines[0].size += change
    gMeme.lines[0].pos.y += change
}

function switchSelectedLine() {
    const currLineIdx = getSelectedLineIdx()
    const elLineHighlighter = document.querySelector('.line-highlighter')
    const inputTxt = document.querySelector('.meme-txt')

    gMeme.lines[currLineIdx].isSelected = false
    if (currLineIdx + 1 > gMeme.lines.length - 1) {
        gMeme.lines[0].isSelected = true
        // move to controller
        elLineHighlighter.style.height = `${gMeme.lines[0].size + 10}px`
        elLineHighlighter.style.top = `${0}px`
        inputTxt.value = gMeme.lines[0].txt

    }
    else {
        gMeme.lines[currLineIdx + 1].isSelected = true
        // move to controller
        elLineHighlighter.style.height = `${gMeme.lines[0].size + 10}px`
        elLineHighlighter.style.top = `${gMeme.lines[currLineIdx + 1].pos.y - (gMeme.lines[0].size)}px`
        inputTxt.value = gMeme.lines[currLineIdx + 1].txt


    }

}

function downloadCanvas(elCanvas, elLink) {
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = elCanvas.toDataURL(/* DEFAULT: 'image/png'*/) // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    console.log('data', data) // Decoded the image to base64 
    elLink.href = data // Put it on the link
    elLink.download = 'shuki' // Can change the name of the file
}

function updateLineHeight(canvasHeight) {
    gMeme.lines[1].pos.y = canvasHeight - 15
}

function setFillColor(fillColor) {
    console.log(`123:`, )
    const currLine = getSelectedLineIdx()
    gMeme.lines[currLine].color = fillColor
}

function setStrokeColor(strokeColor) {
    const currLine = getSelectedLineIdx()
    gMeme.lines[currLine].strokeColor = strokeColor
}



// helpers functions
function getSelectedLineIdx() {
    return gMeme.lines.findIndex(line => line.isSelected)
}