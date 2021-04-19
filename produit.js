(async () => {
    const productId = urlSearchParams()
    const productData = await getProductData(productId)
    pageFeed(productData)
  })()
  
  function urlSearchParams() {
    return new URL(window.location.href).searchParams.get('id')
  }

function getProductData(productId) {
    return fetch(`http://localhost:3000/api/teddies?${productId}`)
      .catch((error) => {
        console.log(error)
      })
      .then((httpBodyResponse) => httpBodyResponse.json())
      .then((productData) => productData)
  }
  
//Remplissage de la page avec les données du produit sélectionné
function pageFeed(product) {
    document.getElementById("productImg").src = product.imageUrl
    document.getElementById("productName").textContent = product.name
    document.getElementById("productPrice").textContent = (product.price/100).toFixed(2) + "€" 
    document.getElementById("productInfo").textContent = product.description
}
    // const mySelect = document.getElementById("productColors")
    
    // product.colors.forEach((color) => {
    //     let newOption = document.createElement("option")
    //     newOption.innerHTML= element
    //     mySelect.appendChild(newOption)
    // })
   








    
 // Add event listeners on button
//   document.getElementById('addTo').onclick = (event) => {
//     event.preventDefault()
//     Cart.addProduct(product)
//     redirectToShoppingCart(product.name)
//   }













