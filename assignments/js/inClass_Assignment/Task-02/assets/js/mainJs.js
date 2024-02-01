/*
* @Created by: Abhishek Ashinsa
* @Date: 05/11/2022
* @Project: My-Portfolio
* */

var colorsSet = ["red", "pink", "orange", "yellow", "green", "blue", "purple", "brown"];
//
// var namesArr = ["Kamal", "Nimal", "Sunil"];
//
// function seetNames() {
//
// }
//
function setColors() {
    $("#cmbColors").append(`<option></option>`);
    for (let i = 0; i <colorsSet.length ; i++) {
        $("#cmbColors").append(`<option>${colorsSet[i]}</option>`);
    }
}
setColors();
//
// $("#cmbColors").on('change', function () {
//     var color = $(this).val();
// })
//
// var count = 0;
// var color;
// function changeColor() {
//     $("#boxOne").css('background-color', colorsSet[count]);
//     count++;
//     $("#boxTwo").css('background-color', colorsSet[count]);
//     count++;
//     $("#boxThree").css('background-color', colorsSet[count]);
//     count++;
//     if (count==colorsSet.length){
//         count=0;
//     }
// }
//
// $("#startQueue").click(function () {
//     setInterval(changeColor,500)
// })

var queDetails = {
    names: [
        {name: "nimal", color: "red"},
        {name: "kamal", color: "pink"},
        {name: "sunil", color: "orange"}
    ],

    nextName:function () {
        var lastValue = this.names.pop()
        this.names.unshift(lastValue);
    }
}


function setDivData() {
    $("#content").empty();

    for (let i = 0; i <queDetails.names.length ; i++) {
        $("#content").append(`<div style="background-color: ${queDetails.names[i].color}"><h3>${queDetails.names[i].name}</h3></div>`)
    }
    queDetails.nextName()
}

setInterval(setDivData,500)

$("#startQueue").click(function () {
    var pName = $("#txtName").val();
    var pColor = $("#cmbColors").val();
    var person = {name:pName, color:pColor};
    queDetails.names.unshift(person)
})