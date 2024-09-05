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
