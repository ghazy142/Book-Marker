var pname=document.getElementById('productName');
var pcategory=document.getElementById('productCategory');
var subButton=document.getElementById('sub');
var currentIndex;
var productList=[];

subButton.onclick=function(){
    if(subButton.innerHTML==='Submit'){
        createProducts();
    }else{
        saveProduct()
    }
    localStorage.setItem('product',JSON.stringify(productList))
    display();
}
Reset();

function createProducts(){
    var product={
        productName:pname.value,
        productCategory:pcategory.value,
        productURL:document.getElementById('productCategory').value
    };
    // Check if the website URL is in a valid format
    var urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(product.productURL)) {
        alert("Invalid URL format! Please enter a URL in the format \"http(s)://www.example.com\"");
        return;
    }
    // Check if the website URL already exists in the productList
    var isDuplicate = false;
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].productURL === product.productURL) {
            isDuplicate = true;
            break;
        }
    }
    if (isDuplicate) {
        alert("This website is already bookmarked!");
    } else {
        productList.push(product);
        display();
    }
}
function Reset(){
    document.getElementById('productName').value = '';
    document.getElementById('productCategory').value = '';
     // Clear the productList array
    productList = [];
    display();
};
// display
function display(){
    var trs='';
    for(i=0 ; i<productList.length ; i++){
        trs+=`                <tr >
        <td >${i+1}</td>
        <td>${productList[i].productName}</td>
        <td><button class="btn btn-success" onclick="window.open('${productList[i].productCategory}')">Visit</button></td>
        <td><button class="btn btn-warning" onclick="updateProduct(${i})">Update</button></td>
        <td><button class="btn btn-danger"onclick="deletee(${i})">Delete</button></td>
        <td></td>
    
    </tr>`;
    }
document.getElementById('tableBody').innerHTML=trs; 
document.getElementById('productName').value = '';
document.getElementById('productCategory').value = '';
};
// delete items
function deletee(index){
productList.splice(index,1);
console.log(productList);
display();
};

// search
var searchProductt=document.getElementById("searchProduct"); 
function searchProd(){
    console.log(searchProductt.value)
    var trs=``; 
    for(var i=0 ; i<productList.length ; i++){
        if(productList[i].productName.includes(searchProductt.value)){
            trs+=`<tr>
                        <td>${i+1}</td>
                        <td>${productList[i].productName}</td>
                        <td><button class="btn btn-success" onclick="window.open('${productList[i].productCategory}')">Visit</button></td>
                        <td><button class="btn btn-warning" onclick="updateProduct(${i})">Update</button></td>
                        <td><button class="btn btn-danger" onclick="deletee(${i})">Delete</button></td>
                    </tr>`;    
        }
    }
    document.getElementById('tableBody').innerHTML=trs; 
}

function updateProduct(index){
    currentIndex=index;
    productName.value=productList[index].productName;
    productCategory.value=productList[index].productCategory; 
    subButton.innerHTML='update';
}

function saveProduct() {
    var product = {
        productName: pname.value,
        productCategory: pcategory.value,
        productURL: document.getElementById('productCategory').value
    };
    // Check if the website URL is in a valid format
    var urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(product.productURL)) {
        alert("Invalid URL format! Please enter a URL in the format \"http(s)://www.example.com\"");
        return;
    }
    // Check if the website URL already exists in the productList
        var isDuplicate = false;
        for (var i = 0; i < productList.length; i++) {
            if (productList[i].productURL === product.productURL) {
                isDuplicate = true;
                break;
            }
        }
        if (isDuplicate) {
            alert("This website is already bookmarked!");
        } else {
            productList[currentIndex] = product;
            subButton.innerHTML = 'Submit';
        }

}

