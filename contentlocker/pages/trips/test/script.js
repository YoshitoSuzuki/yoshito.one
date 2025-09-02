document.addEventListener('DOMContentLoaded', () => {

    // --- ▼ 設定エリア ▼ ---
    // ここを false にすると、その絞り込み機能が表示されなくなります
    const CONFIG = {
        enableLocationFilter: true, // 場所での絞り込み機能
        enablePersonFilter: true,   // 登場人物での絞り込み機能
    };
    // --- ▲ 設定エリア ▲ ---


    const mainPlayer = document.getElementById('main-player');
    const videoListContainer = document.getElementById('video-list');
    const filtersContainer = document.getElementById('filters-container');

    let allVideos = []; // 全ての動画データを保持する配列

    // JSONファイルを読み込む
    fetch('videos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(videos => {
            allVideos = videos;
            if (videos.length > 0) {
                // 最初の動画をメインプレーヤーにセット
                setMainVideo(videos[0].id);
                // フィルターを初期化
                initializeFilters();
                // 動画リストを初回表示
                renderVideoList(videos);
            } else {
                videoListContainer.innerHTML = '<p>表示する動画がありません。</p>';
            }
        })
        .catch(error => {
            console.error('動画リストの読み込みに失敗しました:', error);
            videoListContainer.innerHTML = '<p>動画リストの読み込みに失敗しました。jsonファイルが正しく配置されているか確認してください。</p>';
        });

    /**
     * メインプレーヤーの動画を切り替える
     * @param {string} videoId YouTubeの動画ID
     */
    function setMainVideo(videoId) {
        mainPlayer.src = `https://www.youtube.com/embed/${videoId}`;
    }

    /**
     * 動画リストをHTMLに描画する
     * @param {Array} videos 描画する動画の配列
     */
    function renderVideoList(videos) {
        videoListContainer.innerHTML = ''; // 一旦リストを空にする
        videos.forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            
            const thumbnailUrl = `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`;

            videoItem.innerHTML = `
                <img src="${thumbnailUrl}" alt="${video.title}">
                <div class="video-item-info">
                    <h3>${video.title}</h3>
                    <p>${video.location || ''}</p>
                </div>
            `;
            
            // クリックでメインプレーヤーの動画を切り替え
            videoItem.addEventListener('click', () => {
                setMainVideo(video.id);
                // ページ上部にスムーズにスクロール
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            videoListContainer.appendChild(videoItem);
        });
    }

    /**
     * 絞り込みフィルターを初期化して表示する
     */
    function initializeFilters() {
        filtersContainer.innerHTML = ''; // フィルターを初期化

        // 場所フィルター
        if (CONFIG.enableLocationFilter) {
            const locations = ['すべて', ...new Set(allVideos.map(v => v.location).filter(Boolean))];
            createFilterGroup('場所', locations, 'location');
        }

        // 登場人物フィルター
        if (CONFIG.enablePersonFilter) {
            const people = ['すべて', ...new Set(allVideos.flatMap(v => v.people).filter(Boolean))];
            createFilterGroup('登場人物', people, 'person');
        }
    }

    /**
     * フィルターのボタン群を作成する
     * @param {string} title グループのタイトル（例: '場所'）
     * @param {Array} items ボタンにする項目の配列
     * @param {string} type フィルターの種類（'location' or 'person'）
     */
    function createFilterGroup(title, items, type) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'filter-group';
        
        const titleEl = document.createElement('div');
        titleEl.className = 'filter-group-title';
        titleEl.textContent = title;
        groupDiv.appendChild(titleEl);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'filter-buttons';
        buttonsDiv.dataset.filterType = type;

        items.forEach((item, index) => {
            const button = document.createElement('button');
            button.textContent = item;
            button.dataset.filter = item;
            if (index === 0) {
                button.classList.add('active'); // 最初（すべて）をアクティブに
            }
            buttonsDiv.appendChild(button);
        });
        
        groupDiv.appendChild(buttonsDiv);
        filtersContainer.appendChild(groupDiv);

        // ボタンがクリックされたときのイベントを設定
        buttonsDiv.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                handleFilterClick(e.target);
            }
        });
    }
    
    /**
     * フィルターボタンがクリックされたときの処理
     * @param {HTMLElement} clickedButton クリックされたボタン要素
     */
    function handleFilterClick(clickedButton) {
        const filterType = clickedButton.parentElement.dataset.filterType;
        const filterValue = clickedButton.dataset.filter;
        
        // 同じグループの他のボタンのアクティブ状態を解除
        clickedButton.parentElement.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        // クリックされたボタンをアクティブに
        clickedButton.classList.add('active');
        
        // 他のフィルターグループは「すべて」に戻す
        document.querySelectorAll('.filter-buttons').forEach(container => {
            if (container.dataset.filterType !== filterType) {
                container.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                container.querySelector('button[data-filter="すべて"]').classList.add('active');
            }
        });

        // 動画リストをフィルタリングして再描画
        let filteredVideos = allVideos;
        if (filterValue !== 'すべて') {
            if (filterType === 'location') {
                filteredVideos = allVideos.filter(v => v.location === filterValue);
            } else if (filterType === 'person') {
                filteredVideos = allVideos.filter(v => v.people && v.people.includes(filterValue));
            }
        }
        renderVideoList(filteredVideos);
    }
});