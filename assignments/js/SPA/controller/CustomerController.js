/*
* @Created by: Abhishek Ashinsa
* @Date: 10/10/2022
* @Project: My-Portfolio
* */

const cIdRegx = /^(C00-)[0-9]{1,3}$/;
const cNameRegx = /^[A-z ]{5,20}$/;
const cAddressRegx = /^[0-9/A-z .,]{7,}$/;
const cContactRegx = /^(070|071|072|075|076|077|078|027)[0-9]{7}$/;

let custValidaations = []

custValidaations.push(
    {reg: cIdRegx, field: $("#txtCustomerID"), error: 'Customer ID Pattern is Wrong. (Ex : C00-001)'}
);

custValidaations.push(
    {reg: cNameRegx, field: $("#txtCustomerName"), error: 'Customer Name Pattern is Wrong. (Ex : A-z, 5-20)'}
);

custValidaations.push(
    {reg: cAddressRegx, field: $("#txtCustomerAddress"), error: 'Customer Address Pattern is Wrong. (Ex : A-z 0-9)'}
);


custValidaations.push(
    {reg: cAddressRegx, field: $("#txtCustomerContact"), error: 'Customer Contact Pattern is Wrong. (Ex : 07X XXX XX XX)'}
);

function checkValidations (){
    let x = 0;
    for (let val of custValidaations) {
        if (check(val.reg, val.field)) {
            textSuccess(val.field, "");
        } else {
            x = x + 1;
            setErrorMessage(val.field,val.error);
        }
    }
    setButtonValue(x);
}

function setButtonValue(val) {
    if (val>0) {
        $("#btnSaveCustomer").attr('disabled',true)
    } else {
        $("#btnSaveCustomer").attr('disabled',false)
    }
}

function check(reg, field) {
    let val = field.val();
    return reg.test(val) ? true : false
}

function setErrorMessage (field, error) {
    if (field.val().length <= 0) {
        field.css("border", "1px solid #ced4da")
        field.parent().children('span').text(error);
    } else {
        field.css("border", "2px solid red")
        field.parent().children('span').text(error);
    }
}

function textSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        txtField.css("border", "1px solid #ced4da")
        txtField.parent().children('span').text(error);
    } else {
        txtField.css("border", "2px solid green")
        txtField.parent().children('span').text(error);
    }
}

function txtFieldFocus (textField) {
    textField.focus();
}


$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").on('keyup', function (event) {
    checkValidations();
})

$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").on('blur', function (event) {
    checkValidations();
})

$(window).on('keydown', function (event) {
    if (event.key == 'Tab') {
        event.preventDefault();
    }
});


$("#txtCustomerID").on('keydown', function (event) {
    if (event.key == 'Enter' && check(cIdRegx, $("#txtCustomerID"))) {
        $("#txtCustomerName").focus();
    } else {
        txtFieldFocus($("#txtCustomerID"));
    }
});

$("#txtCustomerName").on('keydown', function (event) {
    if (event.key == 'Enter' && check(cNameRegx, $("#txtCustomerName"))) {
        txtFieldFocus($("#txtCustomerAddress"));
    }
});

$("#txtCustomerAddress").on('keydown', function (event) {
    if (event.key == 'Enter' && check(cAddressRegx, $("#txtCustomerAddress"))) {
        txtFieldFocus($("#txtCustomerContact"));
    }
});

$("#txtCustomerContact").on('keydown', function (event) {
    if (event.key == 'Enter' && check(cContactRegx, $("#txtCustomerContact"))) {
        $("#btnSaveCustomer").click();
        $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").val("");
        $("#txtCustomerID").focus();
        checkValidations();
    }
});



var customers = [];
$("#btnSaveCustomer").click(function () {

    let customerID = $("#txtCustomerID").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerContact = $("#txtCustomerContact").val();

    var customer = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        contact: customerContact
    };

    // console.log(customer.id+ " "+ customer.name+ " " + customer.address+ " " + customer.contact)
    customers.push(customer);
    console.log(customers);
    loadAllCustomers();
    bindRowDetails();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Customer has been saved',
        showConfirmButton: false,
        timer: 1500
    })
});

function bindRowDetails() {
    $('#tblCustomer>tr').click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let contact = $(this).children(":eq(3)").text();
        console.log(id+" "+name+" "+address+" "+contact);

        $("#updateID").val(id);
        $("#updateName").val(name);
        $("#updateAddress").val(address);
        $("#updateContact").val(contact);
    });
}

function loadAllCustomers(){
    $("#tblCustomer").empty();
    for(var customer of customers){
        console.log(customer);

        var row = `<tr class='bg-dark text-light'><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
        $("#tblCustomer").append(row);
    }
    bindRowDetails();
}


$("#txtSearch").on('keyup', function (event) {
    if (event.code == "Enter") {
        var id = $("#txtSearch").val();

        for(var customer of customers){
            if (id === customer.id || id === customer.name){
                $("#txtSearchName").val(customer.name);
                $("#txtSearchAddress").val(customer.address);
                $("#txtSearchContact").val(customer.contact);
            } else {
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: 'ID or Name Not at the database, Try again!',
                // });
            }
        }
    }
});

$("#btnSearch").click(function () {
    var id = $("#txtSearch").val();

    for(var customer of customers){
        if (id === customer.id || id === customer.name){
            $("#txtSearchName").val(customer.name);
            $("#txtSearchAddress").val(customer.address);
            $("#txtSearchContact").val(customer.contact);
        } else {
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'ID or Name Not at the database, Try again!',
            // });
        }
    }

});

$("#cmbCustomerId").click(function () {
    loadAllCustomerIds();
});

function searchCustomer(cusID) {
    for (let customer of customers) {
        if (customer.id === cusID) {
            return customer
        }
    }
    return null;
}


function updateCustomer (cId) {
    let customer = searchCustomer(cId);

    if (customer != null) {
        customer.id = $("#updateID").val();
        customer.name = $("#updateName").val();
        customer.address = $("#updateAddress").val();
        customer.contact = $("#updateContact").val();
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

$("#btnUpdateCustomer").click(function () {

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You Want to update this customer?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
    }).then((result) => {
        if (result.isConfirmed) {

            let customerID = $("#updateID").val();
            updateCustomer(customerID);
            $("#updateID,#updateName,#updateAddress,#updateContact").val("");
            Swal.fire(
                'Updated!',
                'Your file has been updated.',
                'success'
            )
        }
    })

});

function deleteCustomer(cusId) {
    let customer = searchCustomer(cusId);
    if (customer != null) {
        let indexNumber = customers.indexOf(customer);
        customers.splice(indexNumber, 1);
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

$("#btnDeleteCustomer").click(function () {


    Swal.fire({
        title: 'Are you sure?',
        text: "Do You Want to delete this customer?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            let customerID = $("#updateID").val();
            deleteCustomer(customerID);
            $("#updateID,#updateName,#updateAddress,#updateContact").val("");
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })

})

