'use strict'


function mainInit() {
    renderImages();
}


function renderImages() {
    let imgs = getImgs();
    let strHTML = '';

    for (let i = 0; i < imgs.length; i++) {
        strHTML += `<div><img class="meme" onclick="saveId(${imgs[i].id})" src="${imgs[i].url}"  alt="meme"></div>`
    }

    document.querySelector('.image-container').innerHTML = strHTML;
}


function onFilterKeyword(keyword) {
    let imgs = filterImgsByKeyword(keyword)
    let strHTML = '';

    for (let i = 0; i < imgs.length; i++) {
        strHTML += `<div><img class="meme" onclick="saveId(${imgs[i].id})" src="${imgs[i].url}"  alt="meme"></div>`
    }

    document.querySelector('.image-container').innerHTML = strHTML;
}

function SearchMeme(name) {
    let imgs = filterImgsByname(name)
    let strHTML = '';

    for (let i = 0; i < imgs.length; i++) {
        strHTML += `<div><img class="meme" onclick="saveId(${imgs[i].id})" src="${imgs[i].url}"  alt="meme"></div>`
    }

    document.querySelector('.image-container').innerHTML = strHTML;
}


// function toggleMenu() {
//     var mainMenu = document.getElementById('mainMenu');
//     console.log(mainMenu);
//     mainMenu.classList.toggle('open');
// }