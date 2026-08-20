// fetch('https://dummyjson.com/products?limit=10&skip=0&select=title,description,thumbnail')
//     .then(res => res.json())
//     .then(console.log);



const productContainer = document.getElementById("product-container");
const pagination = document.getElementById("pagination");

const limit = 10;
let currentPage = 1;
let totalProducts = 0;


function fetchProducts(page) {

    const skip = (page - 1) * limit;

    fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,description,thumbnail`
    )
        .then(res => res.json())
        .then(data => {

            totalProducts = data.total;

            displayProducts(data.products);

            createPagination();

        })
        .catch(error => {
            console.log("Error:", error);
        });
}

// async function fetchProducts(page) {

//     try {
//         const response = await fetch(...);

//         const data = await response.json();

//         displayProducts(data.products);

//     } catch (error) {
//         console.log(error);
//     }
// }

function displayProducts(products) {

    productContainer.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p>${product.description}</p>
        `;

        productContainer.appendChild(card);
    });
}

// const shortDescription = product.description.length > 80
//     ? product.description.slice(0, 80) + "..."
//     : product.description;
// function createPagination() {
//     pagination.innerHTML = "";
//     const totalPages = Math.ceil(totalProducts / limit);
// }

// function createPagination() {

//     pagination.innerHTML = "";

//     const totalPages = Math.ceil(totalProducts / limit);

//     for (let page = 1; page <= totalPages; page++) {

//         const button = document.createElement("button");

//         button.textContent = page;

//         if (page === currentPage) {
//             button.classList.add("active");
//         }

//         button.addEventListener("click", () => {

//             currentPage = page;

//             fetchProducts(currentPage);
//         });

//         pagination.appendChild(button);
//     }
// }


function createPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(totalProducts / limit);
    const maxVisiblePages = 5;
    let startPage;
    let endPage;

    if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const half = Math.floor(maxVisiblePages / 2);
        startPage = currentPage - half;
        endPage = currentPage + half;

        if (startPage < 1) {
            startPage = 1;
            endPage = maxVisiblePages;
        }
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = totalPages - maxVisiblePages + 1;
        }
    }

    const prevButton = document.createElement("button");
    prevButton.innerHTML = "&#8592;";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            fetchProducts(currentPage);
        }
    });
    pagination.appendChild(prevButton);

    for (let page = startPage; page <= endPage; page++) {
        const button = document.createElement("button");
        button.textContent = page;
        if (page === currentPage) {
            button.classList.add("active");
            button.disabled = true;
        }
        button.addEventListener("click", () => {
            currentPage = page;
            fetchProducts(currentPage);
        });
        pagination.appendChild(button);
    }

    const nextButton = document.createElement("button");
    nextButton.innerHTML = "&#8594;";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            fetchProducts(currentPage);
        }
    });
    pagination.appendChild(nextButton);
}
fetchProducts(currentPage);