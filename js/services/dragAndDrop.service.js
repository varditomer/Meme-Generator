'use strict'

//Check if the click is inside lines
function isAlineClicked(clickedPos) {
    const {lines} = getMeme().lines
    const clickedLine = -1
    lines.forEach((line,idx) => {
        if(isLineClicked(clickedPos, line))
        clickedLine=idx
    });
    return clickedLine
}

function isLineClicked(clickedPos, line) {
    const { pos, size } = line
    //If clickedPos <= pos.y+line.size && clickedPos > =pos.y
    return (clickedPos <= pos.y + size && clickedPos >= pos.y)
}

function setCircleDrag(isDrag) {
    gCircle.isDrag = isDrag
}

//Move the circle in a delta, diff from the pervious pos
function moveCircle(dx, dy) {
    gCircle.pos.x += dx
    gCircle.pos.y += dy

}