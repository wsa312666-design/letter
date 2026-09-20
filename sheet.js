import { SHEET_ID, SHEET_NAME } from "./sheet-config.js";

let cachedRows = null;

// คืนค่า array ของแถวข้อมูล เช่น [{id:"1", district:"mueang", name_th:"...", desc:"...", hours:"...", address:"...", map_query:"..."}]
// ถ้ายังไม่ได้ตั้งค่า Sheet ID หรือดึงข้อมูลไม่สำเร็จ จะคืนค่า null (หน้าเว็บจะใช้ข้อมูลสำรองที่ฝังไว้ในไฟล์แทน)
export async function fetchCafes() {
  if (cachedRows) return cachedRows;
  if (!SHEET_ID || SHEET_ID === "YOUR_SHEET_ID") return null;

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const text = await res.text();
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) return null;
    const json = JSON.parse(text.substring(jsonStart, jsonEnd + 1));

    const cols = json.table.cols.map((c) =>
      (c.label || c.id || "").toString().trim().toLowerCase()
    );

    const rows = json.table.rows.map((r) => {
      const obj = {};
      (r.c || []).forEach((cell, i) => {
        const key = cols[i];
        if (!key) return;
        obj[key] = cell ? (cell.f ?? cell.v ?? "").toString().trim() : "";
      });
      return obj;
    }).filter((row) => row.id);

    cachedRows = rows;
    return rows;
  } catch (err) {
    console.warn("โหลดข้อมูลจาก Google Sheet ไม่สำเร็จ ใช้ข้อมูลสำรองแทน:", err);
    return null;
  }
}
