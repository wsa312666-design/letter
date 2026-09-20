import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ถ้าล็อกอินอยู่แล้วและมาเปิดหน้า login/register ซ้ำ ให้เด้งเข้า index ทันที
onAuthStateChanged(auth, (user) => {
  if (user && document.body.dataset.skipAutoRedirect !== "true") {
    window.location.href = "index.html";
  }
});

function showError(el, err) {
  const map = {
    "auth/invalid-email": "รูปแบบอีเมลไม่ถูกต้อง",
    "auth/user-not-found": "ไม่พบบัญชีนี้ในระบบ",
    "auth/wrong-password": "รหัสผ่านไม่ถูกต้อง",
    "auth/invalid-credential": "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
    "auth/email-already-in-use": "อีเมลนี้มีบัญชีอยู่แล้ว",
    "auth/weak-password": "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
    "auth/too-many-requests": "ลองผิดหลายครั้งเกินไป กรุณารอสักครู่แล้วลองใหม่",
  };
  el.textContent = map[err.code] || "เกิดข้อผิดพลาด: " + err.message;
  el.style.display = "block";
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const errorEl = document.getElementById("form-error");
    errorEl.style.display = "none";
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "index.html";
    } catch (err) {
      showError(errorEl, err);
    }
  });
}

const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm-password").value;
    const errorEl = document.getElementById("form-error");
    errorEl.style.display = "none";
    if (password !== confirm) {
      errorEl.textContent = "รหัสผ่านทั้งสองช่องไม่ตรงกัน";
      errorEl.style.display = "block";
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "index.html";
    } catch (err) {
      showError(errorEl, err);
    }
  });
}

const forgotLink = document.getElementById("forgot-password");
if (forgotLink) {
  forgotLink.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const errorEl = document.getElementById("form-error");
    errorEl.style.display = "none";
    if (!email) {
      errorEl.textContent = "กรอกอีเมลของคุณในช่องด้านบนก่อน แล้วกด “ลืมรหัสผ่าน” อีกครั้ง";
      errorEl.style.display = "block";
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      errorEl.style.color = "var(--forest)";
      errorEl.textContent = "ส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมลแล้ว กรุณาตรวจสอบกล่องจดหมาย";
      errorEl.style.display = "block";
    } catch (err) {
      showError(errorEl, err);
    }
  });
}
