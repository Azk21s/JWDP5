(async () => {
	const productId = urlSearchParams();
	const productData = await getData(productId);
	pageFeed(productData);

	// console.log(productData); // Ok
})();

function urlSearchParams() {
	return new URL(window.location.href).searchParams.get("id");
}
// console.log(urlSearchParams());

function getData(productId) {
	return fetch(`http://localhost:3000/api/teddies/${productId}`)
		.catch(error => {
			console.log(error);
		})
		.then(httpBodyResponse => httpBodyResponse.json())
		.then(productData => productData);
}

//Remplissage de la page avec les données du produit sélectionné
function pageFeed(product) {
	document.getElementById("productImg").src = product.imageUrl;
	document.getElementById("productName").textContent = product.name;
	document.getElementById("productPrice").textContent = (product.price / 100).toFixed(2) + "€";
	document.getElementById("productInfo").textContent = product.description;
	document.getElementById("productColors");

	const mySelect = document.querySelector("select");
	product.colors.forEach(color => {
		let newOption = document.createElement("option");
		newOption.textContent = color;
		newOption.value = color;

		mySelect.appendChild(newOption);
	});

	// Add event listeners on button

	document.getElementById("addTo").addEventListener("click", event => {
		event.preventDefault();
		Basket.addProduct(product);
		goToBasket(product.name);
	});
}

// // Add event listeners on button

// document.getElementById("addTo").addEventListener("click", event => {
// 	event.preventDefault();
// 	addProduct(product);
// 	toBasket(product.name);
// });

// const product = {
// 	productName: getData(productId).productName,
// 	selectedProductId: getData(productId)._id,
// 	quantity: 1,
// 	price: (getData(productId).price / 100).toFixed(2)
// };
// console.log(product);

// const addProduct = product;

function goToBasket(productName) {
	window.location.href = `${window.location.origin}/panier.htmllastAddedProductName=${productName}`;
}
