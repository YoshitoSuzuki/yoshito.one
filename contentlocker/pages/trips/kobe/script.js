document.addEventListener('DOMContentLoaded', function() {
    
    // 全てのトグルボタンを取得
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    // 各ボタンにクリックイベントを追加
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // ボタンのdata-target属性から対象のテーブルIDを取得
            const targetId = this.dataset.target;
            const targetTable = document.getElementById(targetId);

            if (targetTable) {
                // テーブルに'hidden'クラスを付けたり外したりする
                targetTable.classList.toggle('hidden');

                // ボタンのテキストを切り替える
                if (targetTable.classList.contains('hidden')) {
                    this.textContent = '詳細を見る';
                } else {
                    this.textContent = '詳細を隠す';
                }
            }
        });
    });

});