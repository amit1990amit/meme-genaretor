'use strict'



const MEME_KEY = 'meme'



let gImgs = [{ id: 1, url: 'img/003.jpg',name: 'king', keywords: ['king'] },
{ id: 2, url: 'img/004.jpg',name:'dog', keywords: ['dog'] },
{ id: 3, url: 'img/005.jpg',name:'baby', keywords: ['baby'] },
{ id: 4, url: 'img/X-Everywhere.jpg',name:'toy', keywords: ['toy'] },
{ id: 5, url: 'img/putin.jpg',name:'polition', keywords: ['polition'] },
{ id: 6, url: 'img/img4.jpg',name:'king2', keywords: ['king'] },
{ id: 7, url: 'img/leo.jpg',name:'leo', keywords: ['leo'] },
];

let gMeme;

upload();

function upload() {
    gMeme = loadMemeFromStorage();

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


function findImgById(id) {
    return gImgs.find((img) => { return img.id === id })
}


function saveId(id) {
    gMeme.selectedImgId = id;
    saveMemeToStorage();
    window.open("./canvas.html", "_self");
}





function saveMemeToStorage() {
    saveToStorage(MEME_KEY, gMeme)
}
function loadMemeFromStorage() {
    return loadFromStorage(MEME_KEY);
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











