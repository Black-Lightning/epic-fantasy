function ReplaceContentInContainer(id,content) {
var container = document.getElementById(id);
container.innerHTML = content;
}

function ReplaceBookHeader(id,content) {
var container = document.getElementById(id);
container.innerHTML = content;
}

function change_pic(p) {
img = new Image();
img.src = p;
img.onload = function() {document.images._pimg.src = img.src};
}


function myFunc(id){



if (id=='Book1') {

var x = "<a href ='http://www.amazon.com/The- Birth- Hero- Amity- Blade/dp/1502394359/ref=tmm_pap_title_0', '_blank'><h1 align='center'>Buy Print</h1></a>"
var y = "<a href ='http://www.amazon.com/dp/B00NNWXGDK', '_blank'><h1 align='center'>Buy Digital</h1></a>"


} else if (id=='Book2') { 

var x = "<a href ='http://www.amazon.ca/Prophecy-Amity-Breanna-D-Leliever/dp/1517618509/ref=sr_1_2?ie=UTF8&qid=1445804839&sr=8-2&keywords=The+Prophecy%2Bthe+amity+blade'><h1 align='center'>Buy Print</h1></a>"
var y = "<a href ='http://www.amazon.ca/Prophecy-Amity-Blade-Charmaine-Mollison-ebook/dp/B0161V9IFY/ref=sr_1_1?ie=UTF8&qid=1444948611&sr=8-1&keywords=The+Prophecy+the+amity+blade'><h1 align='center'>Buy Digital</h1></a>"


} else if (id=='Book3') { 

var x= "<a href ='https://www.amazon.ca/Stolen-Power-Amity-Blade-LeLiever/dp/1539839044/ref=sr_1_2?ie=UTF8&qid=1478930048&sr=8-2&keywords=stolen+power+the+amity+blade'><h1 align='center'>Buy Print</h1></a>"
var y= "<a href ='https://www.amazon.ca/Stolen-Power-Amity-Charmaine-Mollison-ebook/dp/B01M9I8JAE/ref=sr_1_1?ie=UTF8&qid=1478930048&sr=8-1&keywords=stolen+power+the+amity+blade'><h1 align='center'>Buy Digital</h1></a>"

} else if (id=='Book4') {

var x = "<a href ='https://www.amazon.ca/When-Darkness-Falls-B-LeLiever/dp/1978087020/ref=sr_1_2?ie=UTF8&qid=1510447669&sr=8-2&keywords=the+amity+blade+when+darkness+falls&dpID=51opAmqCnYL&preST=_SY264_BO1,204,203,200_QL40_&dpSrc=srch'><h1 align='center'>Buy Print</h1></a>"
var y = "<a href ='https://www.amazon.com/When-Darkness-Falls-Amity-Blade-ebook/dp/B0768SH1LQ/ref=sr_1_1?s=digital-text&ie=UTF8&qid=1508045817&sr=1-1&keywords=the+amity+blade'><h1 align='center'>Buy Digital</h1></a>"


} else if (id=='Book5') { 

var x = "<a href ='https://www.amazon.com/Search-Seven-Amity-Blade/dp/172976794X/ref=sr_1_cc_2?s=aps&ie=UTF8&qid=1543474806&sr=1-2-catcorr&keywords=the+amity+blade'><h1 align='center'>Buy Print</h1></a>"
var y = "<a href ='https://www.amazon.com/Search-Seven-Amity-Blade-Book-ebook/dp/B07KMMVG9Q/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=1543474806&sr=1-2-catcorr'><h1 align='center'>Buy Digital</h1></a>"

    }
document.getElementById("PrintButton").innerHTML = x;
document. getElementById("DigitalButton").innerHTML = y;
}
