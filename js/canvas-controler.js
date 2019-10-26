'use strict'

let gCanvas;
let gCtx;

function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    renderImage();
    setTimeout(drawImg, 100)
}

function renderImage() {
    let meme = loadMemeFromStorage();
    let id = meme.selectedImgId;
    let img = findImgById(id)
 
    let strHTML = `<img src="${img.url}" alt="meme">`;
    document.querySelector('.image-convas').innerHTML = strHTML;
}

function renderCanvas(){
    drawImg();
    setText(); 
}

function drawImg() {
    const img = document.querySelector('.image-convas img');
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function onSetText(){
    let txt = document.querySelector('.btn-container input').value;
    changeMemeTxt(txt)
    saveMemeToStorage()
    renderCanvas()  
}

function setText(){

    let meme = getMeme();
    let txts = meme.txts;
    txts.map((txt) => {
        gCtx.fillStyle = `${txt.color}`;
        gCtx.font = `${txt.size}px impact Arial`;
        gCtx.fillText(txt.line, txt.posX, txt.posY);
    })

}

function onMoveLineDown(){
    let meme = getMeme()
    meme.txts[meme.selectedTxtIdx].posY += 5;
    renderCanvas();
}

function onMoveLineUp(){
    let meme = getMeme()
    meme.txts[meme.selectedTxtIdx].posY -= 5;
    renderCanvas();
}

function onSwichLine(){
    let txts = getMeme().txts
    let tmpTxt = txts[0].line;
    txts[0].line = txts[1].line;
    txts[1].line = tmpTxt;
    renderCanvas();
}




function drawRect() {
    let y = getMemeTxts().posY;
    gCtx.rect(0, y-70, 550, 80)
    gCtx.fillStyle = 'rgba(255, 255, 255, 0.43)'
    gCtx.fillRect(0, y-70, 550, 80)

}


function onChangeColor(color){ 
    changeColor(color) 
    renderCanvas();
}
