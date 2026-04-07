/* ==============================
   Cohabitation Matchmaking Platform
   Professional & Secure script.js
   ============================== */

"use strict";

// ==============================
// Utility Functions
// ==============================

// Sanitize input (prevent XSS)
function sanitizeInput(input) {
  if (typeof input !== "string") return input;
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML.trim();
}

// Validate Email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Password Strength Check
function validatePassword(password) {
  return password.length >= 6;
}

// ==============================
// Form Handling
// ==============================

const signupForm = document.querySelector(".right");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = signupForm.querySelectorAll("input, select");
    let formData = {};

    inputs.forEach(input => {
      const key = input.placeholder || input.name;
      formData[key] = sanitizeInput(input.value);
    });

    // Basic validation
    if (!validateEmail(formData["Enter your email"])) {
      alert("Invalid email address");
      return;
    }

    if (!validatePassword(formData["Create a password"])) {
      alert("Password must be at least 6 characters");
      return;
    }

    console.log("Secure Form Data:", formData);
    alert("Account created successfully!");

    // Simulate save
    localStorage.setItem("user", JSON.stringify(formData));
  });
}

// ==============================
// Profile Save (Account Page)
// ==============================

const saveBtn = document.querySelector(".btn");

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const inputs = document.querySelectorAll("input, select");
    let profile = {};

    inputs.forEach(input => {
      const key = input.previousElementSibling
        ? input.previousElementSibling.textContent
        : "field";
      profile[key] = sanitizeInput(input.value);
    });

    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile saved securely!");
  });
}

// ==============================
// Load Saved Data
// ==============================

window.addEventListener("DOMContentLoaded", () => {
  const savedProfile = JSON.parse(localStorage.getItem("profile"));

  if (savedProfile) {
    const inputs = document.querySelectorAll("input, select");

    inputs.forEach(input => {
      const key = input.previousElementSibling
        ? input.previousElementSibling.textContent
        : "";

      if (savedProfile[key]) {
        input.value = savedProfile[key];
      }
    });
  }
});

// ==============================
// UI Enhancements
// ==============================

// Smooth scroll
const links = document.querySelectorAll("a[href^='#']");

links.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Button loading effect
const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.innerText = "Processing...";
    btn.disabled = true;

    setTimeout(() => {
      btn.innerText = "Done";
      btn.disabled = false;
    }, 1500);
  });
});

// ==============================
// Security Best Practices (Frontend)
// ==============================

// Prevent console access in production (optional)
(function () {
  const isDev = true; // change to false in production
  if (!isDev) {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
})();

// Disable right-click (basic protection)
document.addEventListener("contextmenu", e => e.preventDefault());

// Prevent key shortcuts (basic protection)
document.addEventListener("keydown", e => {
  if (e.ctrlKey && (e.key === "u" || e.key === "s")) {
    e.preventDefault();
  }
});

 