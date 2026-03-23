// script.js
document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // 開閉の切り替え
            if (answer.classList.contains('open')) {
                answer.classList.remove('open');
            } else {
                // 他の開いているものを閉じる（任意）
                document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('open'));
                answer.classList.add('open');
            }
        });
    });
});