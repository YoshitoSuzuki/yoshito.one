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
document.addEventListener("DOMContentLoaded", function () {
    // 入力欄でEnterキーが押されたらボタンをクリックする
    document.getElementById("password").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // デフォルトのフォーム送信を防ぐ
            submitForm(); // ボタンがクリックされた時と同じ処理を実行
        }
    });
});
