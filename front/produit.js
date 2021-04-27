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
		// ajout du produit dans le panier
		Basket.addProduct(product);
		//Redirection vers le panier ou l'accueil suivant le choix de l'utilisateur
		goToBasket(product.name);
	});
}

function goToBasket(productName) {
	//Fenêtre pop-up permettant de poursuivre vers le panier ou de retourner à l'accueil
	if (
		window.confirm(`${productName} a bien été ajouté au panier

"OK" pour consulter le panier.

"Annuler" pour revenir à l'accueil et continuer vos achats !`)
	) {
		window.location.href = `panier.html?lastAddedProductName=${productName}`;
	} else {
		window.location.href = "index.html";
	}
}
