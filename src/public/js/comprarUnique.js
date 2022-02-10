const form = document.getElementById("form-product");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  var formData = formSerializer(event);
  const statusBuy = await postRequest("/comprar", formData);

  if(statusBuy.statusBuy == "Buy")
  {
    alert("Se ha podido realizar la operación correctamente.");
    window.location.href = "/";
  }
  else
  {
    alert("Error al tratar realizar la transacción. Por favor, inténtelo más tarde");
  }

});