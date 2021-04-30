// panier -----------------------------------

(() => {
	const inTheBasket = Basket.products;
	if (inTheBasket === null) return;
	pageGenerator(inTheBasket);
})();

function pageGenerator(inTheBasket) {
	// Calcul du prix total du panier
	document.getElementById("totalPrice").textContent = Basket.basketTotal() + ".00€";

	// Boucle produits et affichage
	const productList = Object.values(inTheBasket);
	productList.forEach(product => {
		basketFeed(product);
	});

	allFormEvents();
}

function basketFeed(product) {
	const tableTemplate = document.getElementById("tableTemplate");
	const copyElt = document.importNode(tableTemplate.content, true);

	copyElt.getElementById("productName").textContent = product.name;
	copyElt.getElementById("productQt").selectedIndex = product.quantity - 1;
	copyElt.getElementById("productPrice").textContent = (product.price / 100).toFixed(2) + "€";
	copyElt.getElementById("productTotal").textContent =
		((product.price * product.quantity) / 100).toFixed(2) + "€";

	// Add events

	// Vide tout le panier + le local storage
	document.getElementById("clear-command").addEventListener("click", event => {
		event.preventDefault();
		localStorage.clear();
		location.reload();
	});
	// -------------------------------------------------

	// Supprime le produit du panier ---- NE FONCTIONNE PAS
	// -------------------------------------------------
	// document.getElementById("trash").addEventListener("click",
	// event => {
	// 	event.preventDefault();
	// 	delete inTheBasket
	// 	location.reload;
	// });
	// --------------------------------------------------

	// Permet de choisir la quantité pour un article
	copyElt.getElementById("productQt").addEventListener("change", event => {
		event.preventDefault();

		Basket.refreshProductQty(product._id, event.target.selectedIndex + 1);

		// Calcul du prix total pour un produit suivant la quantité choisie
		const totalArticle = event.target.parentElement.parentElement.parentElement.querySelector(
			"#productTotal"
		);
		const newPrice = (product.price * Basket.productQty(product._id)) / (100).toFixed(2) + "€";
		totalArticle.textContent = newPrice;

		// Calcul du prix total du panier
		document.getElementById("totalPrice").textContent = Basket.basketTotal().toFixed(2) + "€";
	});

	// Affiche des templates
	document.getElementById("tableBody").appendChild(copyElt);
}

// ------------- Formulaire de commande ---------------------

function allFormEvents() {
	// Boutton "valider la commande"
	document.getElementById("proceedCmd").addEventListener("click", event => {
		event.preventDefault();
		proceedOrder();
	});

	// Validation des différents inputs du formulaire de commande :

	watchValidity(document.getElementById("fName"), event => event.target.value.length > 1); // Prénom

	watchValidity(document.getElementById("lName"), event => event.target.value.length > 1); // Nom

	watchValidity(document.getElementById("email"), event => {
		const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		return emailValidator.test(event.target.value);
	}); // Email

	watchValidity(document.getElementById("adress"), event => event.target.value.length > 5); // Adresse postale

	watchValidity(document.getElementById("city"), event => event.target.value.length > 1); // Ville

	watchValidity(document.getElementById("country"), event => (event.target.value = "France")); // Pays

	watchValidity(document.getElementById("zipCode"), event => {
		const zipcodeValidator = /^(?:[0-8]\d|9[0-8])\d{3}$/;
		return zipcodeValidator.test(event.target.value);
	}); // Code postal
}

function watchValidity(elt, condition) {
	elt.oninput = event => {
		if (condition(event)) {
			goodInput(event.target);
		} else {
			neutralInput(event.target);
		}
	};

	elt.onblur = event => {
		if (!condition(event)) {
			badInput(event.target);
		}
	};
}

function goodInput(elt) {
	elt.style.border = "solid 2px green";
}

function badInput(elt) {
	elt.style.border = "solid 2px red";
}

function neutralInput(elt) {
	elt.style.border = "";
}

function proceedOrder() {
	const firstname = document.getElementById("fName").value;
	const lastname = document.getElementById("lName").value;
	const email = document.getElementById("email").value;
	const adress = document.getElementById("adress").value;
	const city = document.getElementById("city").value;
	const country = document.getElementById("country").value;
	const zipcode = document.getElementById("zipCode").value;

	const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const zipcodeValidator = /^(?:[0-8]\d|9[0-8])\d{3}$/;

	if (
		!(
			firstname.length > 1 &&
			lastname.length > 1 &&
			emailValidator.test(email) &&
			adress.length > 5 &&
			zipcodeValidator.test(zipcode) &&
			city.length > 1
		)
	) {
		alert("Merci de remplir les champs correctement");
		return;
	}

	const products = Object.values(Basket.products).map(product => {
		return product._id;
	});

	const order = {
		contact: {
			firstName: firstname,
			lastName: lastname,
			address: adress + " " + zipcode,
			city: city,
			country: country,
			email: email
		},
		products: products
	};

	const toPost = {
		method: "POST",
		body: JSON.stringify(order),
		headers: { "Content-Type": "application/json; charset=utf-8" }
	};

	fetch(`http://localhost:3000/api/teddies/order`, toPost)
		.then(response => response.json())
		.then(json => {
			console.log(json);
			localStorage.removeItem("basketKey");
			window.location.href = `confirmation.html?orderId=${json.orderId}`;
		})
		.catch(() => {
			alert(error);
		});
}
