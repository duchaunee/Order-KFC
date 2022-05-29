
// Open Close modal menu

// Click Add food hiện modal
const menuOpen = document.querySelector('.menu__food-overlay');
document.querySelector('.add__food').addEventListener('click', () => {
    menuOpen.style.display = 'flex';
    // addFood();
})

// CLick icon close ẩn modal
const menuIconClose = document.querySelector('.icon-close-modal');
menuIconClose.addEventListener('click', () => {
    menuOpen.style.display = 'none';
})

// Ấn khoảng không ẩn modal
const modal = document.querySelector('.menu__food-overlay')
modal.addEventListener('click', () => {
    menuOpen.style.display = 'none';
})

// Khi ấn vào khoảng không ẩn modal, ấn vào modal__food cũng bị ẩn
// vì modal__food là con của modal, nên ta phải ngăn chăn hành vi này
// bằng e.stopPropagation();
const menuFoodStopClose = document.querySelector('.menu__food')
menuFoodStopClose.addEventListener('click', (e) => {
    e.stopPropagation();
})


const items = [
    {
        name: 'Veg Rice meal',
        price: 7.99,
        quantity: 1
    },
    {
        name: 'Chicken Rice Meal',
        price: 8.99,
        quantity: 1
    }, 
    {
        name: 'Rice made by NTQM',
        price: 9.99,
        quantity: 1
    }, 
]

const MenuAddFood = [
    {
        name: 'Veg Rice meal',
        price: (Math.random()*10).toFixed(2),
        quantity: 1
    },
    {
        name: 'Chicken Rice Meal',
        price: (Math.random()*10).toFixed(2),
        quantity: 1
    },
    {
        name: 'Veg Rock Box',
        price: (Math.random()*10).toFixed(2),
        quantity: 1
    }, 
    {
        name: 'Soft Serve',
        price: (Math.random()*10).toFixed(2),
        quantity: 1
    }, 
    {
        name: 'Brownie Sundae',
        price: (Math.random()*10).toFixed(2),
        quantity: 1
    }, 
    {
        name: 'Kreamball',
        price: (Math.random()*10).toFixed(2),
        quantity: 1
    },
    {
        name: 'Potato Krisper',
        price: (Math.random()*10).toFixed(2),
        quantity: 1
    },
    {
        name: 'Corn Cupz',
        price: (Math.random()*10).toFixed(2),
        quantity: 1
    }, 
    {
        name: 'Kold Koffee',
        price: (Math.random()*10).toFixed(2),
        quantity: 1
    },
    {
        name: 'Hot & Crispy',
        price: (Math.random()*10).toFixed(2),
        quantity: 1
    }, 
    {
        name: 'Fiery Grilled',
        price: (Math.random()*10).toFixed(2),
        quantity: 1
    },
    {
        name: 'Smoky Frilled',
        price: (Math.random()*10).toFixed(2),
        quantity: 1
    },
]

const menuItems = document.querySelectorAll('.menu__list--item');

menuItems.forEach( (menuItem, index) => {
    menuItem.addEventListener('click', () => {
        if (items.length == 4) {
            let notice = confirm("Bạn có muốn tiếp tục không? Ăn nhiều béo như Quỳnh Mai đấyy", "");
            if (notice) {
                addFood(index);
            }
        }
        else addFood(index);
        menuOpen.style.display = 'none';
    })
})


function addFood(index) {
    var obj = {
        name: MenuAddFood[index].name,
        price: MenuAddFood[index].price,
        quantity: MenuAddFood[index].quantity,
    };
    items.push(obj)
    render();
}

function removeFood(index) {
    items.splice(index, 1);
    render();
}

function render() {
    let subTotal = 0;
    items.forEach( item => {
        subTotal += (item.quantity * item.price);
    });
    const SHIPPING = subTotal * (5/100);
    const total = subTotal + SHIPPING;
    const html = items.map( item => 
        `<li class="body__item">
            <span class="body__name">${item.name}</span>
            <div class="body__quanlity">
                <button class="logo__dec"><i class="fas fa-minus"></i></button>
                <input class="value__quanlity" type="text" value="${item.quantity}"/>
                <button class="logo__inc"><i class="fas fa-plus"></i></button>
            </div>
            <div class="price">
                <span class="cost">$${item.price}</span>
                <button class="close"><i class="fas fa-times"></i></button>
            </div>
        </li>`
    ).join('');
    document.querySelector('.body__items').innerHTML = html;

    const closes = document.querySelectorAll('.close');
    closes.forEach( (close, index) => {
        close.addEventListener('click',() => {
            removeFood(index);
        })
    })

    const plus = document.querySelectorAll('.logo__inc'); 
    const minus = document.querySelectorAll('.logo__dec');

    plus.forEach( (item, index) => {
        let itemParent = item.parentElement;
        const valueQuantity = itemParent.querySelector('.value__quanlity'); 

        let plusQuanlity = items[index].quantity;
        item.addEventListener('click',() => {
            plusQuanlity++;
            items[index].quantity = plusQuanlity;
            render();
        })
    })

    minus.forEach( (item, index) => {
        let itemParent = item.parentElement;
        const valueQuantity = itemParent.querySelector('.value__quanlity'); 

        let plusQuanlity = items[index].quantity;
        item.addEventListener('click',() => {
            plusQuanlity--;
            if (plusQuanlity > 0) {
                items[index].quantity = plusQuanlity;
                render();
            }
            else removeFood(index);
        })
    })

    document.querySelector('.order__total--price').innerText = `$${subTotal.toFixed(2)}`;
    document.querySelector('.shipping--price').innerText = `$${SHIPPING.toFixed(2)}`;
    document.querySelector('.total--price').innerText = `$${total.toFixed(2)}`;


    const emptyOrder = document.querySelector('.empty__order');
    if (items.length == 0) {
        emptyOrder.style.display = "block";
    }
    else if (items.length < 5) {
        emptyOrder.style.display = "none";
    }
}


const checkOut = document.querySelector('.checkout');
const checkText = document.querySelector('.checkout__text');
const checkIcon = document.querySelector('.checkout__icon')

checkOut.addEventListener('click', () => {
    function showNotice() {
        prompt("ENTER YOUR FULL NAME", "");
        let result = confirm("DO U WANT TO CONTINUE ?", "");
        if (result) {
            alert('THANK YOU FOR YOUR ORDER');  
            checkOut.style.backgroundColor = "#5dbe11";
            checkText.innerHTML = "Checkouted"
            checkIcon.classList.remove('far');
            checkIcon.classList.add('fas');
        }
        else alert('DCM SAO LẠI KHÔNG MUA NỮA HẢA ?');
    }
    showNotice();
})

render();
