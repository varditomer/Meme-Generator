'use strict'

//Check if the click is inside lines
function isAlineClicked(clickedPos, canvaContainerWidth) {
    const { lines } = getMeme()
    let clickedLineIdx = -1
    lines.forEach((line, idx) => {
        if (isLineClicked(clickedPos, line, canvaContainerWidth)) return clickedLineIdx=idx
    });
    return clickedLineIdx
}

function isLineClicked(clickedPos, line, canvaContainerWidth) {
    const { pos, size } = line
    // if click was inside one of the lines y limits (pos.y - size)
    return (clickedPos.y >= pos.y - size && clickedPos.y <= pos.y && clickedPos.x >= pos.x - size && clickedPos.x <= canvaContainerWidth)
}

function lineDragIdx() {
    const { lines } = getMeme()
    const dragedLineIdx = lines.findIndex(line => line.isDrag)
    return dragedLineIdx
}

function setIsLineDrag(clickedLineIdx, bool) {
    const { lines } = getMeme()
    lines[clickedLineIdx].isDrag = bool
}

//Move the line in a delta, diff from the pervious pos
function moveLine(dx,dy) {
    const { lines } = getMeme()
    const dragedLineIdx = lines.findIndex(line => line.isDrag)
    lines[dragedLineIdx].pos.x += dx
    lines[dragedLineIdx].pos.y += dy
}