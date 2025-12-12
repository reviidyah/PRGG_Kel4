function validasi() {
    var password = document.getElementById("password").value;
    var modal = document.getElementById("myModal");
    var modalMessage = document.getElementById("modalMessage");

    if (password !== "Selesai") {
        modalMessage.innerHTML = "Error";
        modal.style.display = "block";
        return false;
    }

    modalMessage.innerHTML = "Password benar!";
    modal.style.display = "block";
    return false;
}

function tutupModal() {
    document.getElementById("myModal").style.display = "none";
}