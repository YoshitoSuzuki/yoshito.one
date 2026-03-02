// 保存用のキー
const LANG_KEY = 'preferredLang';
const VIEW_KEY = 'preferredView';

// 初期状態の取得（localStorageに保存されていればそれを使用）
let currentLang = localStorage.getItem(LANG_KEY);
if (!currentLang) {
  currentLang = navigator.language.startsWith('ja') ? 'ja' : 'en';
  localStorage.setItem(LANG_KEY, currentLang);
}

let currentView = localStorage.getItem(VIEW_KEY) || 'grid'; // デフォルトはグリッド

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
  updateLanguageDisplay();
  applyViewMode();
  loadLinks();
});

// 言語切り替えボタンの処理
document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'ja' ? 'en' : 'ja';
  localStorage.setItem(LANG_KEY, currentLang);
  updateLanguageDisplay();
  loadLinks();
  applyViewMode(); // title属性の言語も更新するため
});

// 表示切り替えボタンの処理
document.getElementById('viewToggle').addEventListener('click', () => {
  currentView = currentView === 'grid' ? 'list' : 'grid';
  localStorage.setItem(VIEW_KEY, currentView);
  applyViewMode();
});

// タイトルとボタンラベルの更新
function updateLanguageDisplay() {
  document.getElementById('mainTitle').textContent = 'Portal Links';
  document.getElementById('langToggle').textContent = currentLang === 'ja' ? '🌐 English' : '🌐 日本語';
}

// 表示モード（グリッド/リスト）を画面に適用
function applyViewMode() {
  const container = document.getElementById('content');
  const viewIcon = document.getElementById('viewIcon');
  
  if (currentView === 'list') {
    container.classList.add('list-view');
    viewIcon.textContent = '▦'; // 次押すとグリッドになるアイコン
    document.getElementById('viewToggle').title = currentLang === 'ja' ? 'グリッド表示にする' : 'Switch to Grid view';
  } else {
    container.classList.remove('list-view');
    viewIcon.textContent = '☰'; // 次押すとリストになるアイコン
    document.getElementById('viewToggle').title = currentLang === 'ja' ? 'リスト表示にする' : 'Switch to List view';
  }
}

// リンク情報の読み込みと表示
async function loadLinks() {
  try {
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
        const card = document.createElement('a');
        card.className = 'card';
        card.href = link.url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.textContent = currentLang === 'ja' ? link.label_ja : link.label_en;

        cardContainer.appendChild(card);
      });

      categoryDiv.appendChild(cardContainer);
      container.appendChild(categoryDiv);
    });
  } catch (error) {
    console.error('データの読み込みに失敗しました:', error);
  }
}