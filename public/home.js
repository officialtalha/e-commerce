const userLogin = document.getElementById('user-login');
const cards = document.getElementById('cards-field');

const createCard = (name, image, price) => {
    const div1 = document.createElement('div');
    div1.className = 'col';

    const div2 = document.createElement('div');
    div2.className = 'card';

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = `${image}`;
    img.alt = 'Product 1';

    const div3 = document.createElement('div');
    div3.className = 'card-body';

    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.textContent = `${name}`;

    const p = document.createElement('p');
    p.className = 'card-text';
    p.textContent = `₹ ${price}`;

    const a = document.createElement('a');
    a.href = './cart.html';
    a.className = 'btn custom-btn';
    a.textContent = 'Add to Cart';

    div3.appendChild(h5);
    div3.appendChild(p);
    div3.appendChild(a);

    div2.appendChild(img);
    div2.appendChild(div3);

    div1.appendChild(div2);
    return div1;
};
(async () => {
    try {
        //checking whether user is loggen in or not 
        const ifLoggedIn = localStorage.getItem('user');
        if (ifLoggedIn) {
            const info = JSON.parse(ifLoggedIn);
            const token = info.token;
            const user = await axios.get('http://localhost:3000/user', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            userLogin.textContent = `👤${user.data.message.name}`;
        }

        //getting all products 
        const allProducts = await axios.get('http://localhost:3000/product');
        allProducts.data.message.forEach((async (product) => {
            try {
                const div = createCard(product.name, product.image, product.price);
                cards.appendChild(div);
            } catch (err) {
                console.log(err);
            }
        }));
    } catch (err) {
        console.log(err);
    }
})();