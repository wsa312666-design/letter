import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const root = document.body.dataset.root || "";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // ยังไม่ได้ล็อกอิน -> เด้งไปหน้าล็อกอิน
    window.location.href = root + "login.html";
    return;
  }
  const emailEl = document.getElementById("user-email");
  if (emailEl) emailEl.textContent = user.email;
});

const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await signOut(auth);
    window.location.href = root + "login.html";
  });
}
