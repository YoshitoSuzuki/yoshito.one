const scriptURL = 'https://script.google.com/macros/s/AKfycbyQVwqzUZS6YCaeFbrgU6H8jARdmCtsB1_ieZpAUmYFFlcxfGGzxW9Zh1KaN3Mvl-RScg/exec';
let currentName = "", currentEmail = "", currentInfo = "", currentRole = "";

let reloging = false;

document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();

  if (reloging) {
    showLoading("再ログイン中…");
    reloging = false;
  } else {
    showLoading("ログイン中…");
  }

  const id = document.getElementById("userID").value;
  const password = document.getElementById("userPass").value;

  const formData = new FormData();
  formData.append("mode", "login");
  formData.append("id", id);
  formData.append("password", password);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
      hideLoading();

      if (data.status === "success") {
        localStorage.setItem("savedID", id);
        localStorage.setItem("savedPass", password);
        currentName = data.name;
        currentEmail = data.email;
        currentInfo = data.info;
        currentRole = data.role || "user";

        document.getElementById("result").innerHTML = `
          <p><strong>名前:</strong> ${currentName}</p>
          <p><strong>メール:</strong> ${currentEmail}</p>
          <p><strong>情報:</strong> ${currentInfo}</p>
          <p><strong>権限:</strong> ${currentRole}</p>
        `;

        document.getElementById("editForm").style.display = currentRole === "read" ? "none" : "block";
        document.getElementById("adminPanel").style.display = currentRole === "root" ? "block" : "none";

        if (currentRole === "root") {
          loadUserList();
        }
      } else {
        alert(data.message || "ログインに失敗しました");
      }
    })
    .catch(error => {
      hideLoading();
      console.error("通信エラー:", error);
      alert("通信エラーが発生しました");
    });
});

document.getElementById("updateForm").addEventListener("submit", e => {
  e.preventDefault();
  showLoading("変更内容を確認中…");

  const id = localStorage.getItem("savedID");
  const pass = localStorage.getItem("savedPass");

  const newID = document.getElementById("editNewID").value || id;
  const newPass = document.getElementById("editNewPass").value || pass;
  const newName = document.getElementById("editName").value || currentName;
  const newEmail = document.getElementById("editEmail").value || currentEmail;
  const newInfo = document.getElementById("editInfo").value || currentInfo;

  const formData = new FormData();
  formData.append("mode", "update");
  formData.append("id", id);
  formData.append("password", pass);
  formData.append("newID", newID);
  formData.append("newPass", newPass);
  formData.append("name", newName);
  formData.append("email", newEmail);
  formData.append("info", newInfo);

  const changed = (newID !== id || newPass !== pass || newName !== currentName || newEmail !== currentEmail || newInfo !== currentInfo);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
      hideLoading();
      if (data.status === "success") {

        if (changed) {
          alert("情報を更新しました");
          reloging = true;
          localStorage.setItem("savedID", newID);
          localStorage.setItem("savedPass", newPass);
          document.getElementById("userID").value = newID;
          document.getElementById("userPass").value = newPass;
          document.getElementById("loginForm").dispatchEvent(new Event("submit"));
        }else {
          alert("変更はありません");
        }
      } else {
        alert(data.message || "更新に失敗しました");
        reloging = false;
      }
    });
});

document.getElementById("addUserForm").addEventListener("submit", e => {
  e.preventDefault();
  showLoading("ユーザーを追加中…");

  const formData = new FormData();
  formData.append("mode", "add");
  formData.append("id", localStorage.getItem("savedID"));
  formData.append("password", localStorage.getItem("savedPass"));
  formData.append("newID", document.getElementById("addID").value);
  formData.append("newPass", document.getElementById("addPass").value);
  formData.append("name", document.getElementById("addName").value);
  formData.append("email", document.getElementById("addEmail").value);
  formData.append("info", document.getElementById("addInfo").value);
  formData.append("role", document.getElementById("addRole").value);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
      hideLoading();
      if (data.status === "success") {
        alert("ユーザーを追加しました");
        loadUserList();
      } else {
        alert(data.message || "追加に失敗しました");
      }
    });
});

document.getElementById("deleteUserForm").addEventListener("submit", e => {
  e.preventDefault();
  showLoading("ユーザーを削除中…");

  const formData = new FormData();
  formData.append("mode", "delete");
  formData.append("id", localStorage.getItem("savedID"));
  formData.append("password", localStorage.getItem("savedPass"));
  formData.append("targetID", document.getElementById("deleteID").value);
  formData.append("targetPass", document.getElementById("deletePass").value);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
      hideLoading();
      if (data.status === "success") {
        alert("ユーザーを削除しました");
        loadUserList();
      } else {
        alert(data.message || "削除に失敗しました");
      }
    });
});

function loadUserList() {
  showLoading("ユーザー一覧を取得中…");

  const formData = new FormData();
  formData.append("mode", "list");
  formData.append("id", localStorage.getItem("savedID"));
  formData.append("password", localStorage.getItem("savedPass"));

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
      hideLoading();
      if (data.status === "success") {
        const container = document.getElementById("userTableContainer");
        const users = data.users;

        let html = `<table><thead><tr>
          <th>ID</th><th>名前</th><th>Email</th><th>情報</th><th>権限</th>
        </tr></thead><tbody>`;

        users.forEach(user => {
          html += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.info}</td>
            <td>${user.role}</td>
          </tr>`;
        });

        html += `</tbody></table>`;
        container.innerHTML = html;
        document.getElementById("userListSection").style.display = "block";
      } else {
        alert("ユーザー一覧の取得に失敗しました");
      }
    });
}

function showLoading(message = "処理中です。しばらくお待ちください...") {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    const content = overlay.querySelector(".overlay-content p");
    if (content) content.textContent = message;
    overlay.style.display = "flex";
  }
}

function hideLoading() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) overlay.style.display = "none";
}

window.onload = function () {
  const id = localStorage.getItem("savedID");
  const pass = localStorage.getItem("savedPass");
  if (id && pass) {
    document.getElementById("userID").value = id;
    document.getElementById("userPass").value = pass;
    document.getElementById("loginForm").dispatchEvent(new Event("submit"));
  }
};
