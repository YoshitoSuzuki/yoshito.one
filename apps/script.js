async function loadApps() {
    const grid = document.getElementById('app-grid');
    
    try {
        const response = await fetch('apps.json');
        const apps = await response.json();

        apps.forEach((app) => {
            const card = document.createElement('div');
            card.className = 'app-card';
            
            const promoHtml = app.promo_link 
                ? `<a href="${app.promo_link}" target="_blank" class="btn-secondary">詳細</a>` 
                : '';

            card.innerHTML = `
                <div class="card-header">
                    <img src="${app.icon}" class="app-icon" alt="${app.name}" onerror="this.src='https://via.placeholder.com/72?text=App'">
                    <div class="app-title-group">
                        <p class="app-category">${app.category}</p>
                        <h2>${app.name}</h2>
                    </div>
                </div>
                <p class="app-description">${app.description}</p>
                <a href="${app.video}" class="btn-video"><p>説明動画はこちらから</p></a>
                <div class="card-actions">
                    <a href="${app.link}" target="_blank" class="btn-get">入手</a>
                    ${promoHtml}
                </div>
            `;
            
            grid.appendChild(card);
        });
    } catch (e) {
        grid.innerHTML = '<p>データの読み込みに失敗しました。</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadApps);