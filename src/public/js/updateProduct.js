const form = document.getElementById("form-product");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = formSerializer(event);
  const statusUpdate = await putRequest("/product/update", formData);
  if(statusUpdate.status === "Updated")
  {
    alert("Se han realizado los cambios correctamente.");
    window.location.href = "/products";
  }
  else
  {
    alert("Error al intentar actualizar los datos del producto. Inténtelo más tarde.");
  }
});
