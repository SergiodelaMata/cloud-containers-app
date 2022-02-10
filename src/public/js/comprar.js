const form = document.getElementById("form-product");
var selectProduct = document.getElementById("productName");

async function selectedGame(){
  const selectedValue = getSelectValues(selectProduct);

  if(selectedValue != "-")
  {
    const productData = await getProductById();
    const maxQuantity = productData.productData.quantity;
    const price = productData.productData.price;
    document.getElementById("productId").value = selectedValue;
    document.getElementById("quantity").max = maxQuantity;
    document.getElementById("quantity").value = 0;
    document.getElementById("price").value = price + "\u20AC";
  }
  else
  {
    document.getElementById("productId").value = "-";
    document.getElementById("quantity").max = 0;
    document.getElementById("quantity").value = 0;
    document.getElementById("price").value = "";
  }

}

async function getProductById(){
  const selectedValue = getSelectValues(selectProduct);
  const productData = await getRequest("/product/"+selectedValue);
  return productData;
}

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