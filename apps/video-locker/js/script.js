function copyEmail() {
    const emailElement = document.getElementById('email-address');
    if (!emailElement) return;
    
    const emailText = emailElement.innerText;
    
    navigator.clipboard.writeText(emailText).then(() => {
        alert('メールアドレスをコピーしました');
    }).catch(err => {
        console.error('コピーに失敗しました', err);
    });
}