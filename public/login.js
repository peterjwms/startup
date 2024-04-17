(async () => {
  const userName = localStorage.getItem('userName');
  if (userName) {
    document.querySelector('#player-name').textContent = userName;
    setDisplay('login-controls', 'none');
    setDisplay('play-controls', 'block');
  } else {
    setDisplay('login-controls', 'block');
    setDisplay('play-controls', 'none');
  }
})();

function setDisplay(controlId, display) {
  const playControlEl = document.querySelector(`#${controlId}`);
  if (playControlEl) {
    playControlEl.style.display = display;
  }
}

function toProfile() {
  window.location.href = 'profile.html';
}

function logout() {
  localStorage.removeItem('userName');
  fetch('/api/auth/logout', {
    method: 'POST',
  }).then(() => {
    window.location.href = 'index.html';
  });
}

async function getUser(username) {
  const response = await fetch(`/api/user/${username}`);
  if (response.ok) {
    return response.json();
  }
  return null;
}

async function login() {
  // const nameEl = document.querySelector("#username");
  // localStorage.setItem("userName", nameEl.value);
  // window.location.href = "profile.html";
  loginOrCreate('/api/auth/login');
}

async function register() {
  loginOrCreate('/api/auth/create');
}

async function loginOrCreate(endpoint) {
  const username = document.querySelector("#username")?.value;
  const password = document.querySelector("#password")?.value;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  if (response.ok) {
    localStorage.setItem('userName', username);
    window.location.href = 'profile.html';
  } else {
    const body = await response.json();
    alert(`Error: ${body.message}`)
  }
}
