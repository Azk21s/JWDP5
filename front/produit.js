(async () => {
	const productId = urlSearchParams();
	const productData = await getProductData(productId);
	pageFeed(productData);

	// console.log(productData); // Ok
})();

function urlSearchParams() {
	return new URL(window.location.href).searchParams.get("id");
}
// console.log(urlSearchParams())

function getProductData(productId) {
	return fetch(`http://localhost:3000/api/teddies/${productId}`)
		.catch(error => {
			console.log(error);
		})
		.then(httpBodyResponse => httpBodyResponse.json())
		.then(productData => productData);
}
// console.log(getProductData(productId))

//Remplissage de la page avec les données du produit sélectionné
function pageFeed(product) {
	document.getElementById("productImg").src = product.imageUrl;
	document.getElementById("productName").textContent = product.name;
	document.getElementById("productPrice").textContent = (product.price / 100).toFixed(2) + "€";
	document.getElementById("productInfo").textContent = product.description;
	document.getElementById("productColors");

	const mySelect = document.querySelector("select");
	product.colors.forEach(color => {
		// const copyElt = document.importNode(mySelect.content, true);

		let newOption = document.createElement("option");
		newOption.textContent = color;
		newOption.value = color;

		mySelect.appendChild(newOption);
	});
}

// Add event listeners on button

document.getElementById("addTo").addEventListener("click", event => {
	event.preventDefault();
	addProduct(product);
	redirectToShoppingCart(product.name);
});
