// ตั้งค่าการเชื่อมต่อ Google Sheet
// 1. เปิด Google Sheet ของคุณ กด "Share" > เปลี่ยนเป็น "Anyone with the link" (ดูได้ = Viewer)
// 2. คัดลอก Sheet ID จาก URL ตรงกลาง เช่น
//    https://docs.google.com/spreadsheets/d/  1AbCdEfGhIjKlMnOpQrStUvWxYz  /edit
//                                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^ อันนี้คือ Sheet ID
// 3. วางแทนค่า YOUR_SHEET_ID ด้านล่าง
// 4. ชื่อแท็บ (sheet tab) ที่เก็บข้อมูลร้าน ต้องตรงกับ SHEET_NAME ด้านล่าง (ค่าเริ่มต้นคือ "cafes")

export const SHEET_ID = "YOUR_SHEET_ID";
export const SHEET_NAME = "cafes";
