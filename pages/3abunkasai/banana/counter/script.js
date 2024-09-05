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


  const button = document.getElementById('actionButton');
  const button1 = document.getElementById('actionButton1');
  const button2 = document.getElementById('actionButton2');
  const button3 = document.getElementById('actionButton3');

  // ボタンを無効化
  button.disabled = true;
  button.classList.add('disabled');
  button1.disabled = true;
  button1.classList.add('disabled');
  button2.disabled = true;
  button2.classList.add('disabled');
  button3.disabled = true;
  button3.classList.add('disabled');
  button4.disabled = true;
  button4.classList.add('disabled');
  button5.disabled = true;
  button5.classList.add('disabled');
  button6.disabled = true;
  button6.classList.add('disabled');
  button7.disabled = true;
  button7.classList.add('disabled');
  button8.disabled = true;
  button8.classList.add('disabled');
  button9.disabled = true;
  button9.classList.add('disabled');

  // 非同期関数の実行（例: 3秒間の遅延）
  longRunningFunction().then(() => {
      // 関数実行後にボタンを再度有効化
      button.disabled = false;
      button.classList.remove('disabled');
      button1.disabled = false;
      button1.classList.remove('disabled');
      button2.disabled = false;
      button2.classList.remove('disabled');
      button3.disabled = false;
      button3.classList.remove('disabled');
      button4.disabled = false;
      button4.classList.remove('disabled');
      button5.disabled = false;
      button5.classList.remove('disabled');
      button6.disabled = false;
      button6.classList.remove('disabled');
      button7.disabled = false;
      button7.classList.remove('disabled');
      button8.disabled = false;
      button8.classList.remove('disabled');
      button9.disabled = false;
      button9.classList.remove('disabled');
  });


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

setInterval(fetchBananaCount, 2000);

// -------------------------------------------------------

function longRunningFunction() {
        return new Promise(resolve => {
            // ここで長時間かかる処理をシミュレート（3秒間の遅延）
            setTimeout(() => {
                console.log("Function has completed.");
                resolve();
            }, 4000);
        });
    }



































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
  setInInput();
}


// -------------------------------------









function updateTime() {
  const now = new Date();
  const date = now.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
    }
  );
  const time = now.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
    }
  );
  document.getElementById('time').textContent = time;

}

setInterval(updateTime, 1000);
updateTime();
