document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('link-container');

    // JSONファイルを読み込む
    fetch('./data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // ローディング表示を消す
            container.innerHTML = '';

            // データをループしてHTMLを作成
            data.forEach(item => {
                // カードの枠組み
                const card = document.createElement('div');
                card.className = 'card';

                // タイトル
                const title = document.createElement('h2');
                title.textContent = item.title;

                // 説明文
                const description = document.createElement('p');
                description.textContent = item.description;

                // リンク
                const link = document.createElement('a');
                link.href = item.url;
                link.textContent = 'GitHubで見る ↗';
                link.target = '_blank'; // 別タブで開く
                link.rel = 'noopener noreferrer'; // セキュリティ対策

                // カードに追加
                card.appendChild(title);
                card.appendChild(description);
                card.appendChild(link);

                // メインコンテナに追加
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
            container.innerHTML = '<p style="text-align:center; color:red;">データの読み込みに失敗しました。<br>ローカルサーバーを使用しているか確認してください。</p>';
        });
})