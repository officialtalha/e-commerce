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

(async () => {
    try {
        const info = localStorage.getItem('prodDetail');
        const product = JSON.parse(info);
        document.getElementById('prod-image').src = product[0].image;
        document.getElementById('prod-name').textContent = product[0].name;
        document.getElementById('prod-price').textContent = `₹ ${product[0].price}`;
        document.getElementById('prod-description').textContent = product[0].description;

        //add to cart item code
        document.getElementById('addToCartBtn').addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const result = await axios.post(`http://localhost:3000/product/${product[0]._id}`, {
                    token
                });
                alert(`Item added to the cart.`);
            } catch (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }

})();