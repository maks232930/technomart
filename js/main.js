'use strict'

var PAGINATE_BY = 6;

var arrayProductUrlName = ['bosch-2000', 'bosch-3000', 'bosch-6000', 'bosch-9000', 'makita-td-110'];
var arrayProductBrandName = ['BOSCH', 'Makita', 'Vagner', 'Mega', 'Proline'];
var arrayProductFlag = ['new', 'promo', ''];
var arrayBooleanValues = [true, false];
var arrayProductTitle = [
    'Перфоратор BOSCH BFG 2000',
    'Перфоратор BOSCH BFG 3000',
    'Перфоратор BOSCH BFG 6000',
    'Перфоратор BOSCH BFG 9000',
    'Шуруповерт Makita TD-110'
    ];

function makeProductCard(url, brand, title, price, discount, flag, isElectric) {
    return {
        url: url,
        brand: brand,
        title: title,
        price: price,
        discount: discount, 
        flag: flag,
        isElectric: isElectric
    };
}

function getRandElement(arrLen) {
    if (arrLen) {
        var rand = Math.floor(Math.random() * arrLen);  
        return rand;
    }
    else {
        var min = 5000;
        var max = 20000;
        var rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
    
}

function calcDiscount(price) {
    if (getRandElement(arrayBooleanValues.length)) {
        price += price * 0.15;
        var discount = Math.floor(price / 500) * 500;
        return discount;   
    }
    else {  
        return 0;
    }
     
}

function getProductCards() {
    var arrayProductCards = [];

    for(var i = 1; i <= 18; i++) {
        var url = `img/catalog/${arrayProductUrlName[getRandElement(arrayProductUrlName.length)]}.jpg`;
        var brand = arrayProductBrandName[getRandElement(arrayProductBrandName.length)];
        var title = arrayProductTitle[getRandElement(arrayProductTitle.length)];
        var price = getRandElement();
        var discount = calcDiscount(price);
        var flag = arrayProductFlag[getRandElement(arrayProductFlag.length)];
        var isElectric = arrayBooleanValues[getRandElement(arrayBooleanValues.length)];
        arrayProductCards.push(makeProductCard(url, brand, title, price, discount, flag, isElectric));
    }

    return arrayProductCards;
}


var arrayProductCards = getProductCards();
console.log(arrayProductCards);

var cardProduct = document.querySelector('#catalog-item').content.querySelector('.catalog-item');

function createProductFlagHtml(flag) {
    var divFlag = document.createElement('div');
    divFlag.setAttribute('class', `flag flag-${flag}`);

    var spanEl = document.createElement('span');
    spanEl.setAttribute('class', 'visually-hidden');

    var flagName = flag === 'new' ? 'Новинка' : 'Акция';
    spanEl.textContent = flagName;
    divFlag.insertAdjacentElement("afterBegin", spanEl);
    
    return divFlag;
}


function createElement(title, url, discount, price, flag) {
    var cloneItem = cardProduct.cloneNode(true);

    if (flag) {
        cloneItem.insertAdjacentElement('afterbegin', createProductFlagHtml(flag))
    }
    
    var imgProduct = cloneItem.querySelector('img');
    imgProduct.setAttribute('src', url);
    imgProduct.setAttribute('alt', title);

    var titleProduct = cloneItem.querySelector('h3');
    titleProduct.textContent = title;

    if (discount) {
        var discountProduct = cloneItem.querySelector('span');
        discountProduct.textContent = discount;
    }

    var priceProduct = cloneItem.querySelector('.price');
    priceProduct.textContent = price;
    
    return cloneItem;
    
}

function deleteElements(arrayElements) {
    for (var i = 0; i < arrayElements.length; i++) {
        arrayElements[i].parentNode.removeChild(arrayElements[i]);
    }
}

var fragmentProductCards = document.createDocumentFragment()

var myNode = document.querySelectorAll('.catalog-item');
deleteElements(myNode);


for (var i = 0; i < PAGINATE_BY; i++) {
    var title = arrayProductCards[i].title;
    var url = arrayProductCards[i].url;
    var discount = arrayProductCards[i].discount;
    var price = arrayProductCards[i].price;
    var flag = arrayProductCards[i].flag;
    fragmentProductCards.appendChild(createElement(title, url, discount, price, flag));

}

var listElemens = document.querySelector('.catalog-list');
listElemens.appendChild(fragmentProductCards);

//Task 3 or 4


