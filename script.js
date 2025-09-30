function showAlert() {
    alert("Welcome to our store!");
}

function buyProduct() {
    alert("Product added to cart!");
}

function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    if (name == "" || email == "") {
        alert("Please fill in all fields");
        return false;
    }
    alert("Message sent!");
    return true;
}