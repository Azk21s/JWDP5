(async function() {
    await getTeddies()
}) ()

function getTeddies() {
    fetch("http://localhost:3000/api/teddies")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(teddies) {
            console.log(teddies)

            for (teddy of teddies){
                displayTeddy(teddy)
            }
        })
        .catch(function(error) {
            alert("serveur HS")
        })       
}

function displayTeddy(teddy) {
    const templateElt = document.getElementById("product")
    const copyElt = document.importNode(templateElt.content, true)
    
    copyElt.getElementById("teddy_img").src = teddy.imageUrl
    copyElt.getElementById("teddy_name").textContent = teddy.name
    copyElt.getElementById("teddy_price").textContent = (teddy.price/100).toFixed(2) + '€' 
    copyElt.getElementById("teddy_infos").textContent = teddy.description
    copyElt.getElementById("teddy_link").href = '/produit.html?id=${teddy._id}'

    

    document.getElementById("displayProducts").appendChild(copyElt)
}

 
    
    
    
    // // Ajouts des informations au html //

// function addInformations (responseProduct, section) {
//     let div = document.createElement("div");
//     div.innerHTML = responseProduct.name;
//     div.setAttribute("class", "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3");

//     let img = document.createElement(img);
//     img.setAttribute("src", responseProduct.imageUrl);
//     img.setAttribute("width", "100%");

//     let describ = document.createElement("div");
//     describ.innerHTML = responseProduct.description;

//     let colors = document.createElement("p");
//     colors.innerHTML = "Choisissez une couleur:" + responseProduct.colors;

//     let price = document.createElement ("p");
//     price.innerHTML = responseProduct.price + "£";

//     let link = document.createElement("a");
//     link.setAttribute("href", "produit.html?id=" + responseProduct._id);

//     section[1].appendChild(div);
//     div.appendChild(link)
//     link.appendChild(img);
//     div.appendChild(describ);
//     div.appendChild(colors);
//     div.appendChild(price);
// }

// // ajoute une div //

// function addDiv(section) {
//     let div2 = document.createElement("div");
//     div.setAttribute("class", "col-md-5 mt-5mb-4 ml-4 mr-4");
//     section[1].appendChild(div);
// }

// get("http://localhost:3000/api/teddies")
//     .then(function (response) {
//         const section = document.getElementsByClassName("row");

//         for  (let i=0; i < response.length; i = i + 1) {
//             addProduct(response[i], section);
//         } 
//         if (response.length % 2 === 1) {
//             addDiv(section);  
//     }
//     })
//     .catch(function (err) {
//         console.log(err);
//         if (err === 0) {
//           alert("serveur hors-ligne"); 
//         }
//     });

// const { response } = require("express");
// const { get } = require("mongoose");

// var request = new XMLHttpRequest();
// request.onreadystatechange = function() {
//     if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//         var response = JSON.parse(this.responseText);

//         console.log(response);

//         let article = document.createElement("div");

//         response.forEach(element => {
//             article.append(element.description);
//             article.appendChild(document.createElement("br"));
//         });

//         const main = document.getElementById("article").appendChild(article);
//     }
// };
// request.open("GET", "http://localhost:3000/api/teddies");
// request.send();
  

// EXEMPLE

// let card = document.querySelector(".card");
// let product = document.querySelector("#product")

// ajaxGet(":http://localhost:3000/api/teddies")
//     .then(function (response){
//         showcard(response);
//         fillingcard(response);
//       })
//       .catch(function (err) {
//         console.log(err);
//         alert("serveur HS");
//       });

// function showcard(response) {
//     for (let j = 0; j < response.length - 1; j++) {
//     let clone = card.cloneNode(true);
//     product.appendChild(clone);
// }
// }      

// function fillingcard(response) {
//     let carteClone = document.querySelectorAll(".card");
//     let describ = document.querySelectorAll(".card-text");
//     let img = document.querySelectorAll(".card-img");
//     let title = document.querySelectorAll(".titre1");
//     let prix = document.querySelectorAll(".price");
//     console.log(carteClone);

//    for (let i = 0; i < response.length; i++) {
//         describ[i].textContent = response[i].description;
//          img[i].setAttribute("src", response[i].imageUrl);
//          img[i].setAttribute("height", "330px");
//          title[i].textContent = "name : " + response[i].name;
//          prix[i].textContent = "Prix : " + response[i].price + " euro";
    
//          console.log("http://localhost:3000/api/teddies" + response[i]._id);
    
//          let pageProduit = document.querySelectorAll(".page2");
//          pageProduit[i].href = "produit.html?/id=" + response[i]._id;
//          console.log(pageProduit);
//        }
//      }    




