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
            console.log(getCartProducts.data.message);

            // Function to render cart items
            function renderCartItems() {
                const cartItemsContainer = document.getElementById('cartItems');
                cartItemsContainer.innerHTML = '';
                getCartProducts.data.message.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('mb-3');
                    itemElement.innerHTML = `
        <div class="row">
          <div class="col-md-3">
            <img src="${item.image}" alt="Product Image" class="img-fluid">
          </div>
          <div class="col-md-6">
            <h5>${item.name}</h5>
            <p>Price: ₹ ${item.price}</p>
          </div>
          <div class="col-md-3">
            <button class="btn btn-danger btn-sm">Remove</button>
          </div>
        </div>
        <hr>
      `;
                    cartItemsContainer.appendChild(itemElement);
                });
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
                // Add shipping calculation if needed
                document.getElementById('total').textContent = `₹ ${subtotal}`;
            }

            // Clear cart button event listener
            document.getElementById('clearCartBtn').addEventListener('click', function () {
                getCartProducts.data.message.length = 0;
                renderCartItems();
                calculateTotal();
            });

            // Initial render
            renderCartItems();
            calculateTotal();
        } catch (err) {
            console.log(err);
        }
    })();




}
