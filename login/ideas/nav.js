// function createNavBar(user) {
//   const nav = document.getElementById('nav');
//   if (!nav || !user) return;

//   const links = [];

//   links.push(`<a href="main.html">投稿一覧</a>`);
//   links.push(`<a href="account.html">アカウント</a>`);
//   if (user.role === 'root') {
//     links.push(`<a href="admin.html">ユーザー管理</a>`);
//   }

//   nav.innerHTML = links.join(' | ');
//   nav.style.marginBottom = '20px';
// }
function createNavBar(user) {
  const nav = document.getElementById('nav');
  if (!nav || !user) return;

  const links = [];

  links.push(`<a href="main.html">投稿一覧</a>`);
  links.push(`<a href="account.html">アカウント</a>`);
  if (user.role === 'root') {
    links.push(`<a href="admin.html">ユーザー管理</a>`);
  }

  // ボタンのclassだけつける（styleはcssで）
  links.push(`<button id="logoutBtn" class="logout-button">ログアウト</button>`);

  nav.innerHTML = links.join(' | ');
  nav.style.marginBottom = '20px';

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('user');
      location.href = 'index.html';
    });
  }
}
