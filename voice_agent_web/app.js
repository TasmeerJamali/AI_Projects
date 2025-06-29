const MENU = {
    pizza: { price: 12.0, sizes: ["small", "medium", "large"] },
    salad: { price: 8.0, sizes: ["regular", "large"] },
    water: { price: 2.0, sizes: ["bottle"] }
};

const callSetup = document.getElementById('call-setup');
const orderSection = document.getElementById('order-section');
const summarySection = document.getElementById('summary-section');
const itemSelect = document.getElementById('item-select');
const sizeSelect = document.getElementById('size-select');
const qtyInput = document.getElementById('qty-input');
const orderList = document.getElementById('order-list');
const summaryDiv = document.getElementById('summary');

let order = [];

function populateItems() {
    itemSelect.innerHTML = '';
    Object.keys(MENU).forEach(item => {
        const opt = document.createElement('option');
        opt.value = item;
        opt.textContent = item;
        itemSelect.appendChild(opt);
    });
    updateSizes();
}

function updateSizes() {
    const item = itemSelect.value;
    sizeSelect.innerHTML = '';
    MENU[item].sizes.forEach(size => {
        const opt = document.createElement('option');
        opt.value = size;
        opt.textContent = size;
        sizeSelect.appendChild(opt);
    });
}

function addItem() {
    const item = itemSelect.value;
    const size = sizeSelect.value;
    const qty = parseInt(qtyInput.value, 10);
    if (!qty || qty < 1) return;
    order.push({ item, size, qty });
    const li = document.createElement('li');
    li.textContent = `${qty} x ${size} ${item}`;
    orderList.appendChild(li);
}

function finishOrder() {
    let total = 0;
    summaryDiv.innerHTML = '';
    order.forEach(entry => {
        const price = MENU[entry.item].price * entry.qty;
        total += price;
        const p = document.createElement('p');
        p.textContent = `${entry.qty} x ${entry.size} ${entry.item} - $${price.toFixed(2)}`;
        summaryDiv.appendChild(p);
    });
    const totalP = document.createElement('p');
    totalP.textContent = `Total: $${total.toFixed(2)}`;
    summaryDiv.appendChild(totalP);
    gsap.to(orderSection, { duration: 0.5, opacity: 0, onComplete: () => {
        orderSection.classList.add('hidden');
        gsap.fromTo(summarySection, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        summarySection.classList.remove('hidden');
    }});
}

document.getElementById('start-btn').addEventListener('click', () => {
    populateItems();
    gsap.to(callSetup, { duration: 0.5, opacity: 0, onComplete: () => {
        callSetup.classList.add('hidden');
        gsap.fromTo(orderSection, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        orderSection.classList.remove('hidden');
    }});
});

itemSelect.addEventListener('change', updateSizes);
document.getElementById('add-item').addEventListener('click', addItem);
document.getElementById('finish-order').addEventListener('click', finishOrder);
