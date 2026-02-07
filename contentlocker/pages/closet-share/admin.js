let allProducts = [];

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            renderStockList(); // 在庫一覧を表示
        })
        .catch(err => console.error('データ読み込みエラー:', err));

    setupTabs();
    setupEventListeners();
});

// タブ切り替え処理
function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // アクティブクラスの切り替え
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
}

// --- 1. リスト確認機能 ---
function parseAndCheckList() {
    const text = document.getElementById('paste-area').value;
    const resultArea = document.getElementById('check-result');
    const actionArea = document.getElementById('bulk-action-area');
    
    // 正規表現で [ID:itemXXX] を抽出
    const regex = /\[ID:(.*?)\]/g;
    const foundIds = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
        foundIds.push(match[1]); // itemXXX の部分
    }

    if (foundIds.length === 0) {
        alert('商品IDが見つかりませんでした。\nコピーしたテキストに [ID:itemXXX] が含まれているか確認してください。');
        return;
    }

    resultArea.innerHTML = '';
    const foundItems = allProducts.filter(item => foundIds.includes(item.id));

    foundItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'admin-card';
        div.innerHTML = `
            <img src="${item.images[0]}" alt="">
            <div class="info">
                <strong>${item.name}</strong>
                <p>${item.id} / ${item.size}</p>
                ${item.isSoldOut ? '<span class="status-badge sold">在庫なし</span>' : '<span class="status-badge ok">在庫あり</span>'}
            </div>
        `;
        resultArea.appendChild(div);
    });

    // アクションボタンにIDリストを紐付け
    if (foundItems.length > 0) {
        actionArea.classList.remove('hidden');
        document.getElementById('bulk-soldout-btn').onclick = () => {
            if(confirm(`${foundItems.length}件の商品を「在庫切れ（非表示）」にしますか？`)) {
                foundItems.forEach(item => item.isSoldOut = true);
                alert('変更しました。「変更を保存」ボタンからファイルを更新してください。');
                renderStockList(); // 在庫一覧も更新
                // 表示を更新
                parseAndCheckList();
            }
        };
    }
}


// --- 2. 在庫管理一覧 ---
function renderStockList() {
    const list = document.getElementById('stock-list');
    const searchTerm = document.getElementById('admin-search').value.toLowerCase();
    
    list.innerHTML = '';

    allProducts.forEach(item => {
        // 検索フィルタ
        if (searchTerm && !item.name.toLowerCase().includes(searchTerm) && !item.id.includes(searchTerm)) {
            return;
        }

        const li = document.createElement('li');
        li.className = item.isSoldOut ? 'sold-out' : '';
        li.innerHTML = `
            <div class="item-summary">
                <img src="${item.images[0]}" width="40">
                <span>[${item.id}] ${item.name} (${item.size})</span>
            </div>
            <label class="toggle-switch">
                <input type="checkbox" ${item.isSoldOut ? 'checked' : ''} onchange="toggleSoldOut('${item.id}')">
                <span class="slider"></span>
                <span class="label-text">${item.isSoldOut ? '非表示' : '表示中'}</span>
            </label>
        `;
        list.appendChild(li);
    });
}

// 在庫ステータスの切り替え
window.toggleSoldOut = function(id) {
    const item = allProducts.find(i => i.id === id);
    if (item) {
        item.isSoldOut = !item.isSoldOut; // 反転
        renderStockList(); // 再描画
    }
};


// --- 3. 商品追加 ---
function addNewItem() {
    // 最後のIDを取得して+1する
    const lastId = allProducts.length > 0 ? allProducts[allProducts.length - 1].id : "item000";
    const num = parseInt(lastId.replace('item', '')) + 1;
    const newId = 'item' + String(num).padStart(3, '0');

    const newItem = {
        id: newId,
        name: document.getElementById('new-name').value,
        category: document.getElementById('new-category').value,
        size: document.getElementById('new-size').value,
        color: document.getElementById('new-color').value,
        price: 0,
        description: document.getElementById('new-desc').value,
        images: [
            document.getElementById('new-img-main').value
        ],
        isSoldOut: false
    };

    // サブ画像があれば追加
    const subImg = document.getElementById('new-img-sub').value;
    if (subImg) newItem.images.push(subImg);

    if (!newItem.name || !newItem.images[0]) {
        alert('商品名とメイン画像パスは必須です');
        return;
    }

    allProducts.push(newItem);
    alert(`商品を追加しました！ (ID: ${newId})\n「変更を保存」ボタンを押して反映させてください。`);
    
    // フォームリセット
    document.getElementById('new-name').value = '';
    document.getElementById('new-desc').value = '';
    renderStockList();
}


// --- 4. JSON保存（ダウンロード） ---
function downloadJson() {
    const jsonStr = JSON.stringify(allProducts, null, 4); // 見やすく整形
    const blob = new Blob([jsonStr], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'items.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('items.json がダウンロードされました。\n\n【重要】\nダウンロードフォルダにある items.json を、\nこのサイトのフォルダにある古い items.json に\n上書きしてください！');
}


// イベント設定
function setupEventListeners() {
    document.getElementById('check-list-btn').addEventListener('click', parseAndCheckList);
    document.getElementById('admin-search').addEventListener('input', renderStockList);
    document.getElementById('add-item-btn').addEventListener('click', addNewItem);
    document.getElementById('save-json-btn').addEventListener('click', downloadJson);
}