'use strict'

function init() {
    initGallery()
}

function switchToMemeEditor(imgIdx) {
    initMeme(imgIdx)
}

function onGalleryClicked() {
    hideMemeEditorSection()
    initGallery()
}

