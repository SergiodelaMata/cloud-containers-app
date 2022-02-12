const cancelTransactionsButtons = document.getElementsByClassName("cancel-transaction");

const cancelTransaction = async function () {
  const transactionId = this.getAttribute("transactionId");
  var actionConfirmed = confirm("¿Estás seguro de que desea cancelar la transacción?");
  if(actionConfirmed) {
      const status = await deleteRequest("/admin/transaction/" + transactionId);
      if(status.status == "cancel")
      {
        alert("La transacción ha sido cancelada");
        location.reload();
      }
      else {
        alert("La transacción no podido realizarse, disculpe las molestias.");
      }
  }
};

for (var i = 0; i < cancelTransactionsButtons.length; i++) {
  cancelTransactionsButtons[i].addEventListener("click", cancelTransaction, false);
}
