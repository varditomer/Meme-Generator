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
            color: 'red',
            strokeColor: 'black',
            pos: { x: 10, y: 40 }
        }
    ]
}

function getMeme() {
    return gMeme
}

function setSelectedMemeImg(selectedImgId) {
    gMeme.selectedImgId = selectedImgId
}

function setMemeText(memeTxt) {
    gMeme.lines[0].txt = memeTxt
}

function changeFSize(change) {
    gMeme.lines[0].size += change
}