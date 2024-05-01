const ifLoggedIn = localStorage.getItem('user');
const info = JSON.parse(ifLoggedIn);
const token = info.token;
if (!ifLoggedIn) {
    window.location.href = './login.html';
} else {
    (async () => {
        try {
            //getting loggen in user info 
            const userInfo = await axios.get('http://localhost:3000/user', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            const getCartProducts = await axios.get(`http://localhost:3000/cart/${userInfo.data.message._id}`);

            // render cart items
            const cartItemsContainer = document.getElementById('cartItems');
            cartItemsContainer.innerHTML = '';
            let totalItem = 0;
            for (item in getCartProducts.data.message) {
                const itemElement = document.createElement('div');
                itemElement.classList.add('mb-3');

                const div1 = document.createElement('div');
                div1.className = 'row';

                const div2 = document.createElement('div');
                div2.className = 'col-md-3';

                const img = document.createElement('img');
                img.src = `${getCartProducts.data.message[item].image}`;
                img.alt = 'Product Image';
                img.className = 'img-fluid';

                div2.appendChild(img);

                const div3 = document.createElement('div');
                div3.className = 'col-md-6';

                const h5 = document.createElement('h5');
                h5.textContent = `${getCartProducts.data.message[item].name}`;

                const p = document.createElement('p');
                h5.textContent = `Price: ₹ ${getCartProducts.data.message[item].price}`;

                div3.appendChild(h5);
                div3.appendChild(p);

                const div4 = document.createElement('div');
                div4.className = 'col-md-3';

                const button = document.createElement('button');
                button.className = 'btn custom-danger-btn btn-sm';
                button.id = 'remove-btn';
                button.textContent = 'Remove';

                div4.appendChild(button);

                div1.appendChild(div2);
                div1.appendChild(div3);
                div1.appendChild(div4);

                const hr = document.createElement('hr');

                itemElement.appendChild(div1);
                itemElement.appendChild(hr);
                cartItemsContainer.appendChild(itemElement);

                button.onclick = async () => {
                    await axios.delete(`http://localhost:3000/cart/${getCartProducts.data.message[item]._id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    });
                    window.location.reload();
                }
                totalItem++;
            }

            // Function to calculate cart subtotal and total
            function calculateTotal() {
                let subtotal = 0;
                getCartProducts.data.message.forEach(item => {
                    const priceArray = item.price.split(',');
                    const price = priceArray.join('');
                    subtotal += parseInt(price);
                });
                document.getElementById('subtotal').textContent = `₹ ${subtotal}`;
                document.getElementById('total-items').textContent = `${totalItem}`;
                // Add shipping calculation if needed
                document.getElementById('total').textContent = `₹ ${subtotal}`;
            }

            // Clear cart button event listener
            document.getElementById('clearCartBtn').addEventListener('click', async () => {
                alert('all the item will be deleted from the cart.');
                await axios.delete(`http://localhost:3000/cart`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });
                window.location.reload();
            });

            // Initial render
            // renderCartItems();
            calculateTotal();
        } catch (err) {
            console.log(err);
        }
    })();
}
