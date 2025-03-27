function filterCards() {
  let input = document.getElementById("search").value.toLowerCase();
  let cards = document.querySelectorAll(".card");
  cards.forEach(card => {
      let title = card.getAttribute("data-date").toLowerCase();
      card.style.display = title.includes(input) ? "block" : "none";
  });
}

function sortCards() {
  let container = document.getElementById("cardContainer");
  let cards = Array.from(container.children);
  let sortOrder = document.getElementById("sort").value;
  cards.sort((a, b) => {
      let titleA = a.getAttribute("data-date");
      let titleB = b.getAttribute("data-date");
      return sortOrder === "asc" ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
  });
  cards.forEach(card => container.appendChild(card));
}