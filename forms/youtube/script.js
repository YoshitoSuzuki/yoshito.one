const scriptURL = 'https://script.google.com/macros/s/AKfycbyQVwqzUZS6YCaeFbrgU6H8jARdmCtsB1_ieZpAUmYFFlcxfGGzxW9Zh1KaN3Mvl-RScg/exec';

function login() {
    const id = document.getElementById("userID").value;
    const password = document.getElementById("userPass").value;

    const formData = new FormData();
    formData.append('mode', 'login');
    formData.append('id', id);
    formData.append('password', password);

    fetch(scriptURL, {
    method: 'POST',
    body: formData
    }).then(res => res.json())
    .then(data => {
        if (data.status === "success") {
        localStorage.setItem("savedID", id);
        localStorage.setItem("savedPass", password);
        showUser(data);
        } else {
        document.getElementById("result").innerText = data.message;
        }
    });
}

function showUser(data) {
    document.getElementById("result").innerHTML = `
    <p><strong>名前:</strong> ${data.name}</p>
    <p><strong>メール:</strong> ${data.email}</p>
    <p><strong>情報:</strong> ${data.info}</p>
    `;
    document.getElementById("editForm").style.display = "block";
}

function updateInfo() {
  const id = localStorage.getItem("savedID");
  const pass = localStorage.getItem("savedPass");

  // 入力欄の値を取得
  const inputName = document.getElementById("editName").value;
  const inputEmail = document.getElementById("editEmail").value;
  const inputInfo = document.getElementById("editInfo").value;
  const inputNewID = document.getElementById("editNewID").value;
  const inputNewPass = document.getElementById("editNewPass").value;

  // 空欄なら現在の値を使う
  const name = inputName || currentName;
  const email = inputEmail || currentEmail;
  const info = inputInfo || currentInfo;
  const newID = inputNewID || id;
  const newPass = inputNewPass || pass;

  const formData = new FormData();
  formData.append("mode", "update");
  formData.append("id", id);
  formData.append("password", pass);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("info", info);
  formData.append("newID", newID);
  formData.append("newPass", newPass);

  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      alert("更新しました！");
      localStorage.setItem("savedID", newID);
      localStorage.setItem("savedPass", newPass);
    } else {
      alert("更新失敗：" + data.message);
    }
  });
}



// 自動ログイン（保存されていれば）
window.onload = function () {
    const id = localStorage.getItem("savedID");
    const pass = localStorage.getItem("savedPass");
    if (id && pass) {
    document.getElementById("userID").value = id;
    document.getElementById("userPass").value = pass;
    login();
    }
};

function handleLoginSubmit(event) {
    event.preventDefault(); // ページの再読み込みを防ぐ
    login();                // ログイン処理を呼び出す
}

function handleUpdateSubmit(event) {
    event.preventDefault();
    updateInfo();           // 更新処理を呼び出す
}

let currentName = "";
let currentEmail = "";
let currentInfo = "";

function showUser(data) {
  // 現在の情報を変数に保存
  currentName = data.name;
  currentEmail = data.email;
  currentInfo = data.info;

  document.getElementById("result").innerHTML = `
    <p><strong>名前:</strong> ${data.name}</p>
    <p><strong>メール:</strong> ${data.email}</p>
    <p><strong>情報:</strong> ${data.info}</p>
  `;
  document.getElementById("editForm").style.display = "block";
}
