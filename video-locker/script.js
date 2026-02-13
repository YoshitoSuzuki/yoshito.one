function copyEmail() {
    const emailText = document.getElementById('email-address').innerText;
    
    navigator.clipboard.writeText(emailText).then(() => {
        const btn = document.getElementById('copy-btn');
        const originalText = btn.innerText;
        
        btn.innerText = 'コピー完了!';
        btn.style.backgroundColor = '#4CD964'; // 緑色に変更
        btn.style.color = 'white';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = '#E5E5E5';
            btn.style.color = 'black';
        }, 2000);
    }).catch(err => {
        console.error('コピーに失敗しました', err);
    });
}

// ページ内リンクのスムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});