// แทนที่ค่าด้านล่างทั้งหมดด้วยค่าจริงจากโปรเจกต์ Firebase ของคุณ
// วิธีหา: Firebase Console > เลือกโปรเจกต์ > ไอคอนเฟือง (Project settings)
// > เลื่อนลงมาที่ "Your apps" > เลือกแอปแบบ Web (</>) > จะเห็นก้อนโค้ดนี้ตรงนั้น คัดลอกมาแปะแทนได้เลย

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
