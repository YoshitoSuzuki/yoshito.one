let currentLang = 'ja';

document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'ja' ? 'en' : 'ja';
  document.getElementById('mainTitle').textContent =
    currentLang === 'ja' ? 'TMU ショートカットリンク' : 'TMU Shortcut Links';
  document.getElementById('langToggle').textContent =
    currentLang === 'ja' ? 'English' : '日本語';
  loadLinks();
});

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

loadLinks();
