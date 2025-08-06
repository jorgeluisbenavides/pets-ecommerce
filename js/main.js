const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const expresionPassword = /^[{a-z}+{A-Z}]+$/;

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
  const sesion = localStorage.getItem("sesion");
  if (sesion) {
    const li = document.createElement("li");
    const a = document.createElement("a");

    const icono =
      "<span class='material-symbols-outlined' style='font-size: 15px;'>" +
      "shopping_bag_speed" +
      "</span>";

    a.innerHTML = icono + " Salir";
    a.addEventListener("click", function () {
      closeSession();
    });
    li.appendChild(a);

    isExistMenu.appendChild(li);
  }
}

function closeSession() {
  localStorage.removeItem("sesion");
  window.location.reload();
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

  console.log("valores:", email.value, password.value);
  console.log(!expresionEmail.test(email.value.trim()));
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

  const sessionActive = "1";

  localStorage.setItem("sesion", sessionActive);

  console.log("fin del script");
  window.location.href = "index.html";
}
