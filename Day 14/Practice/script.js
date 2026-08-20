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

    //     for (let page = 1; page <= totalPages; page++) {

    //         const button = document.createElement("button");

    //         button.textContent = page;


    const pageGroup = Math.floor((currentPage - 1) / 5);

    const startPage = pageGroup * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPages);

    const prevButton = document.createElement("button");
    prevButton.textContent = "<|";
    prevButton.disabled = startPage === 1;

    prevButton.addEventListener("click", () => {
        currentPage = startPage - 1;
        fetchProducts(currentPage);
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
    nextButton.textContent = "|>";
    nextButton.disabled = endPage === totalPages;

    nextButton.addEventListener("click", () => {
        currentPage = endPage + 1;
        fetchProducts(currentPage);
    });

    pagination.appendChild(nextButton);
}

fetchProducts(currentPage);