document.addEventListener('DOMContentLoaded', () => {
    const tripListContainer = document.getElementById('trip-list');

    // 1. trips.jsonを読み込む
    fetch('trips.json')
        .then(response => response.json())
        .then(trips => {
            // 2. 読み込んだデータを使ってHTMLを生成
            trips.forEach(trip => {
                const tripCard = document.createElement('a');
                tripCard.className = 'trip-card';
                // フォルダ名からリンク先を設定
                tripCard.href = `./${trip.folderName}/`;

                tripCard.innerHTML = `
                    <img src="${trip.thumbnail}" alt="${trip.title}のサムネイル画像">
                    <div class="trip-card-content">
                        <h2>${trip.title}</h2>
                        <p>${trip.description}</p>
                    </div>
                `;

                tripListContainer.appendChild(tripCard);
            });
        })
        .catch(error => {
            console.error('旅行リストの読み込みに失敗しました:', error);
            tripListContainer.innerHTML = '<p>旅行リストを読み込めませんでした。</p>';
        });
});