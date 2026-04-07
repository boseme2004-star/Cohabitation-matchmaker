// =======================
//  MATCH SYSTEM
// =======================

// Example match data
let matches = [
  {
    name: "Sarah",
    age: 26,
    job: "Graphic Designer",
    location: "Yaounde",
    price: "80 000frs",
    initials: "SM"
  },
  {
    name: "John",
    age: 28,
    job: "Engineer",
    location: "Douala",
    price: "100 000frs",
    initials: "JD"
  }
];

let currentMatchIndex = 0;

// Load match on screen
function loadMatch() {
  const match = matches[currentMatchIndex];
  if (!match) return;

  document.querySelector(".name").innerHTML =
    `${match.name}, <span class="age">${match.age}</span>`;

  document.querySelector(".job").textContent = match.job;
  document.querySelector(".location").textContent = "📍 " + match.location;
  document.querySelector(".price").textContent = "💰 " + match.price;
  document.querySelector(".initials").textContent = match.initials;
}

// Accept match → opens chat
function acceptMatch() {
  const match = matches[currentMatchIndex];

  alert("Matched with " + match.name + "! 🎉");

  // Add to chat list if not already there
  if (!chats[match.name]) {
    chats[match.name] = [
      { text: "Hey! We just matched 😊", type: "received" }
    ];

    // Add to sidebar
    const sidebar = document.querySelector(".sidebar");
    const newContact = document.createElement("div");
    newContact.classList.add("contact");
    newContact.textContent = match.name;
    newContact.onclick = () => loadChat(match.name);
    sidebar.appendChild(newContact);
  }

  loadChat(match.name);
  nextMatch();
}

// Reject match
function rejectMatch() {
  nextMatch();
}

// Go to next match
function nextMatch() {
  currentMatchIndex++;

  if (currentMatchIndex >= matches.length) {
    alert("No more matches 😢");
    return;
  }

  loadMatch();
}


// =======================
//  CHAT SYSTEM
// =======================

const chats = {
  Emily: [
    { text: "Hey! Are you still looking for a roommate?", type: "received" },
    { text: "Hi! Yes I am 😊", type: "sent" }
  ],
  John: [
    { text: "Yo! Got a place?", type: "received" },
    { text: "Not yet bro", type: "sent" }
  ]
};

let currentUser = "Emily";

// Load chat
function loadChat(name) {
  currentUser = name;

  const messages = document.getElementById("messages");
  messages.innerHTML = "";

  chats[name].forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("message", msg.type);
    div.textContent = msg.text;
    messages.appendChild(div);
  });

  // Highlight active contact
  document.querySelectorAll(".contact").forEach(c => c.classList.remove("active"));
  event.target.classList.add("active");

  messages.scrollTop = messages.scrollHeight;
}

// Send message
function sendMessage() {
  const input = document.getElementById("messageInput");
  const messageText = input.value.trim();

  if (messageText === "") return;

  const messages = document.getElementById("messages");

  const newMessage = document.createElement("div");
  newMessage.classList.add("message", "sent");
  newMessage.textContent = messageText;

  messages.appendChild(newMessage);

  chats[currentUser].push({ text: messageText, type: "sent" });

  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  setTimeout(autoReply, 1000);
}

// Auto reply
function autoReply() {
  const replies = [
    "That sounds good!",
    "Nice 👍",
    "Let’s discuss more",
    "I agree!",
    "Okay, cool 😊"
  ];

  const messages = document.getElementById("messages");

  const replyText = replies[Math.floor(Math.random() * replies.length)];

  const reply = document.createElement("div");
  reply.classList.add("message", "received");
  reply.textContent = replyText;

  messages.appendChild(reply);

  chats[currentUser].push({ text: replyText, type: "received" });

  messages.scrollTop = messages.scrollHeight;
}


// =======================
//  INITIALIZATION
// =======================

document.addEventListener("DOMContentLoaded", () => {

  // Load first match (if on match page)
  if (document.querySelector(".name")) {
    loadMatch();
  }

  // Load chat (if on chat page)
  if (document.getElementById("messages")) {
    loadChat(currentUser);
  }

  // Enter key for sending messages
  const input = document.getElementById("messageInput");
  if (input) {
    input.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }
});