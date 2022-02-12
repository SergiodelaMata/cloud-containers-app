const formProduct = document.getElementById("form-product");

const selectProduct = document.getElementById("selectProduct");
var value = getSelectValues(selectProduct);

const nameDiv = document.getElementById("nameDiv");
const descriptionDiv = document.getElementById("descriptionDiv");
const imageDiv = document.getElementById("imageDiv");
const priceDiv = document.getElementById("priceDiv");
const platformDiv = document.getElementById("platformDiv");
const companyDiv = document.getElementById("companyDiv");

const productId = document.getElementById("productId");
const nameField = document.getElementById("name");
const description = document.getElementById("description");
const image = document.getElementById("image");
const quantity = document.getElementById("quantity");
const actualQuantity = document.getElementById("actualQuantity");
const price = document.getElementById("price");
const platform = document.getElementById("platform");
const company = document.getElementById("company");

selectProduct.addEventListener("change", async() =>{
  value = getSelectValues(selectProduct);
  if(value[0] === "-") //Ninguna opción ha sido seleccionada
  {
    productId.value = "-";
    nameField.value = "";
    nameField.removeAttribute("required");
    nameDiv.classList.add("none");
    description.innerHTML = "";
    descriptionDiv.classList.add("none");
    image.value = "";
    imageDiv.classList.add("none");
    actualQuantity.value = "";
    quantity.value = "0";
    platform.value = "";
    platformDiv.classList.add("none");
    company.value = "";
    companyDiv.classList.add("none");
    price.value = "0";
  }
  else if(value[0] === "0") //Nuevo juego
  {
    productId.value = "0";
    nameField.value = "";
    nameField.setAttribute("required", true);
    nameDiv.classList.remove("none");
    description.innerHTML = "";
    descriptionDiv.classList.remove("none");
    image.value = "";
    imageDiv.classList.remove("none");
    actualQuantity.value = "0";
    quantity.value = "0";
    quantity.min = "0";
    price.value = "0";
    price.min = "0";
    price.max = "120";
    price.removeAttribute("readonly");
    platform.value = "";
    platformDiv.classList.remove("none");
    company.value = "";
    companyDiv.classList.remove("none");
  }
  else //Juegos ya disponibles en la plataforma
  {
    nameDiv.classList.add("none");
    nameField.setAttribute("required", true);
    description.text = "";
    descriptionDiv.classList.add("none");
    image.value = "";
    imageDiv.classList.add("none");
    quantity.value = "0";
    quantity.min = "1";
    price.value = "0";
    platformDiv.classList.add("none");
    companyDiv.classList.add("none");

    const productData = await getProductById();
    console.log(productData);
    productId.value = productData.productData.productId;
    nameField.value = productData.productData.name;
    description.innerHTML = productData.productData.description;
    image.value = productData.productData.image;
    quantity.value = "";
    quantity.min = "1";
    quantity.max = "120";
    actualQuantity.value = productData.productData.quantity;
    price.value = productData.productData.price;
    price.min = "0";
    price.max = productData.productData.price;
    price.setAttribute("readonly", true);
    platform.value = productData.productData.platform;
    company.value = productData.productData.company;
  }
})


formProduct.addEventListener("submit", async (event) => {
  event.preventDefault();
  value = getSelectValues(selectProduct);
  if(value[0] !== "-")
  {
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
  }
  else
  {
    alert("Por favor, seleccione un videojuego a vender antes de continuar.")
  }

});

async function getProductById(){
  const productData = await getRequest("/product/"+value[0]);
  return productData;
}
