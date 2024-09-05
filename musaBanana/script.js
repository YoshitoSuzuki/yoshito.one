function getBananaCount() {
  const url = 'https://script.google.com/macros/s/AKfycbxFNaNDJxnUhCnFqYX-ThV3g507oJ7zH95zj4I4_2zzJo41z7-P1qaKfcwnoV-yzCWpag/exec'; // ここにGAS WebアプリのURLを置き換えてください

  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById('bananaCount').innerText = data;
    })
    .catch(error => console.error('エラー:', error));
}

// バナナの本数を5秒ごとに取得する
setInterval(getBananaCount, 5000);

// ページ読み込み時に最初にデータを取得
getBananaCount();







// -----------------------------------------------------


// 日本時間（JST）に基づいて設定する日時 (ローカル時間として設定される)
    const countdownTimes = [
      new Date("2024-09-05T21:10:00").getTime(),
      new Date("2024-09-07T10:20:00").getTime(),
      new Date("2024-09-07T11:50:00").getTime(),
      new Date("2024-09-07T13:25:00").getTime(),
      new Date("2024-09-08T09:20:00").getTime(),
      new Date("2024-09-08T10:50:00").getTime(),
      new Date("2024-09-08T12:23:00").getTime(),
      new Date("2024-09-08T14:00:00").getTime()
    ];

    let currentTimerIndex = 0;

    // カウントダウンを開始
    function startCountdown() {
        const countdownElement = document.getElementById('countdown');

        const interval = setInterval(() => {
            const now = new Date().getTime();  // 現在のローカル時間（JST）
            const distance = countdownTimes[currentTimerIndex] - now;

            // 時間計算
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000)) / 1000);

            // カウントダウンを表示
            countdownElement.innerHTML = `${hours}時間 ${minutes}分`;

            // カウントがゼロになったら次のカウントダウンに切り替え
            if (distance < 0) {
                clearInterval(interval);
                currentTimerIndex++;

                // まだ残りの時間がある場合、次のカウントダウンを開始
                if (currentTimerIndex < countdownTimes.length) {
                    startCountdown();
                } else {
                    countdownElement.innerHTML = "すべてのイベントが終了しました！";
                }
            }
        }, 1000);
    }

    // 初めのカウントダウンを開始
    startCountdown();
