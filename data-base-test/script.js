document.getElementById('password-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // フォームのデフォルトの送信動作をキャンセル

    const password = document.getElementById('password-input').value;
    const errorMessage = document.getElementById('error-message');
    const contentArea = document.getElementById('content-area');
    
    // エラーメッセージをクリア
    errorMessage.textContent = '';
    
    // ★ご自身のサーバーのURLに変更してください
    const serverUrl = 'http://yo4shserver:3000/auth'; 
    // HTTPS化した場合は 'https://...' になります

    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password }),
        });

        if (response.ok) {
            // 認証成功
            const htmlContent = await response.text();
            document.body.innerHTML = htmlContent; // ページ全体を書き換える
        } else {
            // 認証失敗
            const errorData = await response.json();
            errorMessage.textContent = errorData.message || '認証に失敗しました。';
        }
    } catch (error) {
        console.error('サーバーとの通信に失敗しました:', error);
        errorMessage.textContent = 'サーバーに接続できません。';
    }
});
