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
    p.textContent = `${price}`;

    const a = document.createElement('a');
    a.href = '#';
    a.className = 'btn custom-btn';
    a.textContent = 'btn custom-btn';

    div3.appendChild(h5);
    div3.appendChild(p);
    div3.appendChild(a);

    div2.appendChild(image);
    div2.appendChild(div3);

    div1.appendChild(div2);
    return div1;
};
(async () => {
    try {
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
                p.textContent = `${product.price}`;

                const a = document.createElement('a');
                a.href = '#';
                a.className = 'btn custom-btn';
                a.textContent = 'btn custom-btn';

                div3.appendChild(h5);
                div3.appendChild(p);
                div3.appendChild(a);

                div2.appendChild(img);
                div2.appendChild(div3);

                div1.appendChild(div2);
                cards.appendChild(div1);
            } catch (err) {
                console.log(err);
            }
        }));
    } catch (err) {
        console.log(err);
    }
})();

