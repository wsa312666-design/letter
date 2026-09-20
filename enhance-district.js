import { fetchCafes } from "./sheet.js";

const district = document.body.dataset.district;

(async () => {
  const rows = await fetchCafes();
  if (!rows) return; // ไม่มีข้อมูลจากชีท -> คงข้อมูลสำรองที่ฝังไว้ในไฟล์

  const districtRows = rows.filter((r) => r.district === district);
  if (districtRows.length === 0) return;

  districtRows.forEach((row) => {
    const card = document.querySelector(`.cafe-card[data-cafe-id="${row.id}"]`);
    if (!card) return; // ชีทมีร้านที่ยังไม่มีไฟล์หน้ารายละเอียด -> ข้ามไปก่อน
    if (row.name_th) {
      const nameEl = card.querySelector(".cafe-name");
      if (nameEl) nameEl.textContent = row.name_th;
      const coverEl = card.querySelector(".cafe-cover");
      if (coverEl) coverEl.textContent = row.name_th;
    }
    if (row.hours) {
      const hoursEl = card.querySelector(".hours");
      if (hoursEl) hoursEl.textContent = row.hours;
    }
    if (row.desc) {
      const descEl = card.querySelector(".cafe-desc-excerpt");
      if (descEl) descEl.textContent = row.desc.slice(0, 70) + "…";
    }
  });
})();
