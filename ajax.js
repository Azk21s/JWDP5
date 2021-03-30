// function ajaxPost(url, data) {
//     const promise = new Promise(function (resolve, reject) {
//       const req = new XMLHttpRequest();
//       req.open("POST", url);
//       req.setRequestHeader("Content-Type", "application/json");
//       req.onreadystatechange = function () {
//         if (req.status >= 201 && req.readyState < 400) {
//           resolve(JSON.parse(req.responseText));
//         } else {
//           reject(req.status);
//         }
//       };
//       req.send(data);
//     });
//     return promise;
//   }
  
//   // Exécute un appel AJAX GET
//   // Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
//   function ajaxGet(url) {
//     const promise = new Promise(function (resolve, reject) {
//       const req = new XMLHttpRequest();
//       req.open("GET", url);
//       req.onreadystatechange = function () {
//         if (req.readyState === XMLHttpRequest.DONE) {
//           if (req.status === 200) {
//             resolve(JSON.parse(req.responseText));
//           } else {
//             reject(req.status);
//           }
//         }
//       };
//       req.send();
//     });
//     return promise;
//   }