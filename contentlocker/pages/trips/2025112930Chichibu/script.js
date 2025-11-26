document.addEventListener('DOMContentLoaded', () => {
    const destinationList = document.getElementById('destination-list');
    const filterButtonsContainer = document.getElementById('filter-buttons');
    const jsonPath = 'data.json'; 
    let allDestinations = []; // 読み込んだデータを保持する変数

    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); 
        })
        .then(data => {
            allDestinations = data; // データを保存
            renderDestinations(allDestinations); // 初回表示
            createFilterButtons(allDestinations); // フィルターボタンを作成
        })
        .catch(error => {
            console.error('データの取得または処理中にエラーが発生しました:', error);
            destinationList.innerHTML = '<p class="error-message">旅行先のデータを読み込めませんでした。</p>';
        });

    // === 関数定義 ===

    // フィルターボタンを生成・追加する関数
    function createFilterButtons(destinations) {
        // 全カテゴリー名を重複なく取得
        const categories = [...new Set(destinations.map(d => d.category))];
        
        // 「すべて」ボタンを追加
        appendButton('すべて', 'all');

        // 各カテゴリーのボタンを追加
        categories.forEach(category => {
            appendButton(category, category);
        });

        // デフォルトで「すべて」ボタンをアクティブにする
        document.querySelector('.filter-button').classList.add('active');
    }

    // 個別のフィルターボタンを生成するヘルパー関数
    function appendButton(text, filterValue) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('filter-button');
        button.dataset.filter = filterValue; // フィルター値をデータ属性に保存

        button.addEventListener('click', (event) => {
            filterDestinations(filterValue);
            
            // アクティブクラスの切り替え
            document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
        });
        filterButtonsContainer.appendChild(button);
    }

    // データをフィルターして表示を更新する関数
    function filterDestinations(category) {
        let filteredData;
        
        if (category === 'all') {
            filteredData = allDestinations; // すべて表示
        } else {
            // 選択されたカテゴリーに一致する要素のみを抽出
            filteredData = allDestinations.filter(d => d.category === category);
        }
        
        renderDestinations(filteredData);
    }

    // 実際にHTML要素を生成してリストに追加する関数
    function renderDestinations(data) {
        destinationList.innerHTML = ''; // リストを一旦クリア
        
        if (data.length === 0) {
            destinationList.innerHTML = '<p class="error-message">該当する旅行先は見つかりませんでした。</p>';
            return;
        }

        data.forEach(destination => {
            const card = document.createElement('div');
            card.classList.add('destination-card'); 

            // カードの内容をHTMLとして設定
            card.innerHTML = `
                <img src="${destination.image_url}" alt="${destination.name}" class="card-image">
                <div class="card-content">
                    <span class="category-tag">${destination.category}</span> <h2>${destination.name}</h2>
                    <p class="description">${destination.description}</p>
                    
                    <div class="links">
                        ${destination.google_maps_url ? `<a href="${destination.google_maps_url}" target="_blank">Google Maps</a>` : ''}
                        ${destination.homepage_url ? `<a href="${destination.homepage_url}" target="_blank">公式サイト</a>` : ''}
                    </div>

                    ${destination.notes ? `<p class="notes">メモ: ${destination.notes}</p>` : ''}
                </div>
            `;
            
            destinationList.appendChild(card);
        });
    }
});