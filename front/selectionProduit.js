class CartObject {
	// ajout de l'objet dans le local storage
	get products() {
		return JSON.parse(localStorage.getItem("shoppingCart") || "{}");
	}
	// conversion en format JSON de la clé produit
	set products(products) {
		localStorage.setItem("shoppingCart", JSON.stringify(products));
	}

	addProduct(productObject) {
		let products = this.products;
		const alreadyAdded = !!products[productObject._id];

		if (alreadyAdded) {
			// Augmente la quantité
			products[productObject._id].quantity++;
		} else {
			// Ajoute le produit
			products[productObject._id] = {
				quantity: 1,
				...productObject
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

	getTotalPrice() {
		const products = this.products;
		const totalPrice = Object.values(products).reduce((acc, curr) => {
			return acc + (curr.price * curr.quantity) / 100;
		}, 0);
		return totalPrice;
	}
}

const Basket = new CartObject();
