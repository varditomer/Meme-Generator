'use strict'

let gElGallerySection //el gallerySection

function initGallery() {
    // Init Selectors
    gElGallerySection = document.querySelector('.image-gallery')
    
    // resizeKeyWords()
    renderGallery()
}

function renderGallery() {
    const imgs = getImgs()
    let strHtmls = imgs.map((img, idx) => `                
        <div onclick="onImgSelected(${idx})">
            <img src="${img.url}" alt="">
        </div>
        `
    ).join('')

    gElGallerySection.querySelector('.image-gallery-area').innerHTML = strHtmls
}

function onImgSelected(idx) {
    hideGallerySection()
    unmarkGalleryNavLink()
    switchToMemeEditor(idx)
}

function resizeKeyWords() {
    gKeywordSearchCountMap = getgKeywordSearchCountMap
    //Todo: replace key words from hard coded in html to rendom function with font size by the count map
}

// Hide gallery section and unmark gallery's nav link
function hideGallerySection() {
    gElGallerySection.classList.add('hide')
}

function unmarkGalleryNavLink() {
    document.querySelector('.main-nav ul .gallery').classList.remove('active')
}

function markGalleryNavLink() {
    document.querySelector('.main-nav ul .gallery').classList.add('active')
}