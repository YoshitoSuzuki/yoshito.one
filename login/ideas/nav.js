function createNavBar(user) {
  const nav = document.getElementById('nav');
  if (!nav || !user) return;

  const links = [];

  links.push(`<a href="main.html">投稿一覧</a>`);
  links.push(`<a href="account.html">アカウント</a>`);
  if (user.role === 'root') {
    links.push(`<a href="admin.html">ユーザー管理</a>`);
  }

  nav.innerHTML = links.join(' | ');
  nav.style.marginBottom = '20px';
}
