// DOM elements
const form = document.getElementById("userForm");
const userTable = document.getElementById("userTable");
const themeToggle = document.getElementById("themeToggle");
const quoteEl = document.getElementById("quote");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar").firstElementChild;
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("nav-links");
const searchInput = document.getElementById("searchInput");

let users = JSON.parse(localStorage.getItem("users")) || [];

// 🔹 Render users
function renderUsers(filteredUsers = users) {
  userTable.innerHTML = "";
  filteredUsers.forEach((user, index) => {
    userTable.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${user.password}</td>
        <td>
          <button class="edit" onclick="editUser(${index})">Edit</button>
          <button class="delete" onclick="deleteUser(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
  localStorage.setItem("users", JSON.stringify(users));
}

// 🔹 Add new user
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = btoa(passwordInput.value.trim()); // encode for demo
  const role = document.getElementById("role").value;

  if (name && email && password && role) {
    users.push({ name, email, password, role });
    renderUsers();
    form.reset();
    strengthBar.style.width = "0%";
  }
});

// 🔹 Edit user
function editUser(index) {
  const user = users[index];
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("role").value = user.role;
  passwordInput.value = atob(user.password);
  users.splice(index, 1);
  renderUsers();
}

// 🔹 Delete user
function deleteUser(index) {
  if (confirm("Delete this user?")) {
    users.splice(index, 1);
    renderUsers();
  }
}

// 🔹 Toggle password visibility
togglePassword.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// 🔹 Password strength indicator
passwordInput.addEventListener("input", () => {
  const val = passwordInput.value;
  let strength = 0;
  if (val.length > 5) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val)) strength++;

  const width = (strength / 4) * 100;
  strengthBar.style.width = width + "%";
  strengthBar.style.background =
    ["red", "orange", "yellow", "lightgreen", "green"][strength];
});

// 🔹 Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// 🔹 Fetch quote
async function fetchQuote() {
  try {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    quoteEl.textContent = `"${data.content}" — ${data.author}`;
  } catch {
    quoteEl.textContent = "Keep coding. Keep growing!";
  }
}
fetchQuote();

// 🔹 Search filter
searchInput.addEventListener("input", (e) => {
  const val = e.target.value.toLowerCase();
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(val) || u.email.toLowerCase().includes(val)
  );
  renderUsers(filtered);
});

// 🔹 Navbar mobile toggle
menuBtn.addEventListener("click", () => navLinks.classList.toggle("show"));

// 🔹 Initial render
renderUsers();
