'use strict'
let isMouseDown;
let gCanvas;
let gCtx;

function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    upload();
    renderImage();
    setTimeout(drawImg, 100)
}

function renderImage() {
    let meme = loadMemeFromStorage();
    let id = meme.selectedImgId;
    let img = findImgById(id)

    let strHTML = `<img class="selected-img" src="${img.url}" alt="meme">`;
    document.querySelector('.image-convas').innerHTML = strHTML;
}

function renderCanvas() {
    drawImg();
    setText();
}

function drawImg() {
    const img = document.querySelector('.image-convas img');
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function onSetText() {
    let txt = document.querySelector('.btn-container input').value;
    changeMemeTxt(txt)
    renderCanvas()
}

function setText() {
    let meme = getMeme();
    let txts = meme.txts;
    txts.map((txt) => {
        gCtx.fillStyle = `${txt.color}`;
        gCtx.font = `${txt.size}px impact Arial`;
        gCtx.fillText(txt.line, txt.posX, txt.posY);
    })

}

function onMoveLine(hrz){
    let meme = getMeme()
    meme.txts[meme.selectedTxtIdx].posY += hrz;
    renderCanvas(); 
}

function onMoveLineDown() {
    let meme = getMeme()
    meme.txts[meme.selectedTxtIdx].posY += 5;
    renderCanvas();
}

function onMoveLineUp() {
    let meme = getMeme()
    meme.txts[meme.selectedTxtIdx].posY -= 5;
    renderCanvas();
}

function onSwichLine() {
    let txts = getMeme().txts
    let tmpTxt = txts[0].line;
    txts[0].line = txts[1].line;
    txts[1].line = tmpTxt;
    renderCanvas();
}

function drawRect() {
    let txt = getMemeTxts();
    let y = getMemeTxts().posY;
    let x = getMemeTxts().posX;
    let width = gCtx.measureText(txt.line).width;

    //gCtx.rect(x, y - 70, 80)
    gCtx.fillStyle = 'rgba(255, 255, 255, 0.43)'

    gCtx.fillRect(x, y - 70, width, 80)

}

function onChangeColor(color) {
    changeColor(color)
    renderCanvas();
}

function onSaveImg(elLink) {
    let memes = getYourMems();
    console.log(imgContent);
    var imgContent = gCanvas.toDataURL('image/jpeg');
    memes.push({ url: imgContent });
    saveFinshedMemsToStorage();

}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}
/////////////////////////////////////////////////////////////////////////

function onMouseDown(ev) {
    console.log(ev)
    isMouseDown = true;
}

function onMouseUp(ev) {
    console.log(ev)
    isMouseDown = false;
}



function handleMouse(ev) {
    let currTxt = getMemeTxts();
    if (isMouseDown) {
        //console.log(ev.offsetY, ev.offsetX)
        if (isOnText(ev)) {
            currTxt.posY = ev.offsetY
            currTxt.posX = ev.offsetX
            renderCanvas();
        }
        console.log(isOnText(ev))
    }

    // const elDiv = ev.target
    // elDiv.innerText = elDiv.innerText + '\n' + ev.type
}

function isOnText(ev) {
    var txt = getMemeTxts()
    let y = txt.posY;
    let x = txt.posX;
    let width = gCtx.measureText(txt.line).width
    //let height = gCtx.measureText(txt.line).height
    //console.log('width',width)
    if (ev.offsetY > y - 70 && ev.offsetY < y + 10 && ev.offsetX > x - 5 && ev.offsetX < x + width + 5) return true;
    return false;

}

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 

// function onImgInput(ev) {
//     //loadImageFromInput(ev, renderCanvas)
//     var elImg = document.querySelector('.file-input');
//     let reader = new FileReader();
//     reader.onload = () => {
//         console.log(reader.result)
//     }

  
//     reader.readAsDataURL(ev.target.files[0]);
// }

function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}
function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();
    
    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}


// // The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
// function onImgInput(ev) {
//     loadImageFromInput(ev, renderCanvas)
// }
// function loadImageFromInput(ev, onImageReady) {
//     document.querySelector('.share-container').innerHTML = ''
//     var reader = new FileReader();
    
//     reader.onload = function (event) {
//         var img = new Image();
//         img.onload = onImageReady.bind(null, img)
//         img.src = event.target.result;
//     }
//     reader.readAsDataURL(ev.target.files[0]);
// }