const desktop = document.getElementById('desktop');
const shelf = document.getElementById('shelf');
const launcher = document.getElementById('launcher');
const launcherButton = document.getElementById('launcherButton');
const tray = document.getElementById('tray');
const trayButton = document.getElementById('trayButton');
const browserWindow = document.getElementById('browserWindow');
const address = document.getElementById('address');
const search = document.getElementById('search');
const launcherSearch = document.getElementById('launcherSearch');
const launcherApps = [...document.querySelectorAll('.launcher-app')];

function togglePanel(panel, other) {
  const opening = !panel.classList.contains('open');
  other.classList.remove('open');
  panel.classList.toggle('open', opening);
}

launcherButton.addEventListener('click', event => {
  event.stopPropagation();
  togglePanel(launcher, tray);
});

trayButton.addEventListener('click', event => {
  event.stopPropagation();
  togglePanel(tray, launcher);
});

launcher.addEventListener('click', event => event.stopPropagation());
tray.addEventListener('click', event => event.stopPropagation());

document.addEventListener('click', () => {
  launcher.classList.remove('open');
  tray.classList.remove('open');
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    launcher.classList.remove('open');
    tray.classList.remove('open');
  }
});

document.getElementById('maximizeButton').addEventListener('click', () => {
  browserWindow.classList.toggle('maximized');
});

document.getElementById('minimizeButton').addEventListener('click', () => {
  browserWindow.classList.add('minimized');
  setTimeout(() => browserWindow.classList.remove('minimized'), 350);
});

document.getElementById('closeButton').addEventListener('click', () => {
  browserWindow.style.display = 'none';
});

document.querySelector('.tab-x').addEventListener('click', () => {
  browserWindow.style.display = 'none';
});

document.querySelector('.new-tab').addEventListener('click', () => {
  browserWindow.style.display = '';
  browserWindow.classList.remove('minimized');
});

function runSearch(value) {
  const query = value.trim();
  if (!query) return;
  if (/^https?:\/\//i.test(query)) {
    window.location.href = query;
    return;
  }
  address.value = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  document.title = `${query} - Chrnos`;
}

search.addEventListener('keydown', event => {
  if (event.key === 'Enter') runSearch(search.value);
});

address.addEventListener('keydown', event => {
  if (event.key === 'Enter') runSearch(address.value);
});

launcherSearch.addEventListener('input', () => {
  const query = launcherSearch.value.toLowerCase().trim();
  launcherApps.forEach(app => {
    app.style.display = app.dataset.name.toLowerCase().includes(query) ? '' : 'none';
  });
});

launcherApps.forEach(app => {
  app.addEventListener('click', () => {
    const name = app.dataset.name;
    launcher.classList.remove('open');
    if (name === 'Chrome') {
      browserWindow.style.display = '';
      browserWindow.classList.remove('minimized');
    } else if (name === 'Google Search') {
      search.focus();
    } else {
      address.value = `${name}`;
      search.value = name;
    }
  });
});

let hideTimer;
function scheduleAutoHide() {
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    if (!launcher.classList.contains('open') && !tray.classList.contains('open')) {
      desktop.classList.add('shelf-autohide');
    }
  }, 3500);
}

function wakeShelf() {
  desktop.classList.remove('shelf-autohide');
  scheduleAutoHide();
}

['mousemove','pointermove','keydown'].forEach(type => document.addEventListener(type, wakeShelf, {passive:true}));
shelf.addEventListener('mouseenter', () => desktop.classList.remove('shelf-autohide'));
scheduleAutoHide();

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}`;
}
updateClock();
setInterval(updateClock, 1000);
