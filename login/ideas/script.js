function showLoading(message = "処理中です。しばらくお待ちください...") {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    const content = overlay.querySelector(".overlay-content p");
    if (content) content.textContent = message;
      overlay.style.display = "flex";
    }
  }

function hideLoading() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) overlay.style.display = "none";
}