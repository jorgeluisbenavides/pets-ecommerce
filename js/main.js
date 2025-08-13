const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const expresionPassword = /^[{a-z}]{5,10}$/;
const keyToken = "token";

const formLogin = document.getElementById("formLogin");
if (formLogin !== null) {
  formLogin.addEventListener("click", function (event) {
    signIn(event);
  });
}

const isExistMenu = document.getElementById("menu");
if (isExistMenu) {
  showUserName();
}

function showUserName() {
  const sesion = localStorage.getItem(keyToken);
  const li = document.createElement("li");
  const a = document.createElement("a");

  if (sesion) {
    const icono =
      "<span class='material-symbols-outlined' style='font-size: 15px;'>" +
      "logout" +
      "</span>";

    a.innerHTML = "<div class='icon-box'><span>Salir</span>" + icono + "</div>";
    a.addEventListener("click", function () {
      closeSession();
    });
    li.appendChild(a);
  } else if (!sesion) {
    const icono =
      "<span class='material-symbols-outlined' style='font-size: 15px;'>" +
      "login" +
      "</span>";

    a.innerHTML =
      "<div class='icon-box'><span>Entrar</span>" + icono + "</div>";
    a.addEventListener("click", function () {
      goLogin();
    });
    li.appendChild(a);
  }

  isExistMenu.appendChild(li);
}

function closeSession() {
  localStorage.removeItem(keyToken);
  window.location.reload();
}

function goLogin() {
  window.location.href = "login.html";
}

function signIn(event) {
  event.preventDefault(); // evita el envio automatico

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const message = document.getElementById("message");

  // limpiar las clases en el input
  email.classList.remove("error");
  email.classList.remove("success");
  password.classList.remove("error");
  password.classList.remove("success");

  if (email.value.trim() === "") {
    email.classList.add("error");
  }

  if (!expresionEmail.test(email.value.trim())) {
    email.classList.add("error");
    message.textContent = "Correo no válido";
    message.classList.add("message-error");
    return;
  }

  if (password.value.trim() === "") {
    password.classList.add("error");
  }

  if (!expresionPassword.test(password.value.trim())) {
    password.classList.add("error");
    message.textContent = "Contraseña no válida";
    return;
  }

  email.classList.add("success");
  password.classList.add("success");
  message.classList.add("message-success");
  message.textContent = "Iniciando...";

  const payload = JSON.stringify({
    email: email.value,
    password: password.value,
  });

  fetch("https://reqres.in/api/login", {
    method: "POST", // put //patch necesitan un body
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1",
    },
    body: payload,
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(keyToken, data.token);
        window.location.href = "index.html";
      } else {
        message.classList.remove("message-success");
        message.classList.add("message-error");
        message.textContent = "La información no es válida!";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

/***********Corousel**********/
const track = document.getElementById("carousel-track");
if (track) {
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let currentIndex = 0;

  function updateSleidePosition() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevBtn.addEventListener("click", function () {
    currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    updateSleidePosition();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSleidePosition();
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSleidePosition();
  }, 5000); //milisegundos
}

/*** products*/

const productsHome = document.getElementById("products-home");
if (productsHome) {
  fetch("./js/products.json")
    .then((response) => response.json())
    .then((response) => {
      response.forEach((producto) => {
        const price = new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
        }).format(producto.price);

        const cardProduct = `<div class="product-card">
        <img src="./img/products/${producto.image}" alt="${producto.image}"></img>
        <div class="product-name">${producto.name}</div>
        <div class="product-price">${price}</div>
      </div>`;

        const div = document.createElement("div");
        div.innerHTML = cardProduct;
        productsHome.appendChild(div);
      });
    });
}

/** categories **/
const categoriesHome = document.getElementById("categories-home");
if (categoriesHome) {
  fetch("./js/categories.json")
    .then((response) => response.json())
    .then((response) => {
      response.forEach((category) => {
        const cardCategory = `<div class="product-card">
        <img src="./img/categories/${category.image}" alt="${category.name}"></img>
        <div class="product-name">${category.name}</div>
      </div>`;

        const div = document.createElement("div");
        div.innerHTML = cardCategory;
        categoriesHome.appendChild(div);
      });
    });
}

/*** products search ****/

const searchProducts = document.getElementById("search-products");

if (searchProducts) {
  searchProducts.addEventListener("keyup", function () {
    fetch("./js/products.json")
      .then((response) => response.json())
      .then((response) => {
        const respuesta = response.filter((product) =>
          product.name.toLowerCase().includes(searchProducts.value)
        );

        console.log(respuesta);
      });
  });
}
