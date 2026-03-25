// Helpers
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Account Save (store multiple users)
const accountForm = document.getElementById("accountForm");
if (accountForm) {
  accountForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      preferences: []
    };

    const users = getUsers();
    users.push(newUser);
    saveUsers(users);

    localStorage.setItem("currentUserId", newUser.id);
    document.getElementById("status").textContent = "Account created!";
  });
}

// Load current user
function getCurrentUser() {
  const users = getUsers();
  const id = localStorage.getItem("currentUserId");
  return users.find(u => u.id == id);
}

// Profile Load
const currentUser = getCurrentUser();
if (currentUser) {
  const nameEl = document.getElementById("profileName");
  const emailEl = document.getElementById("profileEmail");

  if (nameEl) nameEl.textContent = currentUser.name;
  if (emailEl) emailEl.textContent = currentUser.email;
}

// Save Preferences
const profileForm = document.getElementById("profileForm");
if (profileForm) {
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const prefs = document
      .getElementById("preferences")
      .value
      .toLowerCase()
      .split(",")
      .map(p => p.trim());

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id == currentUser.id);

    users[userIndex].preferences = prefs;
    saveUsers(users);

    document.getElementById("profileStatus").textContent = "Preferences saved!";
    displayMatches();
  });
}

// Match Algorithm
function calculateMatchScore(prefs1, prefs2) {
  return prefs1.filter(p => prefs2.includes(p)).length;
}

// Display Matches
function displayMatches() {
  const users = getUsers();
  const current = getCurrentUser();

  if (!current || !current.preferences.length) return;

  const matches = users
    .filter(u => u.id !== current.id)
    .map(u => ({
      ...u,
      score: calculateMatchScore(current.preferences, u.preferences)
    }))
    .sort((a, b) => b.score - a.score);

  let container = document.getElementById("matches");
  if (!container) {
    container = document.createElement("div");
    container.id = "matches";
    document.querySelector(".container").appendChild(container);
  }

  container.innerHTML = "<h3>Matches</h3>";

  matches.forEach(m => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <p><strong>${m.name}</strong></p>
      <p>Match Score: ${m.score}</p>
      <p>${m.preferences.join(", ")}</p>
    `;
    container.appendChild(div);
  });
}

// Auto load matches
if (window.location.pathname.includes("profile.html")) {
  displayMatches();
}