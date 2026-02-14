document.addEventListener('DOMContentLoaded', () => {
    // URLのパラメータを取得 (?app=VideoLocker など)
    const params = new URLSearchParams(window.location.search);
    const appName = params.get('app');

    if (appName) {
        const titleElement = document.getElementById('app-status-title');
        titleElement.innerText = `${appName} is on the way`;
    }
});