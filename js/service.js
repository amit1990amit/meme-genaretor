'use strict'



const MEME_KEY = 'meme';
const FINSHED_MEMES_KEY = 'images';



let gFinshedMems;

let gImgs = [{ id: 1, url: 'img/003.jpg',name: 'king', keywords: ['king'] },
{ id: 2, url: 'img/004.jpg',name:'dog', keywords: ['dog'] },
{ id: 3, url: 'img/005.jpg',name:'baby', keywords: ['baby'] },
{ id: 4, url: 'img/X-Everywhere.jpg',name:'toy', keywords: ['toy'] },
{ id: 5, url: 'img/putin.jpg',name:'polition', keywords: ['polition'] },
{ id: 6, url: 'img/img4.jpg',name:'king2', keywords: ['king'] },
{ id: 7, url: 'img/leo.jpg',name:'leo', keywords: ['leo'] },
];

let gMeme;

function upload() {
    gMeme = loadMemeFromStorage();
    gFinshedMems = loadFinshedMemsFromStorage();

    if(!gFinshedMems){
        gFinshedMems = []
    }

    if (!gMeme) {
        gMeme = {
            selectedImgId: 1,
            selectedTxtIdx: 0,

            txts: [{ line: 'I never eat Falafel', size: 20, align: 'left', color: 'white', posX: 100, posY: 100 },
            { line: '', size: 20, align: 'left', color: 'white', posX: 100, posY: 500 }]
        }
    }
}

function getImgs() {
    return gImgs;
}

function getMeme() {
    return gMeme;
}

function getYourMems(){
    return gFinshedMems;
}

function findImgById(id) {
    return gImgs.find((img) => { return img.id === id })
}

function saveId(id) {
    gMeme.selectedImgId = id;
    saveMemeToStorage();
    window.open("./canvas.html", "_self");
}

function onIncrease() {
    gMeme.txts[gMeme.selectedTxtIdx].size += 5;
    saveMemeToStorage();
    renderCanvas();
}

function onDecrease() {
    gMeme.txts[gMeme.selectedTxtIdx].size -= 5;
    saveMemeToStorage();
    renderCanvas();
}

function onUp() {
    let len = gMeme.txts.length;
    gMeme.selectedTxtIdx++;
    if (gMeme.selectedTxtIdx >= len) gMeme.selectedTxtIdx = len - 1;
    saveMemeToStorage();
    drawRect()
}

function onDown() {
    
    gMeme.selectedTxtIdx--;
    if (gMeme.selectedTxtIdx <= 0) gMeme.selectedTxtIdx = 0;
    saveMemeToStorage();
    drawRect()
}

function changeMemeTxt(txt) {
    gMeme.txts[gMeme.selectedTxtIdx].line = txt;
    saveMemeToStorage()

}

function getMemeTxts() {
    return gMeme.txts[gMeme.selectedTxtIdx];
}

function onAddIcon(icon) {
    console.log(icon)
    let txt = getMemeTxts();
    txt.line += icon;
    saveMemeToStorage();
    renderCanvas();
}

function changeColor(color) {
    let txt = getMemeTxts()
    txt.color = color;
    saveMemeToStorage();
}

function filterImgsByKeyword(keyword) {
    let filterdImgs = gImgs.filter(function (img) {
        for (var i = 0; i < img.keywords.length; i++) {
            if(img.keywords[i] === keyword) return img;
            
        }
    })
    return filterdImgs;
}


function filterImgsByname(name) {
    
    var myRe = new RegExp('^' + `${name}`, 'i');
    let filterdImgs = gImgs.filter(function (img) {
        for (var i = 0; i < img.name.length; i++) {
            return myRe.exec(img.keywords[i]);
        }
    })
    return filterdImgs;
}

function onSubmit(ev){
    ev.preventDefault()
    let name = document.querySelector('#meme-name').value;
    console.log(name)
    SearchMeme(name);   
}


function saveMemeToStorage() {
    saveToStorage(MEME_KEY, gMeme)
}
function loadMemeFromStorage() {
    return loadFromStorage(MEME_KEY);
}

function saveFinshedMemsToStorage(){
    saveToStorage(FINSHED_MEMES_KEY,gFinshedMems)
}

function loadFinshedMemsFromStorage(){
    return loadFromStorage(FINSHED_MEMES_KEY);
}



/////////////////////////////////////////////////////////////

// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <button><a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a></button>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);

    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            return response.text()
        })

        .then(onSuccess)
        .catch(function (error) {
            console.error(error)
        })
}

// facebook api
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));









