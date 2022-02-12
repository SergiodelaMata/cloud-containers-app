const form = document.getElementById("form-login");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = formSerializer(event);
  const statusRegister = await postRequest("/login", formData);
  if(statusRegister.logged && !statusRegister.block)
  {
    window.location.href = "/";
  }
  else if(statusRegister.block)
  {
    alert("Lo siento, pero su cuenta ha sido bloqueada temporalmente por incumplimiento de las políticas de la página.")
  }
  else
  {
    alert("El correo o la contraseña que ha introducido es incorrecta. Por favor, introduzca de nuevo estos campos.")
  }
});
