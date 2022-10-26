'use strict'

function init() {
    initGallery()
}

function switchToMemeEditor(imgIdx) {
    console.log(`imgIdx:`, imgIdx)
    initMeme(imgIdx)
}

function onGalleryClicked() {
    hideMemeEditorSection()
    initGallery()
}

