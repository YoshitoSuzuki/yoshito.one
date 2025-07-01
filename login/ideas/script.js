function showOverlay() {
  document.getElementById('overlay').style.display = 'block';
}
function hideOverlay() {
  document.getElementById('overlay').style.display = 'none';
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const active = document.activeElement;
    if (!active || active.tagName !== 'INPUT' && active.tagName !== 'TEXTAREA') return;

    const form = active.closest('form') || document.body;
    const btn = form.querySelector('button[type=button], button:not([type])');
    if (btn) btn.click();
  }
});
