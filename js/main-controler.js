'use strict'


function mainInit() {
    renderImages();
    upload();
}


function renderImages() {
    let imgs = getImgs();
    let strHTML = '';

    for (let i = 0; i < imgs.length; i++) {
        strHTML += `<div><img  class="meme" onclick="saveId(${imgs[i].id})" src="${imgs[i].url}"  alt="meme"></div>`
    }

    document.querySelector('.image-container').innerHTML = strHTML;
}

function renderYourMems() {
    let memes = getYourMems();
    let strHTML = '';
    for (let i = 0; i < memes.length; i++) {
        strHTML += `<div><img class="meme" src="${memes[i].url}" alt="meme"></div>`
    }
    document.querySelector('.image-container').innerHTML = strHTML;
}


function onFilterKeyword(keyword) {
    let imgs = filterImgsByKeyword(keyword)

    // let strHTML = imgs.map((img) => {
    //     return `<div><img class="meme" onclick="saveId(${img.id})" src="${img.url}"  alt="meme"></div>`
    // });

    // document.querySelector('.image-container').innerHTML = strHTML.join('');
    let strHTML = '';

    for (let i = 0; i < imgs.length; i++) {
        strHTML += `<div><img class="meme" onclick="saveId(${imgs[i].id})" src="${imgs[i].url}"  alt="meme"></div>`
    }

    document.querySelector('.image-container').innerHTML = strHTML;
}

function SearchMeme(name) {
    let imgs = filterImgsByname(name)
    let strHTML = '';

    // let strHTML = images.map((image) => {
    //     return `<div><img class="meme" onclick="saveId(${image.id})" src="${image.url}"  alt="meme"></div>`
    // })

    for (let i = 0; i < imgs.length; i++) {
        strHTML += `<div><img class="meme" onclick="saveId(${imgs[i].id})" src="${imgs[i].url}"  alt="meme"></div>`
    }

    document.querySelector('.image-container').innerHTML = strHTML;
    //document.querySelector('.image-container').innerHTML = strHTML.join('');
}




// function toggleMenu() {
//     var mainMenu = document.getElementById('mainMenu');
//     console.log(mainMenu);
//     mainMenu.classList.toggle('open');
// }