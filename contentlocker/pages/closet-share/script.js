let allProducts = [];
let cart = JSON.parse(localStorage.getItem('myClosetCart')) || [];

// DOM要素の取得
const grid = document.getElementById('product-grid');
const filters = {
    category: document.getElementById('filter-category'),
    size: document.getElementById('filter-size'),
    color: document.getElementById('filter-color')
};
const modal = document.getElementById('product-modal');
const cartModal = document.getElementById('cart-modal');
const cartCount = document.getElementById('cart-count');

// 初期化処理
document.addEventListener('DOMContentLoaded', () => {
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            // ページ読み込み時に初期フィルタリング（全表示）を実行
            filterProducts();
        })
        .catch(err => console.error('データ読み込みエラー:', err));
    
    updateCartCount();
    setupEventListeners();
});

// 商品一覧の描画（キープ済み判定を追加）
function renderProducts(products) {
    grid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        
        // カートに入っているかチェック
        const isKept = cart.some(item => item.id === product.id);
        
        // クラス設定：キープ済みなら 'kept-item' を追加
        card.className = `product-card ${isKept ? 'kept-item' : ''}`;
        
        card.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}">
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-meta">${product.category} / ${product.size}</div>
            </div>
        `;
        card.addEventListener('click', () => openProductModal(product));
        grid.appendChild(card);
    });
}

// フィルタリング機能（在庫切れを除外）
function filterProducts() {
    const categoryVal = filters.category.value;
    const sizeVal = filters.size.value;
    const colorVal = filters.color.value;

    const filtered = allProducts.filter(item => {
        // 在庫切れフラグがあるものは表示しない
        if (item.isSoldOut) return false;

        return (categoryVal === 'all' || item.category === categoryVal) &&
               (sizeVal === 'all' || item.size === sizeVal) &&
               (colorVal === 'all' || item.color === colorVal);
    });
    renderProducts(filtered);
}

// モーダル表示
function openProductModal(product) {
    const mainImage = document.getElementById('modal-main-image');
    mainImage.src = product.images[0];

    const subImagesContainer = document.getElementById('modal-sub-images');
    subImagesContainer.innerHTML = '';

    product.images.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.className = 'sub-image-thumb'; 
        img.addEventListener('click', () => {
            mainImage.src = imageSrc;
        });
        subImagesContainer.appendChild(img);
    });

    document.getElementById('modal-title').innerText = product.name;
    document.getElementById('modal-category').innerText = product.category;
    document.getElementById('modal-size').innerText = product.size;
    document.getElementById('modal-color').innerText = product.color;
    document.getElementById('modal-desc').innerText = product.description;

    // ボタンの状態を更新して表示
    updateModalButton(product);

    modal.classList.remove('hidden');
}

// モーダルのボタン状態を更新する関数（追加/取り消しの切り替え）
function updateModalButton(product) {
    const btn = document.getElementById('modal-add-cart-btn');
    const isKept = cart.some(item => item.id === product.id);

    // イベントリスナーをリセットするために複製して置換
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    if (isKept) {
        // すでにキープ済みの場合 -> 取り消しボタンにする
        newBtn.innerText = 'キープを取り消す';
        newBtn.classList.add('remove-mode');
        newBtn.onclick = () => {
            removeFromCart(product.id);
            updateModalButton(product); // ボタン表示を即時更新
        };
    } else {
        // まだキープしていない場合 -> 追加ボタンにする
        newBtn.innerText = 'このアイテムをキープする';
        newBtn.classList.remove('remove-mode');
        newBtn.onclick = () => {
            addToCart(product);
            updateModalButton(product); // ボタン表示を即時更新
        };
    }
}

// カートに追加
function addToCart(product) {
    if (!cart.some(item => item.id === product.id)) {
        cart.push(product);
        saveCart();
        updateCartCount();
        filterProducts(); // 一覧画面も更新（薄くするため）
    }
}

// カートから削除
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
    renderCartItems(); // カートリストが開いていれば更新
    filterProducts(); // 一覧画面も更新（元に戻すため）
}

// カートの状態保存
function saveCart() {
    localStorage.setItem('myClosetCart', JSON.stringify(cart));
}

function updateCartCount() {
    cartCount.innerText = cart.length;
}

// カートの中身を描画（リスト表示）
function renderCartItems() {
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} (${item.size})</span>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">削除</button>
        `;
        list.appendChild(li);
    });
}

// クリップボードコピー機能
function copyCartList() {
    if (cart.length === 0) return alert('リストは空です');
    
    const text = "【欲しいものリスト】\n" + cart.map(item => `・[ID:${item.id}] ${item.name} (${item.size})`).join('\n');
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert('リストをコピーしました！(ID付き)\nLINEなどで送ってください。');
        }).catch(err => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "0";
    textArea.style.top = "0";
    textArea.style.opacity = "0";
    textArea.style.pointerEvents = "none";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        const range = document.createRange();
        range.selectNodeContents(textArea);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);
    }
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alert('リストをコピーしました！(ID付き)\nLINEなどで送ってください。');
        } else {
            alert('コピーできませんでした。');
        }
    } catch (err) {
        alert('コピーできませんでした。');
    }
    document.body.removeChild(textArea);
}

// イベントリスナー設定
function setupEventListeners() {
    Object.values(filters).forEach(select => {
        select.addEventListener('change', filterProducts);
    });

    document.querySelector('.close-modal').addEventListener('click', () => modal.classList.add('hidden'));
    document.querySelector('.close-cart').addEventListener('click', () => cartModal.classList.add('hidden'));

    document.getElementById('cart-btn').addEventListener('click', () => {
        renderCartItems();
        cartModal.classList.remove('hidden');
    });

    document.getElementById('copy-list-btn').addEventListener('click', copyCartList);

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
        if (e.target === cartModal) cartModal.classList.add('hidden');
    });
}