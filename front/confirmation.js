(() => {
	const orderId = new URL(location.href).searchParams.get("orderId") || "HS";
	document.getElementById("orderId").textContent = orderId;
	document.getElementById("finalPrice").textContent = Basket.basketTotal().toFixed(2) + "€";
})();

// Add event boutton de retour à l'accueil
document.getElementById("homeBtn").addEventListener("click", event => {
	event.preventDefault();
	window.location.href = `index.html`;
	localStorage.removeItem("basketKey");
});
