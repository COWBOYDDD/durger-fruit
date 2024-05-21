const food = [
    {name: 'Grapes',      price: 30,  path: 'img/grapes.png'},
    {name: 'Blueberries', price: 60,  path: 'img/blueberries.png'},
    {name: 'Cherries',    price: 45,  path: 'img/cherries.png'},
    {name: 'Kiwi',        price: 71,  path: 'img/kiwi-fruit.png'},
    {name: 'Mango',       price: 23,  path: 'img/mango.png'},
    {name: 'Pineapple',   price: 56,  path: 'img/pineapple.png'},
    {name: 'Strawberry',  price: 78,  path: 'img/strawberry.png'},
    {name: 'Watermelon',  price: 112, path: 'img/watermelon.png'}
];

const items = document.querySelector('.items');
const viewOrder = document.querySelector('#view-order');

let index = 0;
while (index < food.length) {
    const div = document.createElement('div');
    div.classList.add('item');
    div.innerHTML = `
        <span class="counter hide">0</span>
        <div class="image">
            <img src="${food[index].path}">
        </div>
        <span class="name-and-price">${food[index].name} • ${food[index].price}$</span>
        <div class="buttons">
            <button class="add-btn">ADD</button>
            <button class="minus-btn hide">−</button>
            <button class="plus-btn hide">+</button>
        </div>
    `;  

    const counter = div.querySelector('.counter');
    const add = div.querySelector('.add-btn');
    const minus = div.querySelector('.minus-btn');
    const plus = div.querySelector('.plus-btn');
    
    add.addEventListener('click', () => {
        counter.textContent = 1;
        add.classList.add('hide');
        minus.classList.remove('hide');
        plus.classList.remove('hide');
        counter.classList.remove('hide');
        viewOrder.classList.remove('hide');
    });

    plus.addEventListener('click', () => {
        if (counter.textContent != 99) {
            counter.textContent++;
        }
    });
    
    minus.addEventListener('click', () => {
        if (counter.textContent == 1) {
            counter.textContent = 0;
            counter.classList.add('hide');
            add.classList.remove('hide');
            minus.classList.add('hide');
            plus.classList.add('hide');
        } else {
            counter.textContent--;
        }

        if (fun() == 0) {
            viewOrder.classList.add('hide');
        }

    });

    items.appendChild(div);

    index++;
}


function fun() {
    const allFood = items.querySelectorAll('.item');
    let summa = 0;
    let index = 0;
    while (index < allFood.length) {
        const counter = allFood[index].querySelector('.counter');
        summa += +counter.textContent;
        index++;
    }
    return summa;
}


viewOrder.addEventListener('click', () => {
    const check = [];
    const allFood = items.querySelectorAll('.item');  // [div, div, div, ...]
    let index = 0;
    while (index < allFood.length) {
        const counter = allFood[index].querySelector('.counter');
        const nameAndPrice = allFood[index].querySelector('.name-and-price');
        const value = nameAndPrice.textContent;
        const name = value.slice(0, value.indexOf("•") - 1);
        const price = value.slice(value.indexOf("•") + 2, value.length-1);
        if (counter.textContent > 0) {
            check.push({
                name: name, 
                price: Number(price),
                counter: Number(counter.textContent),
                summa: price * Number(counter.textContent)
            });
        }
        index++;
    }
    console.log(check)
});
