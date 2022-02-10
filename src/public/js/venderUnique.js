const formProduct = document.getElementById("form-product");

formProduct.addEventListener("submit", async (event) => {
  event.preventDefault();
  var formData = formSerializer(event);
  const statusSell = await postRequest("/vender", formData);

  if(statusSell.statusSell == "Sell")
  {
    alert("Se ha podido realizar la operación correctamente.");
    window.location.href = "/";
  }
  else
  {
    alert("Error al tratar realizar la transacción. Por favor, inténtelo más tarde");
  }

});

async function getProductById(){
  console.log("hola");
  const productData = await getRequest("/product/"+value[0]);
  return productData;
}
