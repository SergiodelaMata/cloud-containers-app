const deleteUserButtons = document.getElementsByClassName("delete-user");

const deleteUser = async function () {
    var actionConfirmed = confirm("¿Estás seguro de que desea eliminar a este usuario?");
    if(actionConfirmed) {
      const userId = this.getAttribute("userId");
      const response = await deleteRequest(`/admin/user/${userId}`);
      console.log(response);
      alert("El usuario ha sido eliminado");
      location.reload();
    }
  };

  for (var i = 0; i < deleteUserButtons.length; i++) {
    deleteUserButtons[i].addEventListener("click", deleteUser, false);
  }