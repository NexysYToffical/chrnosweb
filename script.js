const address = document.getElementById('address');
const search = document.getElementById('search');
const searchButton = document.getElementById('searchButton');

function runSearch() {
  const query = search.value.trim();
  if (!query) return;

  address.value = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  document.title = `${query} - Chrnos`;
}

searchButton.addEventListener('click', runSearch);
search.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') runSearch();
});

address.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  const value = address.value.trim();
  if (!value) return;

  if (/^https?:\/\//i.test(value)) {
    window.location.href = value;
  } else {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(value)}`;
  }
});
