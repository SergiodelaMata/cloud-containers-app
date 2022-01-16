const form = document.getElementById("form-register");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = formSerializer(event);
  const statusRegister = await postRequest("/register", formData);
  if(statusRegister.status == "Registered")
  {
    window.location.href = "/";
  }
  else if (statusRegister.status == "Error with insertion")
  {
    alert("El usuario ya se encuentra registrado.");
  }
  else if (statusRegister.status == "Password different")
  {
    alert("Las contraseñas introducidas no coinciden o están vacíos sus campos. Por favor, introduzcalas de nuevo.");
  }
  else
  {
    alert("Alguno de los campos no está completo. Por favor, rellene los campos que faltan.");
  }
});
