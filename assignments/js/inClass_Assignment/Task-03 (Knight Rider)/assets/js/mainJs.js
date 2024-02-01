/*
* @Created by: Abhishek Ashinsa
* @Date: 06/11/2022
* @Project: My-Portfolio
* */
//
// var colorsSet = ["#eeaaaa","#ea4f4f","#f60000"];
//
// $("#btnStart").click(function () {
//     // setInterval(runFirstBox,200)
//     // setInterval(runSecondBox,200)
//     // setInterval(runThirdBox,200)
//     // setInterval(runFourthBox,200)
//     // setInterval(runFifthBox,200)
//
//     setInterval(runColors,300)
//
//     // setInterval(runFirstBoxS,200)
//     // setInterval(runSecondBoxS,200)
//     // setInterval(runThirdBoxS,200)
//     // setInterval(runFourthBoxS,200)
//     // setInterval(runFifthBoxS,200)
// })
// var i = 0;
// var j = 0;
// function runColors() {
//     $("#mainDiv").each(function (i, obj) {
//         $(this).obj.css('background-color', colorsSet[j])
//         j++;
//         i++;
//         obj++;
//     })
// }



// var i = 0;
// function runFirstBox() {
//     $("#mainDiv>div:nth-child(1)").css('background-color', colorsSet[i]);
//     i++;
//     if (i==colorsSet.length){
//         i=0;
//     }
// }
//
// var j = 1;
// function runSecondBox() {
//     $("#mainDiv>div:nth-child(2)").css('background-color', colorsSet[j]);
//     j++;
//     if (j==colorsSet.length){
//         j=0;
//     }
// }
//
// var k = 2;
// function runThirdBox() {
//     $("#mainDiv>div:nth-child(3)").css('background-color', colorsSet[k]);
//     k++;
//     if (k==colorsSet.length){
//         k=0;
//     }
// }

// var l = 0;
// function runFourthBox() {
//     $("#mainDiv>div:nth-child(4)").css('background-color', colorsSet[l]);
//     l++;
//     if (l==colorsSet.length){
//         l=0;
//     }
// }
//
// var m = 1;
// function runFifthBox() {
//     $("#mainDiv>div:nth-child(5)").css('background-color', colorsSet[m]);
//     m++;
//     if (m==colorsSet.length){
//         m=0;
//     }
// }

///////////////////////////////////////////////////////////////////////

// var a = 4;
// function runFirstBoxS() {
//     $("#mainDiv>div:nth-child(1)").css('background-color', colorsSet[a]);
//     a--;
//     if (a==colorsSet.length){
//         a=0;
//     }
// }
//
// var b = 3;
// function runSecondBoxS() {
//     $("#mainDiv>div:nth-child(2)").css('background-color', colorsSet[b]);
//     b--;
//     if (b==colorsSet.length){
//         b=0;
//     }
// }
//
// var c = 2;
// function runThirdBoxS() {
//     $("#mainDiv>div:nth-child(3)").css('background-color', colorsSet[c]);
//     c--;
//     if (c==colorsSet.length){
//         c=0;
//     }
// }
//
// var d = 1;
// function runFourthBoxS() {
//     $("#mainDiv>div:nth-child(4)").css('background-color', colorsSet[d]);
//     d--;
//     if (d==colorsSet.length){
//         d=0;
//     }
// }
//
// var e = 0;
// function runFifthBoxS() {
//     $("#mainDiv>div:nth-child(5)").css('background-color', colorsSet[e]);
//     e--;
//     if (e==colorsSet.length){
//         e=0;
//     }
// }

var knightRider = {
    count:0,
    tmArr : [],
    leftArr : ["white","white","white","white","white","white","#ffe3e3","#fab5b5","#ee9797","#f17272","#ef2d2d","#ff0000"],
    rightArr : ["white","white","white","white","white","white","#ff0000","#ef2d2d","#f17272","#ee9797","#fab5b5","#ffe3e3"],
    animateLeft: function () {
        var lastColor = this.tmArr.pop()
        this.tmArr.unshift(lastColor);
    },
    animateRight: function () {
        var firstColor = this.tmArr.shift()
        this.tmArr.push(firstColor)
    },
    animate: function () {
        this.count++;
        if (this.count <= this.leftArr.length) {
            this.tmArr = this.leftArr
            this.animateLeft();
        } else {
            if (this.count >= (this.rightArr.length*2)){
                this.count=0;
            }
            this.tmArr = this.rightArr;
            this.animateRight();
        }
    }
}

makeDivs();

function makeDivs() {
    $("#mainDiv").empty();
    for (let i = 0; i < (knightRider.tmArr.length) / 2; i++) {
        $('#mainDiv').append(`<div style="background-color: ${knightRider.tmArr[i]}"></div>`);
    }
    knightRider.animate();
}

var id=setInterval(makeDivs, 90);


$("#btnStart").click(function (){
    clearInterval(id);
    id=setInterval(makeDivs, 90);
    console.log("ID when Start btn Called",id)
});

$("#btnEnd").click(function (){
    clearInterval(id);
    console.log("ID when End Btn Called",id)
});
