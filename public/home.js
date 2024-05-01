const userLogin = document.getElementById('user-login');
const cards = document.getElementById('cards-field');
const ifLoggedIn = localStorage.getItem('user');
let token;
(async () => {
    try {
        //checking whether user is loggen in or not 
        if (ifLoggedIn) {
            let info = JSON.parse(ifLoggedIn);
            token = info.token;
            userLogin.textContent = `👤${info.name}`;
        }
        //getting all products 
        const allProducts = await axios.get('http://localhost:3000/product');
        allProducts.data.message.forEach((async (product) => {
            try {
                const div1 = document.createElement('div');
                div1.className = 'col';

                const div2 = document.createElement('div');
                div2.className = 'card';

                const img = document.createElement('img');
                img.className = 'card-img-top';
                img.src = `${product.image}`;
                img.alt = 'Product 1';

                const div3 = document.createElement('div');
                div3.className = 'card-body';

                const h5 = document.createElement('h5');
                h5.className = 'card-title';
                h5.textContent = `${product.name}`;

                const p = document.createElement('p');
                p.className = 'card-text';
                p.textContent = `₹ ${product.price}`;

                const a = document.createElement('a');
                a.id = 'product-to-cart';
                a.className = 'btn custom-btn';
                a.textContent = 'Add to Cart';

                div3.appendChild(h5);
                div3.appendChild(p);
                div3.appendChild(a);

                div2.appendChild(img);
                div2.appendChild(div3);

                div1.appendChild(div2);
                cards.appendChild(div1);
                //add to cart item code
                a.onclick = async () => {
                    try {
                        const result = await axios.post(`http://localhost:3000/product/${product._id}`, {
                            token
                        });
                        alert(`Item added to the cart.`);
                    } catch (err) {
                        console.log(err);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }));

    } catch (err) {
        console.log(err);
    }
})();

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