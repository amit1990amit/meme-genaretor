'use strict'


function mainInit(){
    renderImages();
}


function renderImages(){
    let imgs = getImgs();
    let strHTML = '';

    for(let i = 0; i < imgs.length; i++){
        strHTML += `<img onclick="saveId(${imgs[i].id})" src="${imgs[i].url}"  alt="meme">`
    }

    document.querySelector('.image-container').innerHTML = strHTML;
    
}