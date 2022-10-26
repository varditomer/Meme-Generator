'use strict'

const gElGallerySection = document.querySelector('.image-gallery')

function initGallery() {
    if (gElGallerySection.classList.contains('hide')) gElGallerySection.classList.remove('hide')
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
    gElGallerySection.classList.add('hide')
    switchToMemeEditor(idx)

}