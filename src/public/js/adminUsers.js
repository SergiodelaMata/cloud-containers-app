const deleteUserButtons = document.getElementsByClassName("delete-user");
const blockUserButtons = document.getElementsByClassName("block-user");
const removeBlockUserButtons = document.getElementsByClassName("remove-block-user");

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

const blockUser = async function () {
  var actionConfirmed = confirm("¿Estás seguro de que desea bloquear a este usuario?");
  if(actionConfirmed) {
    const userEmail = this.getAttribute("userEmail");
    const response = await putRequest(`/block/${userEmail}`, null);
    console.log(response);
    alert("El usuario ha sido bloqueado");
    location.reload();
  }
};

const removeBlockUser = async function () {
  var actionConfirmed = confirm("¿Estás seguro de que desea desbloquear a este usuario?");
  if(actionConfirmed) {
    const userEmail = this.getAttribute("userEmail");
    const response = await deleteRequest(`/removeBlock/${userEmail}`);
    console.log(response);
    alert("El usuario ha sido desbloqueado");
    location.reload();
  }
};

for (var i = 0; i < deleteUserButtons.length; i++) {
  deleteUserButtons[i].addEventListener("click", deleteUser, false);
}

for (var i = 0; i < blockUserButtons.length; i++) {
  blockUserButtons[i].addEventListener("click", blockUser, false);
}

for (var i = 0; i < removeBlockUserButtons.length; i++) {
  removeBlockUserButtons[i].addEventListener("click", removeBlockUser, false);
}