// スクロールするとclassを追加
window.addEventListener('scroll', function() {
  const formattedDate = document.getElementById('formattedDate');
  const timeSec = document.getElementById('time');
  const scrollThreshold = 100; // スクロールのしきい値

  if (window.scrollY > scrollThreshold) {
    formattedDate.classList.add('scrolleddate');
    formattedDate.classList.add('scrolled');
    timeSec.classList.add('scrolled');
    timeSec.classList.add('scrolledtime');
  } else {
    formattedDate.classList.remove('scrolleddate');
    formattedDate.classList.remove('scrolled');
    timeSec.classList.remove('scrolled');
    timeSec.classList.remove('scrolledtime');
  }
});



//  SpYK3DMJwUGH9Q2EVGag/eWw4CdGZm8Ez9QzUByQC/QgRs3ZDsEymnYhmhGK5f/mGz77n97U25DhAxGFA647eYBSt6XZKX8Wfb3VcwjtSEnBiAhzSNnQPppgFyE4utpBp2FiNAF9jpZRsDV9fX2uUCcJJCcZN54grni/
