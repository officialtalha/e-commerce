// Show product form when "Add Product" button is clicked
document.getElementById('addProductBtn').addEventListener('click', function () {
    document.getElementById('productForm').style.display = 'block';
});

//add poduct functionality
const form = document.getElementById('add-product-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const productDetails = {
            name: document.getElementById('productName').value,
            image: document.getElementById('productImage').value,
            price: document.getElementById('productPrice').value,
            description: document.getElementById('productDescription').value,
        }
        await axios.post('http://localhost:3000/product', productDetails);
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
});