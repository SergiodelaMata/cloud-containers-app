const form = document.getElementById("form-product");
var selectBox = document.getElementById("productName");

async function selectedGame(){
  const selectedValue = selectBox.options[selectBox.selectedIndex].value;
  if(selectedValue != "-")
  {
    const productData = await getProductByName();
    const maxQuantity = productData.productData.quantity;
    const price = productData.productData.price;
    document.getElementById("name").value = selectedValue;
    document.getElementById("quantity").max = maxQuantity;
    document.getElementById("quantity").value = 0;
    document.getElementById("price").value = price + "\u20AC";
  }
  else
  {
    document.getElementById("name").value = "-";
    document.getElementById("quantity").max = 0;
    document.getElementById("quantity").value = 0;
    document.getElementById("price").value = "";
  }

}

async function getProductByName(){
  const selectedValue = selectBox.options[selectBox.selectedIndex].value;
  const productData = await getRequest("/products/productByName/"+selectedValue);
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