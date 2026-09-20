import { fetchCafes } from "./sheet.js";

const cafeId = document.body.dataset.cafeId;

function buildMapUrl(name, address) {
  const q = encodeURIComponent(`${name} ${address || ""}`.trim());
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

(async () => {
  const rows = await fetchCafes();
  if (!rows) return; // ไม่มีข้อมูลจากชีท -> คงข้อมูลสำรองที่ฝังไว้ในไฟล์

  const row = rows.find((r) => r.id === cafeId);
  if (!row) return; // ไม่พบแถวที่ตรงกับร้านนี้ในชีท -> คงข้อมูลสำรอง

  const titleEl = document.getElementById("cafe-title");
  const crumbEl = document.getElementById("cafe-title-crumb");
  const descEl = document.getElementById("cafe-desc");
  const hoursEl = document.getElementById("cafe-hours");
  const addressEl = document.getElementById("cafe-address");
  const mapEl = document.getElementById("cafe-map");

  if (row.name_th) {
    if (titleEl) titleEl.textContent = row.name_th;
    if (crumbEl) crumbEl.textContent = row.name_th;
    document.title = document.title.replace(/^[^—]+—/, row.name_th + " —");
  }
  if (row.desc && descEl) descEl.textContent = row.desc;
  if (row.hours && hoursEl) hoursEl.textContent = row.hours;
  if (row.address && addressEl) addressEl.textContent = row.address;

  if (mapEl) {
    const name = row.name_th || (titleEl ? titleEl.textContent : "");
    const query = row.map_query || row.address || name;
    mapEl.innerHTML = `<iframe loading="lazy" src="${buildMapUrl(name, query)}" allowfullscreen></iframe>`;
  }
})();
