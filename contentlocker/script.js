function submitForm() {
    var password = document.getElementById("password").value;
    var url = "https://script.google.com/macros/s/AKfycbwbo1bfwieEI814LgJnKaoNTSraTDrQmtnkFviqaoUYYGGXg9fkcA54hEipEnITyHyS4Q/exec?password=" + encodeURIComponent(password);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("content").innerHTML = data.content;
                document.getElementById("content").style.display = 'block';
            } else {
                alert("パスワードが間違っています。");
            }
        });
}
