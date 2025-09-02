document.addEventListener('DOMContentLoaded', () => {

    // --- ▼▼ 設定エリア ▼▼ ---
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycby-0vvEThBxttffb5Ccmc0P2GNYrJtoM3h9liVdmwm5WJynARj8fs4Ty6yrJZhixIv9/exec';
    const CONTENT_ID = 'Hakodate2024082627';
    // --- ▲▲ 設定エリア ▲▲ ---

    // --- ▼▼ 機能の有効/無効 設定 ▼▼ ---
    const CONFIG = {
        enableLocationFilter: true,
        enablePersonFilter: false,
        enableCategoryFilter: true,
    };
    // --- ▲▲ 設定エリア ▲▲ ---

    // HTML要素の取得
    const passwordContainer = document.getElementById('password-container');
    const mainContent = document.getElementById('main-content');
    const passwordInput = document.getElementById('password-input');
    const submitButton = document.getElementById('submit-button');
    const errorMessage = document.getElementById('error-message');

    /**
     * --- ▼▼▼ ここからが新しいロジック ▼▼▼ ---
     */

    // ページ読み込み時に、保存されたトークンで自動ログインを試みる
    function autoLoginWithToken() {
        const savedToken = localStorage.getItem('sessionToken');
        if (!savedToken) {
            // トークンがなければ何もせず、パスワード入力を待つ
            return;
        }

        // 認証メッセージを表示
        passwordContainer.querySelector('h2').textContent = "自動ログイン中...";
        passwordContainer.querySelector('p').textContent = "認証情報を確認しています。";
        passwordInput.classList.add('hidden');
        submitButton.classList.add('hidden');

        // トークンを使ってGASに認証リクエスト
        const url = `${GAS_WEB_APP_URL}?id=${CONTENT_ID}&token=${savedToken}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    // 自動ログイン成功
                    showMainContent(data.payload);
                } else {
                    // トークンが無効だった場合
                    localStorage.removeItem('sessionToken'); // 古いトークンを削除
                    // 通常のパスワード入力画面に戻す
                    passwordContainer.querySelector('h2').textContent = "Password Required";
                    passwordContainer.querySelector('p').textContent = "このコンテンツを閲覧するにはパスワードが必要です。";
                    errorMessage.textContent = "セッションが切れました。再度パスワードを入力してください。";
                    passwordInput.classList.remove('hidden');
                    submitButton.classList.remove('hidden');
                }
            })
            .catch(err => {
                console.error("Token login failed:", err);
                errorMessage.textContent = "自動ログインに失敗しました。";
            });
    }

    // メインコンテンツを表示する共通関数
    function showMainContent(dataPayload) {
        passwordContainer.classList.add('hidden');
        mainContent.classList.remove('hidden');
        initializeApp(dataPayload);
    }

    // --- ▲▲▲ ここまでが新しいロジック ▲▲▲ ---


    // 送信ボタンがクリックされたときの処理
    submitButton.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    /**
     * パスワードをGASに送信して認証する関数
     */
    function checkPassword() {
        const password = passwordInput.value;
        if (!password) {
            errorMessage.textContent = 'パスワードを入力してください。';
            return;
        }

        errorMessage.textContent = '認証中...';
        submitButton.disabled = true;

        const url = `${GAS_WEB_APP_URL}?id=${CONTENT_ID}&password=${encodeURIComponent(password)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success' && data.token) {
                    // 認証成功！返ってきたトークンをlocalStorageに保存
                    localStorage.setItem('sessionToken', data.token);
                    // 取得した動画データを使ってページを初期化
                    showMainContent(data.payload);
                } else {
                    errorMessage.textContent = 'パスワードが違います。';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorMessage.textContent = 'エラーが発生しました。';
            })
            .finally(() => {
                submitButton.disabled = false;
            });
    }
    
    // 最初に自動ログインを試す
    autoLoginWithToken();


    // --- ▼▼ 以下は、これまでの動画ページ表示用ロジック（変更なし） ▼▼ ---

    function initializeApp(dayData) {
        const mainPlayer = document.getElementById('main-player');
        const videoListWrapper = document.getElementById('video-list');
        const filtersContainer = document.getElementById('filters-container');
        
        const allVideos = dayData.flatMap(day => day.videos);

        if (allVideos.length > 0) {
            setMainVideo(allVideos[0].id);
            initializeFilters(allVideos);
            renderVideoList(dayData, allVideos);
        } else {
            videoListWrapper.innerHTML = '<p>表示する動画がありません。</p>';
        }

        function setMainVideo(videoId) {
            mainPlayer.src = `https://www.youtube.com/embed/${videoId}`;
        }
        
        function renderVideoList(originalDayData, videosToDisplay) {
            videoListWrapper.innerHTML = '';
            const displayVideoIds = new Set(videosToDisplay.map(v => v.id));

            originalDayData.forEach(day => {
                const videosForThisDay = day.videos.filter(video => displayVideoIds.has(video.id));
                if (videosForThisDay.length > 0) {
                    const dayHeader = document.createElement('h2');
                    dayHeader.className = 'day-header';
                    dayHeader.textContent = day.dayTitle;
                    videoListWrapper.appendChild(dayHeader);

                    videosForThisDay.forEach(video => {
                        const videoItem = document.createElement('div');
                        videoItem.className = 'video-item';
                        videoItem.innerHTML = `
                            <img src="https://i.ytimg.com/vi/${video.id}/mqdefault.jpg" alt="${video.title}">
                            <div class="video-item-info">
                                <h3>${video.title}</h3>
                                <p>${video.location || ''}</p>
                            </div>
                        `;
                        videoItem.addEventListener('click', () => {
                            setMainVideo(video.id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        });
                        videoListWrapper.appendChild(videoItem);
                    });
                }
            });
        }

        function initializeFilters(videos) {
            filtersContainer.innerHTML = '';
            if (CONFIG.enableLocationFilter) {
                const locations = ['すべて', ...new Set(videos.map(v => v.location).filter(Boolean))];
                createFilterGroup('場所', locations, 'location', videos);
            }
            if (CONFIG.enablePersonFilter) {
                const people = ['すべて', ...new Set(videos.flatMap(v => v.people).filter(Boolean))];
                createFilterGroup('登場人物', people, 'person', videos);
            }
            if (CONFIG.enableCategoryFilter) {
                const categories = ['すべて', ...new Set(videos.map(v => v.category).filter(Boolean))];
                createFilterGroup('カテゴリ', categories, 'category', videos);
            }
        }

        function createFilterGroup(title, items, type, videos) {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'filter-group';
            groupDiv.innerHTML = `<div class="filter-group-title">${title}</div>`;
            
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'filter-buttons';
            buttonsDiv.dataset.filterType = type;

            items.forEach((item, index) => {
                const button = document.createElement('button');
                button.textContent = item;
                button.dataset.filter = item;
                if (index === 0) button.classList.add('active');
                buttonsDiv.appendChild(button);
            });
            
            groupDiv.appendChild(buttonsDiv);
            filtersContainer.appendChild(groupDiv);

            buttonsDiv.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') handleFilterClick(e.target, videos);
            });
        }
        
        function handleFilterClick(clickedButton, videos) {
            const filterType = clickedButton.parentElement.dataset.filterType;
            const filterValue = clickedButton.dataset.filter;
            
            document.querySelectorAll('.filter-buttons').forEach(container => {
                container.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                if (container.dataset.filterType === filterType) {
                    clickedButton.classList.add('active');
                } else {
                    container.querySelector('button[data-filter="すべて"]').classList.add('active');
                }
            });

            let filteredVideos = videos;
            if (filterValue !== 'すべて') {
                switch(filterType) {
                    case 'location': filteredVideos = videos.filter(v => v.location === filterValue); break;
                    case 'person': filteredVideos = videos.filter(v => v.people && v.people.includes(filterValue)); break;
                    case 'category': filteredVideos = videos.filter(v => v.category === filterValue); break;
                }
            }
            renderVideoList(dayData, filteredVideos);
        }
    }
});