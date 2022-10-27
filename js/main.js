'use strict'

function init() {
    initGallery()
}

function switchToMemeEditor(imgIdx) {
    document.querySelector('.main-nav ul .gallery').classList.remove('active')
    initMeme(imgIdx)
}

function onGalleryClicked() {
    hideMemeEditorSection()
    document.querySelector('.main-nav ul .gallery').classList.add('active')
    initGallery()
}


