
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { AsyncCompiler } from "sass";


const firebaseConfig = {
    apiKey: "AIzaSyCRb0CFMftKE5fZJ4f8Ak30C_COtNMJPuQ",
    authDomain: "novashop-46ea4.firebaseapp.com",
    projectId: "novashop-46ea4",
    storageBucket: "novashop-46ea4.appspot.com",
    messagingSenderId: "211492137839",
    appId: "1:211492137839:web:bd8bd82f3c9df9cc48969a"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(products => {

        for (let product of products) {
            document.getElementById("products").innerHTML += `
                <div class="card mx-auto" style="width: 18rem;">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <a  class="btn btn-primary add-prouduct" data-id='${product.id}'>Check</a>
                    </div>
                </div>
            `;
        }


        for (let el of document.getElementsByClassName("add-product")) {
            el.onclick = async function () {
                const user = doc(db, "users", localStorage.getItem("users"));
                const data = await getDocs(user)

                const products = data.data().products
                const newProducts = new Set([...products, +this.dataset.id])

                await updateDoc(user, {
                    products: [...newProducts]
                });
                console. log ('product added')
            }
        }

    })

document.getElementById('registerForm').onsubmit = async function (e) {
    e.preventDefault();

    const name = document.getElementById('registerInputName').value;
    const email = document.getElementById('registerInputEmail').value;
    const password = document.getElementById('registerInputPassword').value;
    const check = document.getElementById('registerCheck').value;

    await addDoc(collection(db, "users"), { name, email, password, check });

    console.log('works')
}

document.getElementById('loginForm').onsubmit = async function (e) {
    e.preventDefault();

    const email = document.getElementById('loginInputEmail').value;
    const password = document.getElementById('loginInputPassword').value;

    const q = query(collection(db, "users"), where("email", "==", email), where("password", "==", password));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => localStorage.setItem("user", doc.id));

    console.log('works')
}
