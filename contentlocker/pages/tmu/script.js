// 言語の保存キー
const LANG_KEY = 'preferredLang';

// 初期言語の決定（localStorage → 自動判定）
let currentLang = localStorage.getItem(LANG_KEY);
if (!currentLang) {
  currentLang = navigator.language.startsWith('ja') ? 'ja' : 'en';
  localStorage.setItem(LANG_KEY, currentLang); // 初回のみ保存
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
  updateLanguageDisplay();
  loadLinks();
});

// 言語切り替えボタンの処理
document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'ja' ? 'en' : 'ja';
  localStorage.setItem(LANG_KEY, currentLang); // 切り替え後に保存
  updateLanguageDisplay();
  loadLinks();
});

// タイトルとボタンラベルの更新
function updateLanguageDisplay() {
  document.getElementById('mainTitle').textContent =
    currentLang === 'ja' ? 'Links' : 'Links';
  document.getElementById('langToggle').textContent =
    currentLang === 'ja' ? 'English' : '日本語';
}

// リンク情報の読み込みと表示
async function loadLinks() {
  const response = await fetch('data.json');
  const data = await response.json();

  const container = document.getElementById('content');
  container.innerHTML = '';

  data.categories.forEach((category) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';

    const title = document.createElement('h2');
    title.textContent = currentLang === 'ja' ? category.name_ja : category.name_en;
    categoryDiv.appendChild(title);

    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';

    category.links.forEach((link) => {
      const card = document.createElement('div');
      card.className = 'card';

      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.textContent = currentLang === 'ja' ? link.label_ja : link.label_en;

      card.appendChild(a);
      cardContainer.appendChild(card);
    });

    categoryDiv.appendChild(cardContainer);
    container.appendChild(categoryDiv);
  });
}
