'use strict'

const DETAILS_KEY = 'details'
const ID_KEY = 'id'

let gDetails;
let gId;

let gImgs = [{id: 1, url: 'img/003.jpg', keywords: ['hero']},
    {id: 2, url: 'img/004.jpg', keywords: ['dog']},
    {id: 3, url: 'img/005.jpg', keywords: ['baby']}
];

let gMeme = {
    selectedImgId: 1,
    selectedTxtIdx: 0,

    txts: [{line: 'I never eat Falafel',size: 20,align: 'left',color: 'red'}]
}



 
function getImgs(){
    return gImgs;
}
//////////////////////////////////
function getText(){
    return document.querySelector('#text').value;
}
////////////////////////////////////////


function findImgById(id){
    return gImgs.find((img) => { return img.id === id})
}


function saveId(id){
    gId = id;
    saveIdToStorage();
    window.open("./canvas.html","_self");
}


function onSubmit(ev){
    
    ev.preventDefault();
    var txt = getText();
    console.log(txt)

    gDetails = {txt}
    saveDetailsToStorage();
}





function saveIdToStorage() {
    saveToStorage(ID_KEY, gId)
}
function loadIdFromStorage() {
    return loadFromStorage(ID_KEY);
}


function saveDetailsToStorage() {
    saveToStorage(DETAILS_KEY, gDetails)
}
function loadDetailsFromStorage() {
    return loadFromStorage(DETAILS_KEY);
}


