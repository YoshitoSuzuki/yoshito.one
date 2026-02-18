async function loadApps() {
    const releasedGrid = document.getElementById('released-grid');
    const betaGrid = document.getElementById('beta-grid');
    
    try {
        const response = await fetch('apps.json');
        const data = await response.json(); // 配列ではなくオブジェクトを受け取る

        // リリース済みアプリの描画
        if (data.released && data.released.length > 0) {
            data.released.forEach(app => {
                const card = createAppCard(app);
                releasedGrid.appendChild(card);
            });
        } else {
            releasedGrid.innerHTML = '<p class="no-data">現在公開中のアプリはありません。</p>';
        }

        // ベータ版アプリの描画
        if (data.beta && data.beta.length > 0) {
            data.beta.forEach(app => {
                const card = createAppCard(app);
                betaGrid.appendChild(card);
            });
        }

    } catch (e) {
        console.error(e);
        betaGrid.innerHTML = '<p>データの読み込みに失敗しました。</p>';
    }
}

// カード生成ロジックを関数化
function createAppCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card';
    
    const promoHtml = app.promo_link 
        ? `<a href="${app.promo_link}" target="_blank" class="btn-secondary">詳細</a>` 
        : '';

    // リリース版かベータ版かでボタンの文言を変えたい場合はここで判定可能
    // 今回は共通で「入手」にしていますが、「App Store」などに変えることもできます
    const buttonText = app.link.includes('testflight') ? '入手' : 'App Store';

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
            <a href="${app.link}" target="_blank" class="btn-get">${buttonText}</a>
            ${promoHtml}
        </div>
    `;
    return card;
}

document.addEventListener('DOMContentLoaded', loadApps);