'use strict'

var gImgs = [
    {
        id: 0,
        url: './images/meme-imgs (square)/0.jpg',
        keywords: ['trump', 'politics'],
        alt: 'trump'
    },
    {
        id: 1,
        url: './images/meme-imgs (square)/1.jpg',
        keywords: ['animal', 'dog', 'puppies'],
        alt: 'cute puppies'
    },
    {
        id: 2,
        url: './images/meme-imgs (square)/2.jpg',
        keywords: ['animal', 'baby', 'dog', 'sleep'],
        alt: 'cute sleeping baby and dog'
    },
    {
        id: 3,
        url: './images/meme-imgs (square)/3.jpg',
        keywords: ['animal', 'sleep', 'cat'],
        alt: 'cat on computer'
    },
    {
        id: 4,
        url: './images/meme-imgs (square)/4.jpg',
        keywords: ['funny', 'yeah', 'baby'],
        alt: 'baby with serious face'
    },
    {
        id: 5,
        url: './images/meme-imgs (square)/5.jpg',
        keywords: ['you know it', 'hands'],
        alt: 'you know it',
    },
    {
        id: 6,
        url: './images/meme-imgs (square)/6.jpg',
        keywords: ['baby', 'surprise', 'funny'],
        alt: 'baby looks surprised'
    },
    {
        id: 7,
        url: './images/meme-imgs (square)/7.jpg',
        keywords: ['chocolate', 'film'],
        alt: `charlie's chocolate factory`
    },
    {
        id: 8,
        url: './images/meme-imgs (square)/8.jpg',
        keywords: ['funny', 'baby', 'hands'],
        alt: 'funny baby'
    },
    {
        id: 9,
        url: './images/meme-imgs (square)/9.jpg',
        keywords: ['obama', 'politics'],
        alt: 'obama'
    },
    {
        id: 10,
        url: './images/meme-imgs (square)/10.jpg',
        keywords: ['sport', 'basketball', 'kiss'],
        alt: 'basketball players kissing'
    },
    {
        id: 11,
        url: './images/meme-imgs (square)/11.jpg',
        keywords: ['tv', 'haim', 'hands'],
        alt: 'haim heht'
    },
    {
        id: 12,
        url: './images/meme-imgs (square)/12.jpg',
        keywords: ['leonardo dicaprio', 'film', 'actor', 'wolf of wall street', 'hands'],
        alt: 'leonardo dicaprio wolf of wall street'
    },
    {
        id: 13,
        url: './images/meme-imgs (square)/13.jpg',
        keywords: ['film', 'actor', 'matrix'],
        alt: 'matrix'
    },
    {
        id: 14,
        url: './images/meme-imgs (square)/14.jpg',
        keywords: ['tv', 'game of throne', 'actor'],
        alt: 'game of throne'
    },
    {
        id: 15,
        url: './images/meme-imgs (square)/15.jpg',
        keywords: ['film', 'actor', 'hands'],
        alt: 'film'
    },
    {
        id: 16,
        url: './images/meme-imgs (square)/16.jpg',
        keywords: ['vladimir putin', 'politics', 'hands'],
        alt: 'vladimir putin'
    },
    {
        id: 17,
        url: './images/meme-imgs (square)/17.jpg',
        keywords: ['toy story', 'film', 'hands'],
        alt: 'toy story'
    },
]
var gDeepCopyGImgs = JSON.parse(JSON.stringify(gImgs))

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function setFilterBy(filterBy) {
    gImgs = JSON.parse(JSON.stringify(gDeepCopyGImgs))
    gImgs = gImgs.filter((img) => img.keywords.some(keyword => keyword.includes(filterBy)))
}

// Getteres
function getImgs() {
    return gImgs
}

function getImgUrl(imgIdx) {
    const img = gImgs.find(img => img.id === imgIdx)
    return img.url
}

function getgKeywordSearchCountMap() {
    return gKeywordSearchCountMap
}