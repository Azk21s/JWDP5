var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);

        console.log(response);

        let article = document.createElement("div");

        response.forEach(element => {
            article.append(element.description);
            article.appendChild(document.createElement("br"));
        });

        const main = document.getElementById("articles").appendChild(article);
    }
};
request.open("GET", "http://localhost:3000/api/teddies);
request.send();


// let card = document.querySelector(".card");
// let product = document.querySelector("#product")

// ajaxGet(":http://localhost:3000/api/teddies")
//     .then(function (response){
//         showcard(response);
//         fillingcard(response);
//       })
//       .catch(function (err) {
//         console.log(err);
//         alert("serveur Hors service");
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