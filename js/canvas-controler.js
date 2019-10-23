'use strict'

let gCanvas;
let gCtx;

function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    renderImage();
    setTimeout(drawImg, 200)
    setInterval(() => {
        drawText(100, 100)
    }, 300);


}

function renderImage() {
    let id = loadIdFromStorage();
    let img = findImgById(id)
    console.log(id)
    let strHTML = `<img src="${img.url}" alt="meme">`;

    document.querySelector('.image-convas').innerHTML = strHTML;

}


function drawImg() {
    const img = document.querySelector('img');
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}


function drawText(x, y) {
    let details = loadDetailsFromStorage();
    let txt = details.txt;

    gCtx.beginPath();
    // gCtx.fillStyle = 'orange'
    // gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
    gCtx.fillStyle = '#ffffff'
    // gCtx.strokeStyle = 'green'
    //gCtx.lineWidth = 5
    gCtx.font = "40px impact Arial";
    gCtx.fillText(txt, x, y);
    gCtx.closePath();
    gCtx.strokeText(txt, x, y);
}

function onSetText(){
    let txt = document.querySelector('input').value;
    gMeme.txts[0].line = txt;
    setText()
    console.log(txt)   
}

function setText(){
    var txt = gMeme.txts[0].line;
    gCtx.beginPath();

    gCtx.fillStyle = '#ffffff'

    gCtx.font = "40px impact Arial";
    gCtx.fillText(txt, 100, 100);
    gCtx.closePath();
    gCtx.strokeText(txt, 100, 100);
}