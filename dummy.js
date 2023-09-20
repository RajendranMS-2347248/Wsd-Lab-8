function fetchAndDisplayProducts() {
    const productListDiv = document.getElementById('productList');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');


    fetch('https://cynthiaesthermetilda.github.io/Xhrdemo/products.json')
        .then(response => response.json())
        .then(products => {
            // filter
            const searchTerm = searchInput.value.toLowerCase().trim();
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );

            // Sort products
            const sortBy = sortSelect.value;
            filteredProducts.sort((a, b) => {
                if (sortBy === 'name') {
                    return a.name.localeCompare(b.name);
                } else if (sortBy === 'price') {
                    return a.price - b.price;
                }
            });

            // Clear the existing product list
            productListDiv.innerHTML = '';

            //after filtering
            filteredProducts.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                const productName = document.createElement('h2');
                productName.textContent = product.name;

                const productDescription = document.createElement('p');
                productDescription.textContent = product.description;

                const productPrice = document.createElement('p');
                productPrice.textContent = `Price: $${product.price.toFixed(2)}`;

                const productImage = document.createElement('img');
                // productImage.src = product.image_url;
                productImage.src = "Dummyimg.png"; //dummy image to ckeck function of image_url
                productImage.alt = product.name;

                productDiv.appendChild(productName);
                productDiv.appendChild(productDescription);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(productImage);

                productListDiv.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
searchInput.addEventListener('input', fetchAndDisplayProducts);
sortSelect.addEventListener('change', fetchAndDisplayProducts);


fetchAndDisplayProducts();