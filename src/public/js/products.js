const modifyProductsButtons = document.getElementsByClassName("modify-product");
const deleteProductsButtons = document.getElementsByClassName("delete-product");

const editProduct = async function(){
  const productId = this.getAttribute("productId");
  window.location.href = "/products/" + productId;
}

const deleteProduct = async function () {
  const productId = this.getAttribute("productId");
  var actionConfirmed = confirm("¿Estás seguro de que desea eliminar este videojuego?");
  if(actionConfirmed) {
      await deleteRequest("/admin/product/" + productId);
      alert("El videojuego ha sido eliminado");
      location.reload();
  }
};

for (var i = 0; i < modifyProductsButtons.length; i++) {
  modifyProductsButtons[i].addEventListener("click", editProduct, false);
}

for (var i = 0; i < deleteProductsButtons.length; i++) {
  deleteProductsButtons[i].addEventListener("click", deleteProduct, false);
}
