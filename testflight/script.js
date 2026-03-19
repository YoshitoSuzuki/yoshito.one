async function loadApps() {
    const betaGrid = document.getElementById('beta-grid');
    
    try {
        const response = await fetch('apps.json');
        const data = await response.json();

        // ベータ版アプリの描画のみに絞る
        if (data.beta && data.beta.length > 0) {
            data.beta.forEach(app => {
                const card = createAppCard(app);
                betaGrid.appendChild(card);
            });
        } else {
            betaGrid.innerHTML = '<p class="no-data">現在テスト中のベータ版アプリはありません。</p>';
        }

    } catch (e) {
        console.error(e);
        betaGrid.innerHTML = '<p>データの読み込みに失敗しました。</p>';
    }
}

function createAppCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card';

    const videoLinkHtml = app.video
        ? `<a href="${app.video}" class="btn-video"><p>説明動画はこちらから</p></a>`
        : '<br><br>';
    
    // プロモーションリンク
    const promoHtml = app.promo_link 
        ? `<a href="${app.promo_link}" target="_blank" class="btn-secondary">詳細</a>` 
        : '';

    // リリース版がある場合のバッジ
    const releaseBadgeHtml = app.has_released 
        ? `<div class="release-badge">リリース版あり</div>` 
        : '';

    // リリース版へのApp Storeリンク（存在する場合のみ表示）
    const storeLinkHtml = (app.has_released && app.released_link)
        ? `<a href="${app.released_link}" target="_blank" class="btn-secondary">App Store</a>`
        : '';

    card.innerHTML = `
        <div class="card-header">
            <img src="${app.icon}" class="app-icon" alt="${app.name}" onerror="this.src='https://via.placeholder.com/72?text=App'">
            <div class="app-title-group">
                ${releaseBadgeHtml}
                <p class="app-category">${app.category}</p>
                <h2>${app.name}</h2>
            </div>
        </div>
        <p class="app-description">${app.description}</p>
        ${videoLinkHtml}
        <div class="card-actions">
            <a href="${app.link}" target="_blank" class="btn-get">TestFlight</a>
            ${storeLinkHtml}
            ${promoHtml}
        </div>
    `;
    return card;
}

document.addEventListener('DOMContentLoaded', loadApps);