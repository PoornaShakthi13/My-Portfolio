/*
* @Created by: Abhishek Ashinsa
* @Date: 08/10/2022
* @Project: My-Portfolio
* */

const itemCodeRegx = /^(I00-)[0-9]{1,3}$/;
const itemDescRegx = /^[A-z ]{4,}$/;
const itemPriceRegx = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;
const itemQtyRegx = /^[0-9]{1,3}$/;

let itemValidations = [];

itemValidations.push(
    {reg: itemCodeRegx, field: $("#itemCode"), error: 'Item Code Pattern is Wrong. (Ex : I00-001)'}
);

itemValidations.push(
    {reg: itemDescRegx, field: $("#Description"), error: 'Item Description Pattern is Wrong. (Ex : A-z, 4-20)'}
);

itemValidations.push(
    {reg: itemPriceRegx, field: $("#price"), error: 'Item Price Pattern is Wrong. (Ex : 100.00)'}
);


itemValidations.push(
    {reg: itemQtyRegx, field: $("#qty"), error: 'Item Quantity Pattern is Wrong. (Ex : 001)'}
);

function checkItemValidations (){
    let x = 0;
    for (let itemVal of itemValidations) {
        if (checkItem(itemVal.reg, itemVal.field)) {
            itemTextSuccess(itemVal.field, "");
        } else {
            x = x + 1;
            setItemErrorMessage(itemVal.field,itemVal.error);
        }
    }
    setItemSaveButtonValue(x);
}

function setItemSaveButtonValue(val) {
    if (val>0) {
        $("#btnSaveItem").attr('disabled',true)
    } else {
        $("#btnSaveItem").attr('disabled',false)
    }
}

function checkItem(reg, field) {
    let val = field.val();
    return reg.test(val) ? true : false
}

function setItemErrorMessage (field, error) {
    if (field.val().length <= 0) {
        field.css("border", "1px solid #ced4da")
        field.parent().children('span').text(error);
    } else {
        field.css("border", "2px solid red")
        field.parent().children('span').text(error);
    }
}

function itemTextSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        txtField.css("border", "1px solid #ced4da")
        txtField.parent().children('span').text(error);
    } else {
        txtField.css("border", "2px solid green")
        txtField.parent().children('span').text(error);
    }
}

function ItemTxtFieldFocus (textField) {
    textField.focus();
}

$("#itemCode,#Description,#price,#qty").on('keyup', function (event) {
    checkItemValidations();
})

$("#itemCode,#Description,#price,#qty").on('blur', function (event) {
    checkItemValidations();
})


$(window).on('keydown', function (event) {
    if (event.key == 'Tab') {
        event.preventDefault();
    }
});


$("#itemCode").on('keydown', function (event) {
    if (event.key == 'Enter' && checkItem(itemCodeRegx, $("#itemCode"))) {
        $("#Description").focus();
    } else {
        ItemTxtFieldFocus($("#itemCode"));
    }
});

$("#Description").on('keydown', function (event) {
    if (event.key == 'Enter' && checkItem(itemDescRegx, $("#Description"))) {
        ItemTxtFieldFocus($("#price"));
    }
});

$("#price").on('keydown', function (event) {
    if (event.key == 'Enter' && checkItem(itemPriceRegx, $("#price"))) {
        ItemTxtFieldFocus($("#qty"));
    }
});

$("#qty").on('keydown', function (event) {
    if (event.key == 'Enter' && checkItem(itemQtyRegx, $("#qty"))) {
        $("#btnSaveItem").click();
        $("#itemCode,#Description,#price,#qty").val("");
        $("#txtCustomerID").focus();
        checkItemValidations();
    }
});

var items = [];
$("#btnSaveItem").click(function () {

    let itemCode = $("#itemCode").val();
    let description = $("#Description").val();
    let itemPrice = $("#price").val();
    let itemQty = $("#qty").val();

    var item = {
        code: itemCode,
        description: description,
        price: itemPrice,
        qty: itemQty
    };

    items.push(item);
    console.log(items);
    loadAllItems();
    bindRowDetailsItem();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item has been saved',
        showConfirmButton: false,
        timer: 1500
    })
});

function loadAllItems(){
    $("#tblItem").empty();
    for(var item of items){
        console.log(item);

        var row = `<tr class='bg-dark text-light'><td>${item.code}</td><td>${item.description}</td><td>${item.price}</td><td>${item.qty}</td></tr>`;
        $("#tblItem").append(row);
    }
    bindRowDetailsItem();
}

function bindRowDetailsItem() {
    $('#tblItem>tr').click(function () {
        let code = $(this).children(":eq(0)").text();
        let desc = $(this).children(":eq(1)").text();
        let price = $(this).children(":eq(2)").text();
        let qty = $(this).children(":eq(3)").text();

        $("#inputCode").val(code);
        $("#inputDescription").val(desc);
        $("#inputPrice").val(price);
        $("#inputQty").val(qty);
    });
}

$("#txtItemSearch").on('keyup', function (event) {
    if (event.code == "Enter") {
        var id = $("#txtItemSearch").val();

        for(var item of items){
            if (id === item.code){
                $("#inputCode").val(item.code);
                $("#inputDescription").val(item.description);
                $("#inputPrice").val(item.price);
                $("#inputQty").val(item.qty);
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

$("#btnItemSearch").click(function () {
    var id = $("#txtItemSearch").val();

    for(var item of items){
        if (id === item.code){
            $("#inputCode").val(item.code);
            $("#inputDescription").val(item.description);
            $("#inputPrice").val(item.price);
            $("#inputQty").val(item.qty);
        } else {
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'ID or Name Not at the database, Try again!',
            // });
        }
    }

});

function searchItem(code) {
    for (let item of items) {
        if (item.code === code) {
            return item
        }
    }
    return null;
}


function updateItem (itemCode) {
    let item = searchItem(itemCode);

    if (item != null) {
        item.code = $("#inputCode").val();
        item.description = $("#inputDescription").val();
        item.price = $("#inputPrice").val();
        item.qty = $("#inputQty").val();
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

$("#btnUpdateItem").click(function () {

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You Want to update this item?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
    }).then((result) => {
        if (result.isConfirmed) {
            let itemCode = $("#inputCode").val();
            updateItem(itemCode);
            $("#inputCode,#inputDescription,#inputPrice,#inputQty").val("");
            Swal.fire(
                'Updated!',
                'Your file has been updated.',
                'success'
            )
        }
    })
});

function deleteItem(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        let indexNumber = items.indexOf(item);
        items.splice(indexNumber, 1);
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

$("#btnDeleteItem").click(function () {

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You Want to delete this item?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            let itemCode = $("#inputCode").val();
            deleteItem(itemCode);
            $("#inputCode,#inputDescription,#inputPrice,#inputQty").val("");
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
})