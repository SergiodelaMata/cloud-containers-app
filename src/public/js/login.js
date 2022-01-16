const form = document.getElementById("form-login");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = formSerializer(event);
  const statusRegister = await postRequest("/login", formData);
  if(statusRegister.logged)
  {
    window.location.href = "/";
  }
  else
  {
    alert("El correo o la contraseña que ha introducido es incorrecta. Por favor, introduzca de nuevo estos campos.")
  }
});
