'use strict'
// main controller: handle switching between the sections and everything beside gallery&meme sections

function init() {
    initGallery()
}

function switchToMemeEditor(imgIdx) {
    initMeme(imgIdx)
}

function onNavToGallery() {
    hideMemeEditorSection()
    markGalleryNavLink()
    showGallerySection()
    initGallery()
}


