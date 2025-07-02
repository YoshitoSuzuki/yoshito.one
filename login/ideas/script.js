function showOverlay() {
  document.getElementById('overlay').style.display = 'block';
}
function hideOverlay() {
  document.getElementById('overlay').style.display = 'none';
}
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Enter') return;

  const active = document.activeElement;
  if (!active || !(active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;

  const targetBtnId = active.dataset.submit;
  if (!targetBtnId) return;

  const btn = document.getElementById(targetBtnId);
  if (btn) btn.click();
});
