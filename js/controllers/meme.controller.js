'use strict'

let gElCanvas
let gCtx
let gElCanvasContainer
const gElMemeSection = document.querySelector('.meme-editor')

function initMeme(imgIdx) {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    gElCanvasContainer = document.querySelector('.canvas-container')

    resizeCanvas()
    renderMeme(imgIdx)
    gElMemeSection.classList.remove('hide')
}

function renderMeme(imgIdx) {
    // const meme = getMeme()
    //draw image on canvas
    const imgUrl = getImgUrl(imgIdx)
    console.log(`imgUrl:`, imgUrl)
    drawImg(imgUrl)


    //Todo: render line of txt on top of canvas

}

function drawImg(imgUrl = './images/meme-imgs (square)/0.jpg') {
    console.log(`imgUrl:`, imgUrl)
    const img = new Image() // Create a new html img element
    img.src = imgUrl // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function hideMemeEditorSection() {
    if (!gElMemeSection.classList.contains('hide')) gElMemeSection.classList.add('hide')
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
