const form = document.getElementById("form-register");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = formSerializer(event);
  const statusUpdate = await putRequest("/users/user/update", formData);
  if(statusUpdate.status == "Updated data")
  {
    alert("Se han realizado los cambios correctamente.");
    window.location.href = "/";
  }
  else if (statusUpdate.status == "Error with update")
  {
    alert("No se pudieron actualizar los datos del usuario.");
  }
  else if (statusUpdate.status == "Password different")
  {
    alert("Las contraseñas introducidas no coinciden o están vacíos sus campos. Por favor, introduzcalas de nuevo.");
  }
  else
  {
    alert("Alguno de los campos no está completo. Por favor, rellene los campos que faltan.");
  }
});
