// get all id

let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let creatBtn =document.getElementById("createBtn")
let search =document.getElementById("search")
let searchTitle =document.getElementById("searchTitle")
let searchCategory =document.getElementById("searchCategory")
let delete_all = document.getElementById("deleteAll")


let submitmode = 'Create'
let indexForUpadte = 0;


//get total
function getTotal(){
    total.innerHTML =  +price.value + +taxes.value + +ads.value - +discount.value
    if(total.innerHTML > 0 || total.innerHTML === "" ){
        total.style.backgroundColor = "green"
    }else{
        total.style.backgroundColor = "red"
    }
}


let dataProduct;

//localstorage
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct = []
}

//create & update button

creatBtn.onclick = function(e){
    if(title.value === '' || price.value === '' || taxes.value === '' || category.value === ''){
        if(title.value === ''){
        title.style.border="2px solid red";
        }else if(price.value === ''){
            price.style.border="2px solid red";
            title.style.border="transparent";
        }else if(taxes.value === ''){
            taxes.style.border="2px solid red";
            price.style.border="transparent";
            title.style.border="transparent";
        }else if(category.value === ''){
            category.style.border="2px solid red";
            taxes.style.border="transparent";
            price.style.border="transparent";
            title.style.border="transparent";
        }else{
            title.style.border="transparent";
            price.style.border="transparent";
            taxes.style.border="transparent";
            category.style.border="transparent";
        }
    }
    else{
        title.style.border="transparent";
        price.style.border="transparent";
        taxes.style.border="transparent";
        category.style.border="transparent";
        if(submitmode === 'Create'){
            if(ads.value ===''){
                ads.value = 0
            }
            if(discount.value ===''){
                discount.value = 0
            }
            let dataObj = {
                Title: title.value.toLowerCase(),
                Price: price.value ,
                Taxes: taxes.value,
                Ads: ads.value,
                Discount: discount.value = 0,
                Total: total.innerHTML,
                Category: category.value.toLowerCase()
            }
        
            //count
            if (count.value > 1) {
                for(let i =0; i < count.value; i++){
                    dataProduct.push(dataObj)
                }
            }else{
            dataProduct.push(dataObj)
            }
            localStorage.setItem("product",JSON.stringify(dataProduct))
            
            showDate()
            clearDate()
            getTotal()
        }
        else{ //update
            let dataObj = {
                Title: title.value.toLowerCase(),
                Price: price.value,
                Taxes: taxes.value,
                Ads: ads.value,
                Discount: discount.value,
                Total: total.innerHTML,
                Category: category.value.toLowerCase()
            }
            count.style.display="block"
            dataProduct[indexForUpadte] = dataObj
            localStorage.setItem("product",JSON.stringify(dataProduct))
            showDate()
            submitmode = 'Create'
            creatBtn.value = submitmode
            clearDate()
            getTotal()
            
        }
    }
}



//clear input
function clearDate(){
    title.value = '',
    price.value= '',
    taxes.value= '',
    ads.value= '',
    discount.value= '',
    total.innerHTML= '',
    category.value= '',
    count.value = ''
}

//read

function showDate(){
    let table="" ;
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
            <tr>
                <td>${[i+1]}</td>
                <td>${dataProduct[i].Title}</td>
                <td>${dataProduct[i].Price}</td>
                <td>${dataProduct[i].Taxes}</td>
                <td>${dataProduct[i].Ads}</td>
                <td>${dataProduct[i].Discount}</td>
                <td>${dataProduct[i].Total}</td>
                <td>${dataProduct[i].Category}</td>
                <td><button Onclick=updateProd(${i}) id="update">Update</button></td>
                <td><button Onclick=deleteProd(${i}) id="delete">Delete</button></td>
            </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;

    //for delete all btn
    if(dataProduct.length > 0){
        delete_all.style.display="block"
    }else{
        delete_all.style.display="none"
    }
}

showDate()

//delete
function deleteProd(i){
    dataProduct.splice(i,1);
    localStorage.setItem("product",JSON.stringify(dataProduct));
    showDate();
}

//delete All

delete_all.onclick = function deleteAll(){
                    dataProduct.splice(0);
                    localStorage.setItem("product",JSON.stringify(dataProduct));
                    showDate();
                    }


//update
function updateProd(i){
    title.value = dataProduct[i].Title,
    price.value= dataProduct[i].Price,
    taxes.value= dataProduct[i].Taxes,
    ads.value= dataProduct[i].Ads,
    discount.value= dataProduct[i].Discount,
    category.value= dataProduct[i].Category
    scroll(0, 0)
    title.focus()
    submitmode = 'Update'
    creatBtn.value = submitmode
    indexForUpadte = i
    count.style.display="none"
    getTotal()
}

//search

searchTitle.onclick= function search_Title(){
    search.setAttribute("placeholder","Search By Title");
    search.focus()
}       

searchCategory.onclick= function search_Category(){
    search.setAttribute("placeholder","Search By Category")
    search.focus()
}

function search_item(){
    let table = "";
    for(let i = 0; i < dataProduct.length;i++){
        if(search.getAttribute("placeholder") === 'Search By Title' ||search.getAttribute("placeholder") === 'Search'){
            if(dataProduct[i].Title.includes(search.value.toLowerCase())){
                table += `
                <tr>
                    <td>${[i+1]}</td>
                    <td>${dataProduct[i].Title}</td>
                    <td>${dataProduct[i].Price}</td>
                    <td>${dataProduct[i].Taxes}</td>
                    <td>${dataProduct[i].Ads}</td>
                    <td>${dataProduct[i].Discount}</td>
                    <td>${dataProduct[i].Total}</td>
                    <td>${dataProduct[i].Category}</td>
                    <td><button Onclick=updateProd(${i}) id="update">Update</button></td>
                    <td><button Onclick=deleteProd(${i}) id="delete">Delete</button></td>
                </tr>
            `
            }
        }else if(search.getAttribute("placeholder") === 'Search By Category'){
            if(dataProduct[i].Category.includes(search.value.toLowerCase())){
                table += `
                <tr>
                    <td>${[i+1]}</td>
                    <td>${dataProduct[i].Title}</td>
                    <td>${dataProduct[i].Price}</td>
                    <td>${dataProduct[i].Taxes}</td>
                    <td>${dataProduct[i].Ads}</td>
                    <td>${dataProduct[i].Discount}</td>
                    <td>${dataProduct[i].Total}</td>
                    <td>${dataProduct[i].Category}</td>
                    <td><button Onclick=updateProd(${i}) id="update">Update</button></td>
                    <td><button Onclick=deleteProd(${i}) id="delete">Delete</button></td>
                </tr>
            `
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}    