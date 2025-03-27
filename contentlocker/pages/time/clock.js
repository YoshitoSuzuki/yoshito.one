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
  // document.getElementById('date').textContent = date;
  document.getElementById('time').textContent = time;

  // 令和表記
  const year = now.getFullYear();
  const reiwaYear = year - 2018; // 2019年が令和1年
  const reiwaDate = `${year}年 令和${reiwaYear}年${now.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'long' })}`;
  document.getElementById('reiwaDate').textContent = reiwaDate;

  //2006/05/07表記
  const formattedDate = now.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }
  ).replace(/\//g, '/');
  document.getElementById('formattedDate').textContent = formattedDate;

  // UTC timeout
  const utcTime = now.toUTCString();  // UTCの時間を取得
  document.getElementById('utctime').textContent = utcTime;
}

setInterval(updateTime, 1000);
updateTime();



// 以下12h時計

function updateClock12() {
            const clock12Element12 = document.getElementById("clock12");
            const now12 = new Date();

            let hours12 = now12.getHours();
            const minutes12 = now12.getMinutes();
            const seconds12 = now12.getSeconds();
            const isAM = hours12 < 12;

            // 12時間表記に変換
            hours12 = hours12 % 12 || 12;

            // 数字を2桁にする
            const formattedTime = [
                hours12.toString().padStart(2, '0'),
                minutes12.toString().padStart(2, '0'),
                seconds12.toString().padStart(2, '0')
            ].join(':') + ' ' + (isAM ? 'AM' : 'PM');

            clock12Element12.textContent = formattedTime;
        }

        // 1秒ごとにupdateClock12を呼び出す
        setInterval(updateClock12, 1000);

        // ページが読み込まれたときにすぐに時計を表示
        updateClock12();
