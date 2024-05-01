const info = localStorage.getItem('checkout');
const total = JSON.parse(info);
document.getElementById('subtotal').textContent = `₹ ${total}`;
document.getElementById('total').textContent = `₹ ${total}`;