const userLogin = document.getElementById('user-login');
const ifLoggedIn = localStorage.getItem('user');
let token;
//checking whether user is loggen in or not 
if (ifLoggedIn) {
    let info = JSON.parse(ifLoggedIn);
    token = info.token;
    userLogin.textContent = `👤${info.name}`;
}
//user login nav bar
userLogin.addEventListener('click', (e) => {
    try {
        e.preventDefault();
        if (ifLoggedIn) {
            const flag = confirm('Do you want to logout.');
            if (flag) {
                localStorage.removeItem('user');
                window.location.href = './login.html';
            }
        } else {
            window.location.href = './login.html';
        }

    } catch (err) {
        console.log(err);
    }
});

const info = localStorage.getItem('checkout');
const total = JSON.parse(info);
document.getElementById('subtotal').textContent = `₹ ${total}`;
document.getElementById('total').textContent = `₹ ${total}`;