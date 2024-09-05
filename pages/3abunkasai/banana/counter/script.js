let currentCount = 0;

// Google Apps Scriptからバナナの本数を取得し、画面に反映する関数
function fetchBananaCount() {
  const url = 'https://script.google.com/macros/s/AKfycbxFNaNDJxnUhCnFqYX-ThV3g507oJ7zH95zj4I4_2zzJo41z7-P1qaKfcwnoV-yzCWpag/exec'; // ここにGAS WebアプリのURLを置き換えてください

  fetch(url)
    .then(response => response.text())
    .then(data => {
      currentCount = parseInt(data, 10);
      // document.getElementById('bananaInput').value = currentCount;
      document.getElementById('bananaCount').innerText = currentCount;
    })
    .catch(error => console.error('エラー:', error));
}

// カウントを更新する関数
function updateCount(change) {
  currentCount += change;
  document.getElementById('bananaInput').value = currentCount;
  sendBananaCount();
}

// バナナの本数をGoogle Apps Scriptに送信する関数
function sendBananaCount() {
  currentCount = parseInt(document.getElementById('bananaInput').value, 10);
  const url = 'https://script.google.com/macros/s/AKfycbx5txedP0aTNu59ItmvaN0UnmTkM7Q2XhYNsX_2yw4szAKthfCNa-Cpxp_N3PkY2ckOgQ/exec'; // ここにGAS WebアプリのURLを置き換えてください

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `count=${currentCount}`
  })
  .then(response => response.text())
  .then(data => {
    document.getElementById('bananaCount').innerText = currentCount;
  })
  .catch(error => console.error('エラー:', error));
}




function setInInput(){
  const url = 'https://script.google.com/macros/s/AKfycbxFNaNDJxnUhCnFqYX-ThV3g507oJ7zH95zj4I4_2zzJo41z7-P1qaKfcwnoV-yzCWpag/exec'; // ここにGAS WebアプリのURLを置き換えてください

  fetch(url)
    .then(response => response.text())
    .then(data => {
      currentCount = parseInt(data, 10);
      document.getElementById('bananaInput').value = currentCount;
      document.getElementById('bananaCount').innerText = currentCount;
    })
    .catch(error => console.error('エラー:', error));
}




// ページ読み込み時にバナナの本数を取得する
window.onload = fetchBananaCount;
window.onload = setInInput();

setInterval(fetchBananaCount, 5000);





// ---------------------------------------------------------------------







function setNewBananaLots(number){
  let newBananaLot = 0;
  switch (number) {
    case 1://１日目 1
      newBananaLot = 150;
    break;
    case 2://1日目 2
      newBananaLot = 200;
    break;
    case 3://１日目 3
    newBananaLot = 50;
    break;
    case 4://２日目 1
      newBananaLot = 70;
    break;
    case 5://２日目 2
      newBananaLot = 130;
    break;
    case 6://２日目 3
      newBananaLot = 150;
    break;
    case 7://２日目 4
      newBananaLot = 50;
    break;
    default:

  }




  const url = 'https://script.google.com/macros/s/AKfycbx5txedP0aTNu59ItmvaN0UnmTkM7Q2XhYNsX_2yw4szAKthfCNa-Cpxp_N3PkY2ckOgQ/exec'; // ここにGAS WebアプリのURLを置き換えてください

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `count=${newBananaLot}`
  })
  .then(response => response.text())
  .then(data => {
    document.getElementById('bananaCount').innerText = newBananaLot;
  })
  .catch(error => console.error('エラー:', error));

  fetchBananaCount();
}
