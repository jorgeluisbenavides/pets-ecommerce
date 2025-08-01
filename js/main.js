const formLogin = document.getElementById("formLogin");
formLogin.addEventListener("click", function (event) {
  signIn(event);
});

function signIn(event) {
  event.preventDefault(); // evita el envio automatico

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const emailInput = document.getElementById("email");

  // limpia las clases en el input
  emailInput.classList.remove("error");
  emailInput.classList.remove("success");

  if (email === "") {
    emailInput.classList.add("error");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailInput.classList.add("error");
    return;
  }
  emailInput.classList.add("success");

  console.log(email, password);
  // window.location.href = "https://www.google.com";
}

function validEmail() {}
