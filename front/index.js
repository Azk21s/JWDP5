(async function () {
	await getTeddies();
})();

function getTeddies() {
	fetch("http://localhost:3000/api/teddies")
		.then(function (httpBodyResponse) {
			return httpBodyResponse.json();
		})
		.then(function (teddies) {
			for (teddy of teddies) {
				displayTeddy(teddy);
			}
		})
		.catch(function (error) {
			alert("serveur HS");
			console.log(error);
		});
}

// Affichage des produits
function displayTeddy(teddy) {
	//Récupération du template produit
	const templateElt = document.getElementById("product");
	//Génère une copie pour chaque produit à partir du template
	const copyElt = document.importNode(templateElt.content, true);
	//Remplissage des fiches produits avec les données de l'API
	copyElt.getElementById("teddy_img").src = teddy.imageUrl;
	copyElt.getElementById("teddy_name").textContent = teddy.name;
	copyElt.getElementById("teddy_price").textContent = (teddy.price / 100).toFixed(2) + "€";
	copyElt.getElementById("teddy_infos").textContent = teddy.description;
	copyElt.getElementById("teddy_link").href = `produit.html?id=${teddy._id}`;
	//Display final
	document.getElementById("displayProducts").appendChild(copyElt);
}
