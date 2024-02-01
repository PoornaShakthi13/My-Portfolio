/*
* @Created by: Abhishek Ashinsa
* @Date: 08/10/2022
* @Project: My-Portfolio
* */

document.getElementById("customerContent").style.display='none';
document.getElementById("ItemsContent").style.display='none';
document.getElementById("OrderContent").style.display='none';
document.getElementById("detailsContent").style.display='none';

document.getElementById("dashboardBtn").addEventListener("click" ,function () {
    document.getElementById("DashboardContent").style.display='block';
    document.getElementById("customerContent").style.display='none';
    document.getElementById("ItemsContent").style.display='none';
    document.getElementById("OrderContent").style.display='none';
    document.getElementById("detailsContent").style.display='none';
});

document.getElementById("customerBtn").addEventListener("click" ,function () {
    document.getElementById("DashboardContent").style.display='none';
    document.getElementById("customerContent").style.display='block';
    document.getElementById("ItemsContent").style.display='none';
    document.getElementById("OrderContent").style.display='none';
    document.getElementById("detailsContent").style.display='none';
});

document.getElementById("itemBtn").addEventListener("click" ,function () {
    document.getElementById("DashboardContent").style.display='none';
    document.getElementById("customerContent").style.display='none';
    document.getElementById("ItemsContent").style.display='block';
    document.getElementById("OrderContent").style.display='none';
    document.getElementById("detailsContent").style.display='none';
});

document.getElementById("ordersBtn").addEventListener("click" ,function () {
    document.getElementById("DashboardContent").style.display='none';
    document.getElementById("customerContent").style.display='none';
    document.getElementById("ItemsContent").style.display='none';
    document.getElementById("OrderContent").style.display='block';
    document.getElementById("detailsContent").style.display='none';
});

document.getElementById("detailsBtn").addEventListener("click" ,function () {
    document.getElementById("DashboardContent").style.display='none';
    document.getElementById("customerContent").style.display='none';
    document.getElementById("ItemsContent").style.display='none';
    document.getElementById("OrderContent").style.display='none';
    document.getElementById("detailsContent").style.display='block';
});