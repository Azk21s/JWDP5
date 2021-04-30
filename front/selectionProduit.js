class ItemKeys {
	// ajout de l'objet dans le local storage
	get products() {
		return JSON.parse(localStorage.getItem("basketKey") || "{}");
	}
	// conversion en format JSON de la clé produit
	set products(products) {
		localStorage.setItem("basketKey", JSON.stringify(products));
	}

	addTeddie(teddieObject) {
		let products = this.products;
		const alreadyAdded = !!products[teddieObject._id];

		if (alreadyAdded) {
			// Augmente la quantité
			products[teddieObject._id].quantity++;
		} else {
			// Ajoute le produit
			products[teddieObject._id] = {
				quantity: 1,
				...teddieObject
			};
		}

		this.products = products;
	}

	productQty(productId) {
		const products = this.products;
		return products[productId].quantity;
	}

	refreshProductQty(productId, quantity) {
		const products = this.products;
		products[productId].quantity = quantity;
		console.log(products);
		this.products = products;
	}

	basketTotal() {
		const products = this.products;

		const totalPrice = Object.values(products).reduce((acc, curr) => {
			return acc + (curr.price * curr.quantity) / 100;
		}, 0);
		return totalPrice;
	}
}

const Basket = new ItemKeys();
