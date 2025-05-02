// ----------- Anime Fetching and Rendering -------------

async function fetchAnime(query = '') {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=8`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch anime:', error);
    return [];
  }
}

function renderAnime(animes) {
  const animeList = document.getElementById('animeList');
  animeList.innerHTML = '';

  if (animes.length === 0) {
    animeList.innerHTML = `<div class="text-center text-danger"><h4>No anime found!</h4></div>`;
    return;
  }

  animes.forEach(anime => {
    const col = document.createElement('div');
    col.className = 'col-md-3 mb-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${anime.images.jpg.image_url}" class="card-img-top anime-image" alt="${anime.title}">
        <div class="card-body">
          <h5 class="card-title">${anime.title}</h5>
          <p class="card-text">${anime.synopsis ? anime.synopsis.substring(0, 80) + '...' : 'No description available.'}</p>
        </div>
      </div>
    `;
    animeList.appendChild(col);
  });
}

async function searchAnime() {
  const query = document.getElementById('searchInput').value.trim();
  const animes = await fetchAnime(query);
  renderAnime(animes);
}

// ----------- Login Check and Logout Functionality -------------

function checkLogin() {
  // Now checking BOTH localStorage and sessionStorage
  const currentUser = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");

  if (!currentUser) {
    alert("Please login first!");
    window.location.href = "login.html";
  } else {
    const displayName = currentUser.charAt(0).toUpperCase() + currentUser.slice(1);
    const welcomeUser = document.getElementById("welcomeUser");
    if (welcomeUser) {
      welcomeUser.innerText = `Welcome, ${displayName}`;
    }
  }
}

function logout() {
  // Remove user from both storage types
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("currentUser");
  alert("Logged out successfully!");
  window.location.href = "login.html";
}

// ----------- When Page Loads -------------

window.onload = async () => {
  checkLogin();              // ✅ Check login status first
  const animes = await fetchAnime();  // ✅ Then load anime list
  renderAnime(animes);
}
