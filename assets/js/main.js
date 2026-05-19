(function () {
  "use strict";

  const suppliers = [
    { id: "SUP-001", name: "Sino Metal Resources Co., Ltd.", country: "China", material: ["SC-CU", "SC-MX"] },
    { id: "SUP-002", name: "Hanwa Metal Corp.", country: "Japan", material: ["SC-BR", "SC-BZ"] },
    { id: "SUP-003", name: "Metal Management Asia Pte. Ltd.", country: "Singapore", material: ["SC-CU", "SC-BR"] },
    { id: "SUP-004", name: "Korea Zinc Trading Co.", country: "Korea", material: ["SC-BZ", "SC-MX"] }
  ];

  const customers = [
    { id: "CST-001", name: "Taiwan Copper Industries Ltd.", country: "Taiwan" },
    { id: "CST-002", name: "Yung Chi Metal Co., Ltd.", country: "Taiwan" },
    { id: "CST-003", name: "Sumitomo Metal Industries", country: "Japan" }
  ];

  const materialCatalog = {
    "SC-CU": { name: "Scrap Tembaga", color: "#B87333" },
    "SC-BR": { name: "Scrap Kuningan", color: "#CFB53B" },
    "SC-BZ": { name: "Scrap Perunggu", color: "#CD7F32" },
    "SC-MX": { name: "Scrap Campuran", color: "#707783" }
  };

  const productCatalog = {
    "ING-CU": { name: "Ingot Tembaga", material: "SC-CU" },
    "ING-BR": { name: "Ingot Kuningan", material: "SC-BR" },
    "ING-BZ": { name: "Ingot Perunggu", material: "SC-BZ" }
  };

  const yieldStandard = {
    "ING-CU": { min: 92, max: 96, slagTypical: 5 },
    "ING-BR": { min: 88, max: 93, slagTypical: 8 },
    "ING-BZ": { min: 90, max: 94, slagTypical: 6 }
  };

  const discrepancyThreshold = {
    timbang: 0.3,
    pemilahan: 0.5,
    yieldProd: 2.0,
    stokOpname: 0.5,
    major: 2.0
  };

  const seedData = {
    receivingList: [
      { lotNo: "FNM-LOT-202505-001", pibNo: "PIB-2025-00089", supplier: "Sino Metal Resources Co., Ltd.", material: "SC-CU", dateIn: "2025-05-02 08:30", weightPIB: 12500, weightActual: 12480, status: "Sudah Dipilah", suratJalan: "SJ-SMR-0502-01" },
      { lotNo: "FNM-LOT-202505-002", pibNo: "PIB-2025-00090", supplier: "Hanwa Metal Corp.", material: "SC-BR", dateIn: "2025-05-04 10:15", weightPIB: 8000, weightActual: 7985, status: "Sudah Dipilah", suratJalan: "SJ-HMC-0504-03" },
      { lotNo: "FNM-LOT-202505-003", pibNo: "PIB-2025-00091", supplier: "Metal Management Asia Pte. Ltd.", material: "SC-CU", dateIn: "2025-05-06 14:00", weightPIB: 15000, weightActual: 14950, status: "Menunggu Pemilahan", suratJalan: "SJ-MMA-0506-02" },
      { lotNo: "FNM-LOT-202505-004", pibNo: "PIB-2025-00092", supplier: "Korea Zinc Trading Co.", material: "SC-BZ", dateIn: "2025-05-07 09:10", weightPIB: 6200, weightActual: 6188, status: "Sudah Dipilah", suratJalan: "SJ-KZT-0507-01" },
      { lotNo: "FNM-LOT-202505-005", pibNo: "PIB-2025-00093", supplier: "Sino Metal Resources Co., Ltd.", material: "SC-MX", dateIn: "2025-05-08 13:35", weightPIB: 9300, weightActual: 9250, status: "Selisih Terdeteksi", suratJalan: "SJ-SMR-0508-01" },
      { lotNo: "FNM-LOT-202505-006", pibNo: "PIB-2025-00094", supplier: "Metal Management Asia Pte. Ltd.", material: "SC-BR", dateIn: "2025-05-09 08:20", weightPIB: 7600, weightActual: 7590, status: "Sudah Dipilah", suratJalan: "SJ-MMA-0509-01" },
      { lotNo: "FNM-LOT-202505-007", pibNo: "PIB-2025-00095", supplier: "Hanwa Metal Corp.", material: "SC-BZ", dateIn: "2025-05-10 11:40", weightPIB: 6900, weightActual: 6875, status: "Menunggu Pemilahan", suratJalan: "SJ-HMC-0510-02" },
      { lotNo: "FNM-LOT-202505-008", pibNo: "PIB-2025-00096", supplier: "Sino Metal Resources Co., Ltd.", material: "SC-CU", dateIn: "2025-05-11 15:05", weightPIB: 11800, weightActual: 11792, status: "Sudah Dipilah", suratJalan: "SJ-SMR-0511-02" },
      { lotNo: "FNM-LOT-202505-009", pibNo: "PIB-2025-00097", supplier: "Korea Zinc Trading Co.", material: "SC-MX", dateIn: "2025-05-12 09:45", weightPIB: 5400, weightActual: 5372, status: "Menunggu Pemilahan", suratJalan: "SJ-KZT-0512-01" },
      { lotNo: "FNM-LOT-202505-010", pibNo: "PIB-2025-00098", supplier: "Metal Management Asia Pte. Ltd.", material: "SC-CU", dateIn: "2025-05-13 10:25", weightPIB: 13200, weightActual: 13170, status: "Sudah Dipilah", suratJalan: "SJ-MMA-0513-01" },
      { lotNo: "FNM-LOT-202505-011", pibNo: "PIB-2025-00099", supplier: "Hanwa Metal Corp.", material: "SC-BR", dateIn: "2025-05-14 07:55", weightPIB: 8400, weightActual: 8382, status: "Sudah Dipilah", suratJalan: "SJ-HMC-0514-01" },
      { lotNo: "FNM-LOT-202505-012", pibNo: "PIB-2025-00100", supplier: "Sino Metal Resources Co., Ltd.", material: "SC-CU", dateIn: "2025-05-15 13:10", weightPIB: 9900, weightActual: 9878, status: "Menunggu Pemilahan", suratJalan: "SJ-SMR-0515-01" },
      { lotNo: "FNM-LOT-202505-013", pibNo: "PIB-2025-00101", supplier: "Korea Zinc Trading Co.", material: "SC-BZ", dateIn: "2025-05-16 08:45", weightPIB: 7100, weightActual: 7070, status: "Sudah Dipilah", suratJalan: "SJ-KZT-0516-01" },
      { lotNo: "FNM-LOT-202505-014", pibNo: "PIB-2025-00102", supplier: "Metal Management Asia Pte. Ltd.", material: "SC-BR", dateIn: "2025-05-17 16:20", weightPIB: 6750, weightActual: 6715, status: "Menunggu Pemilahan", suratJalan: "SJ-MMA-0517-01" },
      { lotNo: "FNM-LOT-202505-015", pibNo: "PIB-2025-00103", supplier: "Sino Metal Resources Co., Ltd.", material: "SC-MX", dateIn: "2025-05-18 09:00", weightPIB: 8800, weightActual: 8725, status: "Selisih Terdeteksi", suratJalan: "SJ-SMR-0518-01" },
      { lotNo: "FNM-LOT-202505-016", pibNo: "PIB-2025-00104", supplier: "Hanwa Metal Corp.", material: "SC-BZ", dateIn: "2025-05-19 07:40", weightPIB: 6400, weightActual: 6394, status: "Menunggu Pemilahan", suratJalan: "SJ-HMC-0519-01" }
    ],
    sortingList: [
      { lotNo: "FNM-LOT-202505-001", scCu: 12230, scBr: 0, scBz: 0, scMx: 90, contaminant: 160, operator: "Rudi Hartono", date: "2025-05-02 13:10" },
      { lotNo: "FNM-LOT-202505-002", scCu: 0, scBr: 7760, scBz: 90, scMx: 55, contaminant: 80, operator: "Adi Pratama", date: "2025-05-04 15:25" },
      { lotNo: "FNM-LOT-202505-004", scCu: 0, scBr: 85, scBz: 5960, scMx: 40, contaminant: 103, operator: "Rudi Hartono", date: "2025-05-07 14:30" },
      { lotNo: "FNM-LOT-202505-006", scCu: 120, scBr: 7330, scBz: 0, scMx: 55, contaminant: 85, operator: "Maya Sari", date: "2025-05-09 13:55" },
      { lotNo: "FNM-LOT-202505-008", scCu: 11590, scBr: 0, scBz: 0, scMx: 80, contaminant: 122, operator: "Adi Pratama", date: "2025-05-11 17:15" },
      { lotNo: "FNM-LOT-202505-010", scCu: 12940, scBr: 0, scBz: 0, scMx: 95, contaminant: 135, operator: "Maya Sari", date: "2025-05-13 15:00" },
      { lotNo: "FNM-LOT-202505-011", scCu: 0, scBr: 8170, scBz: 70, scMx: 35, contaminant: 107, operator: "Rudi Hartono", date: "2025-05-14 12:30" },
      { lotNo: "FNM-LOT-202505-013", scCu: 0, scBr: 75, scBz: 6850, scMx: 60, contaminant: 85, operator: "Adi Pratama", date: "2025-05-16 13:20" }
    ],
    heatLogList: [
      { heatNo: "FNM-HEAT-202505-001", product: "ING-CU", inputKg: 5200, outputKg: 4810, rejectKg: 50, slagKg: 280, returnsKg: 45, yieldPct: 92.5, date: "2025-05-03", status: "Selesai - Yield OK", operator: "Bambang W.", shiftLead: "Hendra" },
      { heatNo: "FNM-HEAT-202505-002", product: "ING-BR", inputKg: 4800, outputKg: 4230, rejectKg: 55, slagKg: 420, returnsKg: 70, yieldPct: 88.1, date: "2025-05-04", status: "Selesai - Yield OK", operator: "Dedi S.", shiftLead: "Hendra" },
      { heatNo: "FNM-HEAT-202505-003", product: "ING-CU", inputKg: 6100, outputKg: 5685, rejectKg: 40, slagKg: 300, returnsKg: 55, yieldPct: 93.2, date: "2025-05-05", status: "Selesai - Yield OK", operator: "Bambang W.", shiftLead: "Sutrisno" },
      { heatNo: "FNM-HEAT-202505-004", product: "ING-BZ", inputKg: 4300, outputKg: 3940, rejectKg: 45, slagKg: 250, returnsKg: 45, yieldPct: 91.6, date: "2025-05-06", status: "Selesai - Yield OK", operator: "Joko P.", shiftLead: "Sutrisno" },
      { heatNo: "FNM-HEAT-202505-005", product: "ING-BR", inputKg: 5200, outputKg: 4685, rejectKg: 60, slagKg: 375, returnsKg: 55, yieldPct: 90.1, date: "2025-05-07", status: "Selesai - Yield OK", operator: "Dedi S.", shiftLead: "Hendra" },
      { heatNo: "FNM-HEAT-202505-006", product: "ING-CU", inputKg: 5500, outputKg: 4840, rejectKg: 80, slagKg: 310, returnsKg: 60, yieldPct: 88.0, date: "2025-05-08", status: "Selesai - Yield Rendah", operator: "Bambang W.", shiftLead: "Sutrisno" },
      { heatNo: "FNM-HEAT-202505-007", product: "ING-CU", inputKg: 4900, outputKg: 4565, rejectKg: 35, slagKg: 245, returnsKg: 35, yieldPct: 93.2, date: "2025-05-10", status: "Selesai - Yield OK", operator: "Joko P.", shiftLead: "Hendra" },
      { heatNo: "FNM-HEAT-202505-008", product: "ING-BZ", inputKg: 4700, outputKg: 4305, rejectKg: 40, slagKg: 280, returnsKg: 45, yieldPct: 91.6, date: "2025-05-12", status: "Selesai - Yield OK", operator: "Dedi S.", shiftLead: "Sutrisno" },
      { heatNo: "FNM-HEAT-202505-009", product: "ING-BR", inputKg: 3900, outputKg: 3505, rejectKg: 55, slagKg: 285, returnsKg: 35, yieldPct: 89.9, date: "2025-05-15", status: "Selesai - Yield OK", operator: "Bambang W.", shiftLead: "Hendra" },
      { heatNo: "FNM-HEAT-202505-010", product: "ING-CU", inputKg: 5800, outputKg: 0, rejectKg: 0, slagKg: 0, returnsKg: 0, yieldPct: 0, date: "2025-05-19", status: "Dalam Proses", operator: "Joko P.", shiftLead: "Sutrisno" }
    ],
    exportList: [
      { doNo: "FNM-DO-202505-001", pebNo: "PEB-2025-00112", customer: "Taiwan Copper Industries Ltd.", product: "ING-CU", weightKg: 14500, dateShip: "2025-05-10", status: "Dikirim", containerNo: "TCLU-884201-7", sealNo: "FNM-887201" },
      { doNo: "FNM-DO-202505-002", pebNo: "PEB-2025-00118", customer: "Yung Chi Metal Co., Ltd.", product: "ING-BR", weightKg: 8200, dateShip: "2025-05-12", status: "Dikirim", containerNo: "TEMU-118453-2", sealNo: "FNM-887244" },
      { doNo: "FNM-DO-202505-003", pebNo: "PEB-2025-00127", customer: "Sumitomo Metal Industries", product: "ING-BZ", weightKg: 6200, dateShip: "2025-05-15", status: "Dikirim", containerNo: "OOLU-552341-9", sealNo: "FNM-887301" },
      { doNo: "FNM-DO-202505-004", pebNo: "PEB-2025-00133", customer: "Taiwan Copper Industries Ltd.", product: "ING-CU", weightKg: 9600, dateShip: "2025-05-17", status: "Dikirim", containerNo: "CAIU-442901-6", sealNo: "FNM-887360" },
      { doNo: "FNM-DO-202505-005", pebNo: "PEB-2025-00141", customer: "Yung Chi Metal Co., Ltd.", product: "ING-BR", weightKg: 4500, dateShip: "2025-05-19", status: "Siap Muat", containerNo: "TGHU-229450-1", sealNo: "FNM-887402" }
    ],
    discrepancyList: [
      { caseNo: "FNM-SEL-202505-001", type: "Yield Produksi", ref: "FNM-HEAT-202505-006", discKg: 220, discPct: 4.0, status: "Open", priority: "Eskalasi", date: "2025-05-08" },
      { caseNo: "FNM-SEL-202505-002", type: "Selisih Timbang", ref: "FNM-LOT-202505-005", discKg: 50, discPct: 0.54, status: "Dalam Investigasi", priority: "Normal", date: "2025-05-08" },
      { caseNo: "FNM-SEL-202505-003", type: "Selisih Pemilahan", ref: "FNM-LOT-202505-009", discKg: 28, discPct: 0.52, status: "Open", priority: "Normal", date: "2025-05-12" },
      { caseNo: "FNM-SEL-202505-004", type: "Selisih Timbang", ref: "FNM-LOT-202505-015", discKg: 75, discPct: 0.85, status: "Open", priority: "Normal", date: "2025-05-18" },
      { caseNo: "FNM-SEL-202505-005", type: "Stok Opname", ref: "WH-FG-202505-W3", discKg: 35, discPct: 0.18, status: "Closed", priority: "Normal", date: "2025-05-18" }
    ],
    openingBalance: {
      rawMaterialKg: 4200,
      finishedGoodsKg: 18500,
      slagKg: 1120
    },
    auditTrail: [
      { timestamp: "2025-05-02 08:32", category: "Penerimaan", activity: "Penerimaan dicatat", ref: "FNM-LOT-202505-001", user: "Admin Gudang", detail: "SC-CU 12.480 kg dari Sino Metal" },
      { timestamp: "2025-05-02 13:10", category: "Penerimaan", activity: "Pemilahan selesai", ref: "FNM-LOT-202505-001", user: "Operator Line 1", detail: "SC-CU 12.230 kg, kontaminan 160 kg" },
      { timestamp: "2025-05-03 09:00", category: "Produksi", activity: "Heat dimulai", ref: "FNM-HEAT-202505-001", user: "Operator Tungku", detail: "Input 5.200 kg ke ING-CU" },
      { timestamp: "2025-05-03 16:45", category: "Produksi", activity: "Heat selesai", ref: "FNM-HEAT-202505-001", user: "Kepala Shift", detail: "Output 4.810 kg, yield 92,5%" },
      { timestamp: "2025-05-10 14:10", category: "Ekspor", activity: "DO ekspor dibuat", ref: "FNM-DO-202505-001", user: "Admin Ekspor", detail: "ING-CU 14.500 kg ke Taiwan Copper" },
      { timestamp: "2025-05-18 17:00", category: "Rekonsiliasi", activity: "Selisih dibuat", ref: "FNM-SEL-202505-004", user: "Admin Gudang", detail: "Selisih timbang lot FNM-LOT-202505-015" }
    ]
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatKg(value) {
    return `${Number(value || 0).toLocaleString("id-ID")} kg`;
  }

  function formatTon(value) {
    return `${(Number(value || 0) / 1000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} ton`;
  }

  function formatPct(value) {
    return `${Number(value || 0).toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
  }

  function getDateLabel(value) {
    if (!value) return "-";
    const normalized = String(value).replace(" ", "T");
    const date = new Date(normalized);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  }

  function calculateDiffPct(reference, actual) {
    if (!reference) return 0;
    return ((Number(actual) - Number(reference)) / Number(reference)) * 100;
  }

  function calculateYield(outputKg, inputKg) {
    if (!inputKg) return 0;
    return (Number(outputKg || 0) / Number(inputKg)) * 100;
  }

  function isYieldWithinStandard(product, yieldPct) {
    const standard = yieldStandard[product];
    if (!standard) return false;
    return yieldPct >= standard.min && yieldPct <= standard.max;
  }

  function renderStatusBadge(status) {
    const map = {
      "Menunggu Pemilahan": { bg: "#FFF3E0", color: "#E07B39" },
      "Sudah Dipilah": { bg: "#E3F2FD", color: "#1565C0" },
      "Selisih Terdeteksi": { bg: "#FFEBEE", color: "#C0392B" },
      "Dalam Proses": { bg: "#E3F2FD", color: "#1565C0" },
      "Selesai - Yield OK": { bg: "#E8F5E9", color: "#2D8A4E" },
      "Selesai - Yield Rendah": { bg: "#FFEBEE", color: "#C0392B" },
      "Open": { bg: "#FFEBEE", color: "#C0392B" },
      "Dalam Investigasi": { bg: "#FFF3E0", color: "#E07B39" },
      "Closed": { bg: "#E8F5E9", color: "#2D8A4E" },
      "Dikirim": { bg: "#E8F5E9", color: "#2D8A4E" },
      "Siap Muat": { bg: "#E3F2FD", color: "#1565C0" }
    };
    const style = map[status] || { bg: "#F3F4F6", color: "#6B7280" };
    return `<span class="status-badge" style="background:${style.bg};color:${style.color}">${escapeHtml(status)}</span>`;
  }

  function renderMaterialBadge(code) {
    const material = materialCatalog[code] || { name: code, color: "#707783" };
    return `<span class="material-badge" style="background:${material.color}">${escapeHtml(code)} - ${escapeHtml(material.name)}</span>`;
  }

  function showToast(message, type = "success") {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    window.setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(6px)";
    }, 2600);

    window.setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  function showConfirm(message, onConfirm) {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop open";
    backdrop.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h2 class="modal-title">Konfirmasi</h2>
        </div>
        <div class="modal-body">
          <p>${escapeHtml(message)}</p>
        </div>
        <div class="modal-footer">
          <button class="button button-secondary" type="button" data-confirm-cancel>Batal</button>
          <button class="button button-primary" type="button" data-confirm-ok>Ya, lanjutkan</button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
    backdrop.querySelector("[data-confirm-cancel]").addEventListener("click", () => backdrop.remove());
    backdrop.querySelector("[data-confirm-ok]").addEventListener("click", () => {
      backdrop.remove();
      if (typeof onConfirm === "function") onConfirm();
    });
  }

  function openModal(selector) {
    const modal = document.querySelector(selector);
    if (modal) modal.classList.add("open");
  }

  function closeModal(selector) {
    const modal = document.querySelector(selector);
    if (modal) modal.classList.remove("open");
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function generateDocumentNo(prefix, collection, key) {
    const now = new Date();
    const yyyymm = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
    const count = collection.filter((item) => String(item[key] || "").includes(yyyymm)).length + 1;
    return `${prefix}-${yyyymm}-${String(count).padStart(3, "0")}`;
  }

  function getDashboardSummary() {
    const { receivingList, heatLogList, exportList, discrepancyList, openingBalance } = seedData;
    const completedHeats = heatLogList.filter((heat) => heat.status !== "Dalam Proses");
    const rawMaterialIn = receivingList.reduce((sum, item) => sum + item.weightActual, 0);
    const rawMaterialProcessed = heatLogList.reduce((sum, item) => sum + item.inputKg, 0);
    const ingotProduced = completedHeats.reduce((sum, item) => sum + item.outputKg, 0);
    const exported = exportList.reduce((sum, item) => sum + item.weightKg, 0);
    const fgReady = Math.max(0, openingBalance.finishedGoodsKg + ingotProduced - exported);
    const rawBalance = Math.max(0, openingBalance.rawMaterialKg + rawMaterialIn - rawMaterialProcessed);
    const unexplainedDiff = rawMaterialIn + openingBalance.rawMaterialKg - rawMaterialProcessed - rawBalance;

    return {
      receivingToday: receivingList.filter((item) => item.dateIn.startsWith("2025-05-19")).length,
      pendingSorting: receivingList.filter((item) => item.status === "Menunggu Pemilahan").length,
      activeHeats: heatLogList.filter((item) => item.status === "Dalam Proses").length,
      openDiscrepancies: discrepancyList.filter((item) => item.status !== "Closed").length,
      fgReady,
      rawMaterialIn,
      rawMaterialProcessed,
      ingotProduced,
      exported,
      rawBalance,
      unexplainedDiff
    };
  }

  function groupWeightByDate(items, dateKey, weightKey, days) {
    return days.map((day) => {
      return items
        .filter((item) => String(item[dateKey]).startsWith(day))
        .reduce((sum, item) => sum + Number(item[weightKey] || 0), 0) / 1000;
    });
  }

  function renderDashboardMetrics(summary) {
    const target = document.querySelector("[data-dashboard-metrics]");
    if (!target) return;

    const cards = [
      { label: "Penerimaan Hari Ini", value: summary.receivingToday, note: "Lot masuk 19 Mei 2025", href: "receiving.html" },
      { label: "Pending Pemilahan", value: summary.pendingSorting, note: "Lot masih di karantina", href: "sorting.html" },
      { label: "Heat Aktif", value: summary.activeHeats, note: "Siklus dalam proses", href: "heat-log.html" },
      { label: "Selisih Terdeteksi", value: summary.openDiscrepancies, note: "Kasus belum closed", href: "discrepancy.html" },
      { label: "Stok Siap Ekspor", value: formatTon(summary.fgReady), note: "Saldo FG siap alokasi", href: "warehouse.html" }
    ];

    target.innerHTML = cards.map((card) => `
      <a class="metric-card" href="${card.href}">
        <span class="metric-label">${escapeHtml(card.label)}</span>
        <strong class="metric-value">${escapeHtml(card.value)}</strong>
        <span class="metric-note">${escapeHtml(card.note)}</span>
      </a>
    `).join("");
  }

  function renderRecentReceivingTable() {
    const target = document.querySelector("[data-recent-receiving]");
    if (!target) return;

    const rows = seedData.receivingList.slice(-7).reverse().map((item) => `
      <tr>
        <td><strong>${escapeHtml(item.lotNo)}</strong></td>
        <td>${renderMaterialBadge(item.material)}</td>
        <td>${escapeHtml(item.supplier)}</td>
        <td>${escapeHtml(getDateLabel(item.dateIn))}</td>
        <td class="text-right">${escapeHtml(formatKg(item.weightActual))}</td>
        <td>${renderStatusBadge(item.status)}</td>
        <td><a class="button button-secondary button-sm" href="receiving-detail.html?lot=${encodeURIComponent(item.lotNo)}">Lihat Detail</a></td>
      </tr>
    `).join("");

    target.innerHTML = rows;
  }

  function renderRecentHeatTable() {
    const target = document.querySelector("[data-recent-heats]");
    if (!target) return;

    const rows = seedData.heatLogList.slice(-7).reverse().map((item) => {
      const yieldClass = item.status === "Dalam Proses" ? "text-muted" : (isYieldWithinStandard(item.product, item.yieldPct) ? "text-success" : "text-danger");
      const standard = yieldStandard[item.product];
      const yieldText = item.status === "Dalam Proses" ? "-" : formatPct(item.yieldPct);

      return `
        <tr>
          <td><strong>${escapeHtml(item.heatNo)}</strong></td>
          <td>${escapeHtml(item.product)}<br><span class="text-muted">${escapeHtml(productCatalog[item.product].name)}</span></td>
          <td class="text-right">${escapeHtml(formatKg(item.inputKg))}</td>
          <td class="text-right">${escapeHtml(formatKg(item.outputKg))}</td>
          <td class="text-right ${yieldClass}" title="Standar: ${standard.min}%-${standard.max}%"><strong>${escapeHtml(yieldText)}</strong></td>
          <td>${renderStatusBadge(item.status)}</td>
          <td><a class="button button-secondary button-sm" href="heat-log-detail.html?heat=${encodeURIComponent(item.heatNo)}">Lihat Detail</a></td>
        </tr>
      `;
    }).join("");

    target.innerHTML = rows;
  }

  function renderReconciliationWidget(summary) {
    const target = document.querySelector("[data-reconciliation-widget]");
    if (!target) return;

    const conversionYield = calculateYield(summary.ingotProduced, summary.rawMaterialProcessed);
    target.innerHTML = `
      <div class="recon-grid">
        <div class="recon-item"><span>Total BB Masuk</span><strong>${escapeHtml(formatTon(summary.rawMaterialIn))}</strong></div>
        <div class="recon-item"><span>Total BB Diproses</span><strong>${escapeHtml(formatTon(summary.rawMaterialProcessed))}</strong></div>
        <div class="recon-item"><span>Ingot Diproduksi</span><strong>${escapeHtml(formatTon(summary.ingotProduced))}</strong></div>
        <div class="recon-item"><span>Total Ekspor</span><strong>${escapeHtml(formatTon(summary.exported))}</strong></div>
        <div class="recon-item"><span>Yield Aktual</span><strong>${escapeHtml(formatPct(conversionYield))}</strong></div>
      </div>
      <div class="dashboard-alert" style="margin-top: 14px;">
        <span>Saldo awal FG ${escapeHtml(formatTon(seedData.openingBalance.finishedGoodsKg))} digunakan untuk menjaga rekonsiliasi bulan berjalan tetap realistis.</span>
        <a class="button button-primary button-sm" href="reconciliation.html">Lihat LMB Lengkap</a>
      </div>
    `;
  }

  function renderDashboardCharts() {
    if (typeof Chart === "undefined") return;

    const barCanvas = document.querySelector("#chart-material-flow");
    const doughnutCanvas = document.querySelector("#chart-production-mix");
    if (!barCanvas || !doughnutCanvas) return;

    const days = ["2025-05-13", "2025-05-14", "2025-05-15", "2025-05-16", "2025-05-17", "2025-05-18", "2025-05-19"];
    const labels = days.map((day) => {
      const date = new Date(`${day}T00:00:00`);
      return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
    });

    const inputSeries = groupWeightByDate(seedData.receivingList, "dateIn", "weightActual", days);
    const outputSeries = groupWeightByDate(seedData.heatLogList.filter((item) => item.status !== "Dalam Proses"), "date", "outputKg", days);

    new Chart(barCanvas, {
      type: "bar",
      data: {
        labels,
        datasets: [
          { label: "Input BB (ton)", data: inputSeries, backgroundColor: "#2E4A7A", borderRadius: 4 },
          { label: "Output Ingot (ton)", data: outputSeries, backgroundColor: "#E07B39", borderRadius: 4 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
        scales: { y: { beginAtZero: true, ticks: { callback: (value) => `${value} t` } } }
      }
    });

    const productionByProduct = seedData.heatLogList
      .filter((item) => item.status !== "Dalam Proses")
      .reduce((acc, item) => {
        acc[item.product] = (acc[item.product] || 0) + item.outputKg;
        return acc;
      }, {});

    new Chart(doughnutCanvas, {
      type: "doughnut",
      data: {
        labels: ["Cu", "Brass", "Bronze"],
        datasets: [{
          data: [productionByProduct["ING-CU"] || 0, productionByProduct["ING-BR"] || 0, productionByProduct["ING-BZ"] || 0],
          backgroundColor: ["#B87333", "#CFB53B", "#CD7F32"],
          borderColor: "#FFFFFF",
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
        cutout: "62%"
      }
    });
  }

  function initDashboard() {
    if (!document.querySelector("[data-dashboard-page]")) return;
    const summary = getDashboardSummary();
    renderDashboardMetrics(summary);
    renderRecentReceivingTable();
    renderRecentHeatTable();
    renderReconciliationWidget(summary);
    renderDashboardCharts();
  }

  function getReceivingFilters() {
    return {
      material: document.querySelector("[data-filter-material]")?.value || "",
      supplier: document.querySelector("[data-filter-supplier]")?.value || "",
      status: document.querySelector("[data-filter-status]")?.value || "",
      date: document.querySelector("[data-filter-date]")?.value || "",
      search: (document.querySelector("[data-filter-search]")?.value || "").trim().toLowerCase()
    };
  }

  function getFilteredReceivingList() {
    const filters = getReceivingFilters();
    return seedData.receivingList.filter((item) => {
      const matchesMaterial = !filters.material || item.material === filters.material;
      const matchesSupplier = !filters.supplier || item.supplier === filters.supplier;
      const matchesStatus = !filters.status || item.status === filters.status;
      const matchesDate = !filters.date || item.dateIn.startsWith(filters.date);
      const haystack = `${item.lotNo} ${item.pibNo} ${item.supplier} ${item.material} ${item.status}`.toLowerCase();
      const matchesSearch = !filters.search || haystack.includes(filters.search);
      return matchesMaterial && matchesSupplier && matchesStatus && matchesDate && matchesSearch;
    });
  }

  function renderReceivingFilters() {
    const supplierSelect = document.querySelector("[data-filter-supplier]");
    const materialSelect = document.querySelector("[data-filter-material]");
    const modalSupplier = document.querySelector("[data-new-supplier]");
    const modalMaterial = document.querySelector("[data-new-material]");

    if (supplierSelect) {
      supplierSelect.innerHTML = `<option value="">Semua Supplier</option>${suppliers.map((supplier) => `<option value="${escapeHtml(supplier.name)}">${escapeHtml(supplier.name)}</option>`).join("")}`;
    }

    if (materialSelect) {
      materialSelect.innerHTML = `<option value="">Semua Material</option>${Object.entries(materialCatalog).map(([code, item]) => `<option value="${escapeHtml(code)}">${escapeHtml(code)} - ${escapeHtml(item.name)}</option>`).join("")}`;
    }

    if (modalSupplier) {
      modalSupplier.innerHTML = suppliers.map((supplier) => `<option value="${escapeHtml(supplier.name)}">${escapeHtml(supplier.name)}</option>`).join("");
    }

    if (modalMaterial) {
      modalMaterial.innerHTML = Object.entries(materialCatalog).map(([code, item]) => `<option value="${escapeHtml(code)}">${escapeHtml(code)} - ${escapeHtml(item.name)}</option>`).join("");
    }
  }

  function renderReceivingTable() {
    const target = document.querySelector("[data-receiving-table]");
    const countTarget = document.querySelector("[data-receiving-count]");
    if (!target) return;

    const rows = getFilteredReceivingList().slice().reverse();
    if (countTarget) countTarget.textContent = `${rows.length} lot`;

    if (!rows.length) {
      target.innerHTML = `<tr><td colspan="10"><div class="empty-state">Tidak ada penerimaan yang cocok dengan filter.</div></td></tr>`;
      return;
    }

    target.innerHTML = rows.map((item) => {
      const diffKg = item.weightActual - item.weightPIB;
      const diffPct = calculateDiffPct(item.weightPIB, item.weightActual);
      const diffClass = Math.abs(diffPct) > discrepancyThreshold.timbang ? "text-danger" : "text-muted";
      return `
        <tr>
          <td><strong>${escapeHtml(item.lotNo)}</strong></td>
          <td>${escapeHtml(item.pibNo)}</td>
          <td>${renderMaterialBadge(item.material)}</td>
          <td>${escapeHtml(item.supplier)}</td>
          <td>${escapeHtml(getDateLabel(item.dateIn))}</td>
          <td class="text-right">${escapeHtml(formatKg(item.weightPIB))}</td>
          <td class="text-right">${escapeHtml(formatKg(item.weightActual))}</td>
          <td class="text-right ${diffClass}"><strong>${escapeHtml(formatKg(diffKg))}</strong><br><span>${escapeHtml(formatPct(diffPct))}</span></td>
          <td>${renderStatusBadge(item.status)}</td>
          <td><a class="button button-secondary button-sm" href="receiving-detail.html?lot=${encodeURIComponent(item.lotNo)}">Lihat Detail</a></td>
        </tr>
      `;
    }).join("");
  }

  function updateReceivingDiffPreview() {
    const pibInput = document.querySelector("[data-new-weight-pib]");
    const actualInput = document.querySelector("[data-new-weight-actual]");
    const target = document.querySelector("[data-new-diff-preview]");
    if (!pibInput || !actualInput || !target) return;

    const pib = Number(pibInput.value || 0);
    const actual = Number(actualInput.value || 0);
    const diffKg = actual - pib;
    const diffPct = calculateDiffPct(pib, actual);
    const type = Math.abs(diffPct) > discrepancyThreshold.timbang ? "text-danger" : "text-success";
    target.innerHTML = `<span class="${type}"><strong>${escapeHtml(formatKg(diffKg))}</strong> (${escapeHtml(formatPct(diffPct))})</span>`;
  }

  function handleReceivingSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const weightPIB = Number(formData.get("weightPIB") || 0);
    const weightActual = Number(formData.get("weightActual") || 0);
    const diffPct = Math.abs(calculateDiffPct(weightPIB, weightActual));
    const lotNo = generateDocumentNo("FNM-LOT", seedData.receivingList, "lotNo");
    const dateRaw = formData.get("dateIn") || "2025-05-19T08:00";
    const status = diffPct > discrepancyThreshold.timbang ? "Selisih Terdeteksi" : "Menunggu Pemilahan";

    seedData.receivingList.push({
      lotNo,
      pibNo: formData.get("pibNo") || `PIB-2025-${String(seedData.receivingList.length + 105).padStart(5, "0")}`,
      supplier: formData.get("supplier"),
      material: formData.get("material"),
      dateIn: String(dateRaw).replace("T", " "),
      weightPIB,
      weightActual,
      status,
      suratJalan: formData.get("suratJalan") || "-"
    });

    seedData.auditTrail.push({
      timestamp: String(dateRaw).replace("T", " "),
      category: "Penerimaan",
      activity: "Penerimaan dicatat",
      ref: lotNo,
      user: "Admin Gudang",
      detail: `${formData.get("material")} ${formatKg(weightActual)} dari ${formData.get("supplier")}`
    });

    closeModal("#modal-new-receiving");
    form.reset();
    updateReceivingDiffPreview();
    renderReceivingTable();
    showToast(`Penerimaan ${lotNo} berhasil dicatat.`);
  }

  function initReceivingPage() {
    if (!document.querySelector("[data-receiving-page]")) return;
    renderReceivingFilters();
    renderReceivingTable();
    updateReceivingDiffPreview();

    document.querySelectorAll("[data-receiving-filter]").forEach((field) => {
      field.addEventListener("input", renderReceivingTable);
      field.addEventListener("change", renderReceivingTable);
    });

    const resetButton = document.querySelector("[data-reset-receiving-filters]");
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        document.querySelectorAll("[data-receiving-filter]").forEach((field) => {
          field.value = "";
        });
        renderReceivingTable();
      });
    }

    document.querySelectorAll("[data-new-weight-pib], [data-new-weight-actual]").forEach((field) => {
      field.addEventListener("input", updateReceivingDiffPreview);
    });

    const form = document.querySelector("[data-new-receiving-form]");
    if (form) form.addEventListener("submit", handleReceivingSubmit);
  }

  function findReceivingLot() {
    const lotNo = getQueryParam("lot") || seedData.receivingList[0]?.lotNo;
    return seedData.receivingList.find((item) => item.lotNo === lotNo) || null;
  }

  function getReceivingTimelineSteps(lot) {
    const sorted = lot.status === "Sudah Dipilah" || lot.status === "Selisih Terdeteksi";
    return [
      { label: "Received", complete: true },
      { label: "Pemilahan", complete: sorted },
      { label: "Masuk Gudang BB", complete: lot.status === "Sudah Dipilah" }
    ];
  }

  function renderReceivingDetail() {
    if (!document.querySelector("[data-receiving-detail-page]")) return;

    const lot = findReceivingLot();
    const root = document.querySelector("[data-receiving-detail]");
    if (!root) return;

    if (!lot) {
      root.innerHTML = `<div class="empty-state">Lot tidak ditemukan. Buka kembali dari daftar penerimaan.</div>`;
      return;
    }

    const diffKg = lot.weightActual - lot.weightPIB;
    const diffPct = calculateDiffPct(lot.weightPIB, lot.weightActual);
    const qrPayload = {
      lot: lot.lotNo,
      material: lot.material,
      weight: lot.weightActual,
      supplier: lot.supplier,
      date: lot.dateIn.slice(0, 10)
    };

    root.innerHTML = `
      <section class="panel">
        <div class="detail-header">
          <div>
            <h2 class="detail-title">${escapeHtml(lot.lotNo)}</h2>
            <p class="panel-caption">Dokumen LPB dan status penerimaan bahan baku impor</p>
          </div>
          <div class="detail-actions">
            ${renderStatusBadge(lot.status)}
            <button class="button button-primary" type="button" data-open-modal="#modal-qr-label">Cetak Label QR</button>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Informasi Umum</h2>
            <p class="panel-caption">Referensi dokumen, supplier, material, dan hasil timbang aktual</p>
          </div>
        </div>
        <div class="info-grid">
          <div class="info-item"><span>No. PIB</span><strong>${escapeHtml(lot.pibNo)}</strong></div>
          <div class="info-item"><span>Supplier</span><strong>${escapeHtml(lot.supplier)}</strong></div>
          <div class="info-item"><span>Jenis Material</span><strong>${renderMaterialBadge(lot.material)}</strong></div>
          <div class="info-item"><span>Tgl Masuk</span><strong>${escapeHtml(getDateLabel(lot.dateIn))}</strong></div>
          <div class="info-item"><span>Berat PIB</span><strong>${escapeHtml(formatKg(lot.weightPIB))}</strong></div>
          <div class="info-item"><span>Berat Aktual</span><strong>${escapeHtml(formatKg(lot.weightActual))}</strong></div>
          <div class="info-item"><span>Selisih</span><strong class="${Math.abs(diffPct) > discrepancyThreshold.timbang ? "text-danger" : "text-success"}">${escapeHtml(formatKg(diffKg))} (${escapeHtml(formatPct(diffPct))})</strong></div>
          <div class="info-item"><span>Surat Jalan</span><strong>${escapeHtml(lot.suratJalan)}</strong></div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Timeline Status</h2>
            <p class="panel-caption">Alur penerimaan sampai siap masuk gudang bahan baku</p>
          </div>
        </div>
        <div class="timeline">
          ${getReceivingTimelineSteps(lot).map((step) => `<div class="timeline-step ${step.complete ? "complete" : ""}">${escapeHtml(step.label)}</div>`).join("")}
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Dokumen Terlampir</h2>
            <p class="panel-caption">Simulasi arsip dokumen kepabeanan dan penerimaan</p>
          </div>
        </div>
        <div class="table-wrap">
          <table class="table-data">
            <thead>
              <tr>
                <th>Dokumen</th>
                <th>Nomor Referensi</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>PIB.pdf</td><td>${escapeHtml(lot.pibNo)}</td><td>${renderStatusBadge("Closed")}</td><td><button class="button button-secondary button-sm" type="button">Preview</button></td></tr>
              <tr><td>Surat Jalan Supplier.pdf</td><td>${escapeHtml(lot.suratJalan)}</td><td>${renderStatusBadge("Closed")}</td><td><button class="button button-secondary button-sm" type="button">Preview</button></td></tr>
              <tr><td>Packing List.pdf</td><td>PL-${escapeHtml(lot.lotNo.slice(-3))}</td><td>${renderStatusBadge("Closed")}</td><td><button class="button button-secondary button-sm" type="button">Preview</button></td></tr>
              <tr><td>COA.pdf</td><td>COA-${escapeHtml(lot.material)}-${escapeHtml(lot.lotNo.slice(-3))}</td><td>${renderStatusBadge(lot.material === "SC-MX" ? "Dalam Investigasi" : "Closed")}</td><td><button class="button button-secondary button-sm" type="button">Preview</button></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <div class="modal-backdrop" id="modal-qr-label">
        <div class="modal" role="dialog" aria-modal="true">
          <div class="modal-header">
            <h2 class="modal-title">Label QR Lot</h2>
            <button class="button button-secondary button-sm" type="button" data-close-modal="#modal-qr-label">Tutup</button>
          </div>
          <div class="modal-body">
            <div class="qr-label" id="print-qr-label">
              <h3>Freemont MetalTrack</h3>
              <p>${escapeHtml(lot.lotNo)}</p>
              <div class="qr-canvas-wrap">
                <div id="qr-container"></div>
              </div>
              <p><strong>${escapeHtml(lot.material)}</strong> - ${escapeHtml(formatKg(lot.weightActual))}</p>
              <p>${escapeHtml(lot.supplier)}</p>
              <p>${escapeHtml(lot.dateIn.slice(0, 10))}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button class="button button-secondary" type="button" data-close-modal="#modal-qr-label">Batal</button>
            <button class="button button-primary" type="button" data-print-page>Print</button>
          </div>
        </div>
      </div>
    `;

    window.setTimeout(() => {
      const container = document.getElementById("qr-container");
      if (container && typeof QRCode !== "undefined") {
        container.innerHTML = "";
        new QRCode(container, {
          text: JSON.stringify(qrPayload),
          width: 196,
          height: 196,
          colorDark: "#1B2A4A",
          colorLight: "#FFFFFF",
          correctLevel: QRCode.CorrectLevel.M
        });
      } else if (container) {
        container.textContent = "QR library tidak tersedia.";
        showToast("QR label gagal dibuat.", "error");
      }
    }, 0);
  }

  function getHeatFilters() {
    return {
      product: document.querySelector("[data-filter-product]")?.value || "",
      status: document.querySelector("[data-filter-heat-status]")?.value || "",
      date: document.querySelector("[data-filter-heat-date]")?.value || "",
      search: (document.querySelector("[data-filter-heat-search]")?.value || "").trim().toLowerCase()
    };
  }

  function getFilteredHeatList() {
    const filters = getHeatFilters();
    return seedData.heatLogList.filter((heat) => {
      const matchesProduct = !filters.product || heat.product === filters.product;
      const matchesStatus = !filters.status || heat.status === filters.status;
      const matchesDate = !filters.date || heat.date === filters.date;
      const haystack = `${heat.heatNo} ${heat.product} ${heat.status} ${heat.operator} ${heat.shiftLead}`.toLowerCase();
      const matchesSearch = !filters.search || haystack.includes(filters.search);
      return matchesProduct && matchesStatus && matchesDate && matchesSearch;
    });
  }

  function getAvailableLotsForHeat(product) {
    const targetMaterial = productCatalog[product]?.material;
    return seedData.receivingList.filter((lot) => {
      return lot.status === "Sudah Dipilah" && (!targetMaterial || lot.material === targetMaterial);
    });
  }

  function getHeatInputLots(heat) {
    if (Array.isArray(heat.lots) && heat.lots.length) {
      return heat.lots.map((lotNo) => seedData.receivingList.find((lot) => lot.lotNo === lotNo)).filter(Boolean);
    }

    const available = getAvailableLotsForHeat(heat.product);
    if (!available.length) return [];
    let remaining = heat.inputKg;
    const selected = [];
    available.forEach((lot) => {
      if (remaining <= 0) return;
      const usedKg = Math.min(lot.weightActual, remaining);
      selected.push({ ...lot, usedKg });
      remaining -= usedKg;
    });
    return selected;
  }

  function getHeatMassValues(heat) {
    const outputKg = Number(heat.outputKg || 0);
    const rejectKg = Number(heat.rejectKg || 0);
    const slagKg = Number(heat.slagKg || 0);
    const returnsKg = Number(heat.returnsKg || 0);
    const evaporationKg = Math.max(0, Number(heat.inputKg || 0) - outputKg - rejectKg - slagKg - returnsKg);
    const yieldPct = calculateYield(outputKg, heat.inputKg);
    return { outputKg, rejectKg, slagKg, returnsKg, evaporationKg, yieldPct };
  }

  function renderHeatFilters() {
    const productSelects = document.querySelectorAll("[data-filter-product], [data-new-heat-product]");
    productSelects.forEach((select) => {
      const first = select.hasAttribute("data-filter-product") ? `<option value="">Semua Produk</option>` : "";
      select.innerHTML = `${first}${Object.entries(productCatalog).map(([code, item]) => `<option value="${escapeHtml(code)}">${escapeHtml(code)} - ${escapeHtml(item.name)}</option>`).join("")}`;
    });
    renderNewHeatLotOptions();
  }

  function renderNewHeatLotOptions() {
    const select = document.querySelector("[data-new-heat-lots]");
    const product = document.querySelector("[data-new-heat-product]")?.value || "ING-CU";
    if (!select) return;
    const lots = getAvailableLotsForHeat(product);
    select.innerHTML = lots.map((lot) => `<option value="${escapeHtml(lot.lotNo)}">${escapeHtml(lot.lotNo)} - ${escapeHtml(lot.material)} - ${escapeHtml(formatKg(lot.weightActual))}</option>`).join("");
    updateNewHeatInputPreview();
  }

  function updateNewHeatInputPreview() {
    const select = document.querySelector("[data-new-heat-lots]");
    const input = document.querySelector("[data-new-heat-input]");
    const preview = document.querySelector("[data-new-heat-preview]");
    if (!select || !input || !preview) return;
    const selectedLots = Array.from(select.selectedOptions).map((option) => option.value);
    const total = selectedLots
      .map((lotNo) => seedData.receivingList.find((lot) => lot.lotNo === lotNo))
      .filter(Boolean)
      .reduce((sum, lot) => sum + lot.weightActual, 0);
    if (total > 0) input.value = String(total);
    preview.textContent = selectedLots.length ? `${selectedLots.length} lot dipilih - ${formatKg(total)}` : "Pilih satu atau beberapa lot BB";
  }

  function renderHeatTable() {
    const target = document.querySelector("[data-heat-table]");
    const countTarget = document.querySelector("[data-heat-count]");
    if (!target) return;
    const rows = getFilteredHeatList().slice().reverse();
    if (countTarget) countTarget.textContent = `${rows.length} heat`;

    if (!rows.length) {
      target.innerHTML = `<tr><td colspan="9"><div class="empty-state">Tidak ada heat yang cocok dengan filter.</div></td></tr>`;
      return;
    }

    target.innerHTML = rows.map((heat) => {
      const standard = yieldStandard[heat.product];
      const yieldClass = heat.status === "Dalam Proses" ? "text-muted" : (isYieldWithinStandard(heat.product, heat.yieldPct) ? "text-success" : "text-danger");
      const yieldText = heat.status === "Dalam Proses" ? "-" : formatPct(heat.yieldPct);
      return `
        <tr>
          <td><strong>${escapeHtml(heat.heatNo)}</strong></td>
          <td>${escapeHtml(getDateLabel(heat.date))}</td>
          <td>${escapeHtml(heat.product)}<br><span class="text-muted">${escapeHtml(productCatalog[heat.product].name)}</span></td>
          <td class="text-right">${escapeHtml(formatKg(heat.inputKg))}</td>
          <td class="text-right">${escapeHtml(formatKg(heat.outputKg))}</td>
          <td class="text-right">${escapeHtml(formatKg(heat.slagKg))}</td>
          <td class="text-right ${yieldClass}" title="Standar: ${standard.min}%-${standard.max}%"><strong>${escapeHtml(yieldText)}</strong></td>
          <td>${renderStatusBadge(heat.status)}</td>
          <td><a class="button button-secondary button-sm" href="heat-log-detail.html?heat=${encodeURIComponent(heat.heatNo)}">Lihat Detail</a></td>
        </tr>
      `;
    }).join("");
  }

  function handleNewHeatSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const product = formData.get("product");
    const selectedLots = Array.from(document.querySelector("[data-new-heat-lots]")?.selectedOptions || []).map((option) => option.value);
    const inputKg = Number(formData.get("inputKg") || 0);
    const dateRaw = formData.get("dateStart") || "2025-05-19T10:00";
    const heatNo = generateDocumentNo("FNM-HEAT", seedData.heatLogList, "heatNo");

    seedData.heatLogList.push({
      heatNo,
      product,
      inputKg,
      outputKg: 0,
      rejectKg: 0,
      slagKg: 0,
      returnsKg: 0,
      yieldPct: 0,
      date: String(dateRaw).slice(0, 10),
      status: "Dalam Proses",
      operator: formData.get("operator") || "-",
      shiftLead: formData.get("shiftLead") || "-",
      lots: selectedLots
    });

    seedData.auditTrail.push({
      timestamp: String(dateRaw).replace("T", " "),
      category: "Produksi",
      activity: "Heat dimulai",
      ref: heatNo,
      user: formData.get("operator") || "Operator Tungku",
      detail: `Input ${formatKg(inputKg)} ke ${product}`
    });

    closeModal("#modal-new-heat");
    form.reset();
    renderHeatFilters();
    renderHeatTable();
    showToast(`Heat ${heatNo} berhasil dibuat.`);
  }

  function initHeatLogPage() {
    if (!document.querySelector("[data-heat-log-page]")) return;
    renderHeatFilters();
    renderHeatTable();

    document.querySelectorAll("[data-heat-filter]").forEach((field) => {
      field.addEventListener("input", renderHeatTable);
      field.addEventListener("change", renderHeatTable);
    });

    const resetButton = document.querySelector("[data-reset-heat-filters]");
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        document.querySelectorAll("[data-heat-filter]").forEach((field) => {
          field.value = "";
        });
        renderHeatTable();
      });
    }

    const productSelect = document.querySelector("[data-new-heat-product]");
    if (productSelect) productSelect.addEventListener("change", renderNewHeatLotOptions);

    const lotsSelect = document.querySelector("[data-new-heat-lots]");
    if (lotsSelect) lotsSelect.addEventListener("change", updateNewHeatInputPreview);

    const form = document.querySelector("[data-new-heat-form]");
    if (form) form.addEventListener("submit", handleNewHeatSubmit);
  }

  function findHeat() {
    const heatNo = getQueryParam("heat") || seedData.heatLogList[0]?.heatNo;
    return seedData.heatLogList.find((heat) => heat.heatNo === heatNo) || null;
  }

  function renderHeatMassBalance(heat) {
    const target = document.querySelector("[data-heat-mass-balance]");
    if (!target) return;
    const values = getHeatMassValues(heat);
    const standard = yieldStandard[heat.product];
    const yieldOk = isYieldWithinStandard(heat.product, values.yieldPct);
    const statusLabel = heat.status === "Dalam Proses" ? "Dalam Proses" : (yieldOk ? "Selesai - Yield OK" : "Selesai - Yield Rendah");
    const pct = (value) => heat.inputKg ? (Number(value || 0) / heat.inputKg) * 100 : 0;
    const meterWidth = Math.max(0, Math.min(100, values.yieldPct));

    target.innerHTML = `
      <div class="mass-balance">
        <div class="mass-balance-header">
          <div>
            <span class="text-muted">YIELD FINAL</span><br>
            <strong class="${yieldOk ? "text-success" : "text-danger"}">${escapeHtml(formatPct(values.yieldPct))}</strong>
          </div>
          <div>${renderStatusBadge(statusLabel)}</div>
        </div>
        <div class="mass-row"><strong>INPUT - Total BB Masuk Tungku</strong><span class="text-right">${escapeHtml(formatKg(heat.inputKg))}</span><span class="text-right">100,0%</span></div>
        <div class="mass-row"><span>Ingot OK</span><span class="text-right">${escapeHtml(formatKg(values.outputKg))}</span><span class="text-right">${escapeHtml(formatPct(pct(values.outputKg)))}</span></div>
        <div class="mass-row"><span>Ingot Reject</span><span class="text-right">${escapeHtml(formatKg(values.rejectKg))}</span><span class="text-right">${escapeHtml(formatPct(pct(values.rejectKg)))}</span></div>
        <div class="mass-row"><span>Slag</span><span class="text-right">${escapeHtml(formatKg(values.slagKg))}</span><span class="text-right">${escapeHtml(formatPct(pct(values.slagKg)))}</span></div>
        <div class="mass-row"><span>Returns/Sisa</span><span class="text-right">${escapeHtml(formatKg(values.returnsKg))}</span><span class="text-right">${escapeHtml(formatPct(pct(values.returnsKg)))}</span></div>
        <div class="mass-row"><span>Penguapan/Susut</span><span class="text-right">${escapeHtml(formatKg(values.evaporationKg))}</span><span class="text-right">${escapeHtml(formatPct(pct(values.evaporationKg)))}</span></div>
        <div class="yield-summary">
          <div>
            <div class="yield-meter"><div class="yield-meter-fill" style="width:${meterWidth}%;background:${yieldOk ? "#2D8A4E" : "#C0392B"}"></div></div>
            <p class="panel-caption">Standar ${escapeHtml(heat.product)}: ${standard.min}%-${standard.max}% | Slag tipikal ${standard.slagTypical}%</p>
          </div>
          <strong class="${yieldOk ? "text-success" : "text-danger"}">${yieldOk ? "OK" : "Di luar standar"}</strong>
        </div>
      </div>
    `;
  }

  function updateHeatOutputPreview() {
    const heat = findHeat();
    if (!heat) return;
    const outputKg = Number(document.querySelector("[data-output-ok]")?.value || 0);
    const rejectKg = Number(document.querySelector("[data-output-reject]")?.value || 0);
    const slagKg = Number(document.querySelector("[data-output-slag]")?.value || 0);
    const returnsKg = Number(document.querySelector("[data-output-returns]")?.value || 0);
    renderHeatMassBalance({ ...heat, outputKg, rejectKg, slagKg, returnsKg, yieldPct: calculateYield(outputKg, heat.inputKg) });
  }

  function handleHeatOutputSubmit(event) {
    event.preventDefault();
    const heat = findHeat();
    if (!heat) return;
    heat.outputKg = Number(document.querySelector("[data-output-ok]")?.value || 0);
    heat.rejectKg = Number(document.querySelector("[data-output-reject]")?.value || 0);
    heat.slagKg = Number(document.querySelector("[data-output-slag]")?.value || 0);
    heat.returnsKg = Number(document.querySelector("[data-output-returns]")?.value || 0);
    heat.yieldPct = calculateYield(heat.outputKg, heat.inputKg);
    heat.status = isYieldWithinStandard(heat.product, heat.yieldPct) ? "Selesai - Yield OK" : "Selesai - Yield Rendah";
    renderHeatDetail();
    showToast(`Output ${heat.heatNo} berhasil diperbarui.`);
  }

  function renderHeatDetail() {
    if (!document.querySelector("[data-heat-detail-page]")) return;
    const heat = findHeat();
    const root = document.querySelector("[data-heat-detail]");
    if (!root) return;

    if (!heat) {
      root.innerHTML = `<div class="empty-state">Heat tidak ditemukan. Buka kembali dari daftar heat log.</div>`;
      return;
    }

    const standard = yieldStandard[heat.product];
    const lots = getHeatInputLots(heat);
    const massValues = getHeatMassValues(heat);

    root.innerHTML = `
      <section class="panel">
        <div class="detail-header">
          <div>
            <h2 class="detail-title">${escapeHtml(heat.heatNo)}</h2>
            <p class="panel-caption">${escapeHtml(heat.product)} - ${escapeHtml(productCatalog[heat.product].name)} | Standar yield ${standard.min}%-${standard.max}%</p>
          </div>
          <div class="detail-actions">${renderStatusBadge(heat.status)}</div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Ringkasan Heat</h2>
            <p class="panel-caption">Operator, kepala shift, input bahan baku, dan yield berjalan</p>
          </div>
        </div>
        <div class="info-grid">
          <div class="info-item"><span>Tanggal</span><strong>${escapeHtml(getDateLabel(heat.date))}</strong></div>
          <div class="info-item"><span>Operator Tungku</span><strong>${escapeHtml(heat.operator)}</strong></div>
          <div class="info-item"><span>Kepala Shift</span><strong>${escapeHtml(heat.shiftLead)}</strong></div>
          <div class="info-item"><span>Yield Aktual</span><strong class="${isYieldWithinStandard(heat.product, massValues.yieldPct) ? "text-success" : "text-danger"}">${escapeHtml(heat.status === "Dalam Proses" ? "-" : formatPct(massValues.yieldPct))}</strong></div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Input Bahan Baku</h2>
            <p class="panel-caption">Lot BB yang digunakan dalam charging tungku</p>
          </div>
          <strong>${escapeHtml(formatKg(heat.inputKg))}</strong>
        </div>
        <div class="table-wrap">
          <table class="table-data">
            <thead>
              <tr>
                <th>No. Lot BB</th>
                <th>Jenis</th>
                <th>Supplier</th>
                <th class="text-right">Berat Digunakan</th>
              </tr>
            </thead>
            <tbody>
              ${lots.length ? lots.map((lot) => `
                <tr>
                  <td><strong>${escapeHtml(lot.lotNo)}</strong></td>
                  <td>${renderMaterialBadge(lot.material)}</td>
                  <td>${escapeHtml(lot.supplier)}</td>
                  <td class="text-right">${escapeHtml(formatKg(lot.usedKg || lot.weightActual))}</td>
                </tr>
              `).join("") : `<tr><td colspan="4"><div class="empty-state">Lot input belum ditautkan pada heat ini.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Output Produksi</h2>
            <p class="panel-caption">Input nilai output untuk menghitung yield final dan neraca massa</p>
          </div>
        </div>
        <form data-heat-output-form>
          <div class="form-grid">
            <label class="form-field" for="output-ok"><span class="form-label">Berat Ingot OK (kg)</span><input class="input" id="output-ok" type="number" min="0" step="1" value="${escapeHtml(heat.outputKg)}" data-output-ok></label>
            <label class="form-field" for="output-reject"><span class="form-label">Berat Ingot Reject (kg)</span><input class="input" id="output-reject" type="number" min="0" step="1" value="${escapeHtml(heat.rejectKg)}" data-output-reject></label>
            <label class="form-field" for="output-slag"><span class="form-label">Berat Slag (kg)</span><input class="input" id="output-slag" type="number" min="0" step="1" value="${escapeHtml(heat.slagKg)}" data-output-slag></label>
            <label class="form-field" for="output-returns"><span class="form-label">Berat Returns/Sisa (kg)</span><input class="input" id="output-returns" type="number" min="0" step="1" value="${escapeHtml(heat.returnsKg)}" data-output-returns></label>
          </div>
          <div style="margin-top: 14px;"><button class="button button-primary" type="submit">Simpan & Hitung Yield</button></div>
        </form>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Kalkulasi Yield & Neraca Massa</h2>
            <p class="panel-caption">Yield Final = Berat Ingot OK / Berat Input BB x 100%</p>
          </div>
        </div>
        <div data-heat-mass-balance></div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Timeline Produksi</h2>
            <p class="panel-caption">Simulasi milestone proses heat</p>
          </div>
        </div>
        <div class="timeline">
          <div class="timeline-step complete">Mulai</div>
          <div class="timeline-step complete">Charging</div>
          <div class="timeline-step ${heat.status !== "Dalam Proses" ? "complete" : ""}">Pouring</div>
          <div class="timeline-step ${heat.status !== "Dalam Proses" ? "complete" : ""}">Selesai</div>
        </div>
      </section>
    `;

    renderHeatMassBalance(heat);
    document.querySelectorAll("[data-output-ok], [data-output-reject], [data-output-slag], [data-output-returns]").forEach((field) => {
      field.addEventListener("input", updateHeatOutputPreview);
    });
    const form = document.querySelector("[data-heat-output-form]");
    if (form) form.addEventListener("submit", handleHeatOutputSubmit);
  }

  function getSortingRecord(lotNo) {
    return seedData.sortingList.find((item) => item.lotNo === lotNo) || null;
  }

  function getWaitingSortingLots() {
    return seedData.receivingList.filter((lot) => lot.status === "Menunggu Pemilahan");
  }

  function renderSortingTable() {
    const target = document.querySelector("[data-sorting-table]");
    const countTarget = document.querySelector("[data-sorting-count]");
    if (!target) return;
    const lots = getWaitingSortingLots().slice().reverse();
    if (countTarget) countTarget.textContent = `${lots.length} lot menunggu`;

    if (!lots.length) {
      target.innerHTML = `<tr><td colspan="6"><div class="empty-state">Tidak ada lot yang menunggu pemilahan.</div></td></tr>`;
      return;
    }

    target.innerHTML = lots.map((lot) => `
      <tr>
        <td><strong>${escapeHtml(lot.lotNo)}</strong></td>
        <td>${escapeHtml(lot.supplier)}</td>
        <td>${escapeHtml(getDateLabel(lot.dateIn))}</td>
        <td class="text-right">${escapeHtml(formatKg(lot.weightActual))}</td>
        <td>${renderStatusBadge(lot.status)}</td>
        <td><button class="button button-primary button-sm" type="button" data-open-sorting="${escapeHtml(lot.lotNo)}">Input Hasil Pemilahan</button></td>
      </tr>
    `).join("");
  }

  function fillSortingForm(lotNo) {
    const lot = seedData.receivingList.find((item) => item.lotNo === lotNo);
    if (!lot) return;
    document.querySelector("[data-sort-lot-no]").value = lot.lotNo;
    document.querySelector("[data-sort-weight-in]").value = lot.weightActual;
    document.querySelector("[data-sort-lot-label]").textContent = `${lot.lotNo} - ${formatKg(lot.weightActual)}`;
    ["sc-cu", "sc-br", "sc-bz", "sc-mx", "contaminant"].forEach((name) => {
      const field = document.querySelector(`[data-sort-${name}]`);
      if (field) field.value = "0";
    });
    updateSortingPreview();
    openModal("#modal-sorting-result");
  }

  function updateSortingPreview() {
    const weightIn = Number(document.querySelector("[data-sort-weight-in]")?.value || 0);
    const values = ["sc-cu", "sc-br", "sc-bz", "sc-mx", "contaminant"].map((name) => Number(document.querySelector(`[data-sort-${name}]`)?.value || 0));
    const total = values.reduce((sum, value) => sum + value, 0);
    const diffKg = total - weightIn;
    const diffPct = calculateDiffPct(weightIn, total);
    const target = document.querySelector("[data-sorting-preview]");
    if (!target) return;
    const statusClass = Math.abs(diffPct) > discrepancyThreshold.pemilahan ? "text-danger" : "text-success";
    target.innerHTML = `
      <div class="sorting-summary">
        <div class="recon-item"><span>Total Terpilah</span><strong>${escapeHtml(formatKg(total))}</strong></div>
        <div class="recon-item"><span>Berat Masuk</span><strong>${escapeHtml(formatKg(weightIn))}</strong></div>
        <div class="recon-item"><span>Selisih Kg</span><strong class="${statusClass}">${escapeHtml(formatKg(diffKg))}</strong></div>
        <div class="recon-item"><span>Selisih %</span><strong class="${statusClass}">${escapeHtml(formatPct(diffPct))}</strong></div>
        <div class="recon-item"><span>Toleransi</span><strong>0,5%</strong></div>
      </div>
    `;
  }

  function handleSortingSubmit(event) {
    event.preventDefault();
    const lotNo = document.querySelector("[data-sort-lot-no]")?.value;
    const lot = seedData.receivingList.find((item) => item.lotNo === lotNo);
    if (!lot) return;

    const record = {
      lotNo,
      scCu: Number(document.querySelector("[data-sort-sc-cu]")?.value || 0),
      scBr: Number(document.querySelector("[data-sort-sc-br]")?.value || 0),
      scBz: Number(document.querySelector("[data-sort-sc-bz]")?.value || 0),
      scMx: Number(document.querySelector("[data-sort-sc-mx]")?.value || 0),
      contaminant: Number(document.querySelector("[data-sort-contaminant]")?.value || 0),
      operator: document.querySelector("[data-sort-operator]")?.value || "-",
      date: String(document.querySelector("[data-sort-date]")?.value || "2025-05-19T11:00").replace("T", " ")
    };
    const total = record.scCu + record.scBr + record.scBz + record.scMx + record.contaminant;
    const diffPct = Math.abs(calculateDiffPct(lot.weightActual, total));

    seedData.sortingList.push(record);
    lot.status = diffPct > discrepancyThreshold.pemilahan ? "Selisih Terdeteksi" : "Sudah Dipilah";
    seedData.auditTrail.push({
      timestamp: record.date,
      category: "Penerimaan",
      activity: "Pemilahan selesai",
      ref: lotNo,
      user: record.operator,
      detail: `Total terpilah ${formatKg(total)}, selisih ${formatPct(diffPct)}`
    });

    closeModal("#modal-sorting-result");
    renderSortingTable();
    renderSortingStockPreview();
    showToast(`Hasil pemilahan ${lotNo} berhasil disimpan.`);
  }

  function getRawWarehouseBalances() {
    const incoming = { "SC-CU": 0, "SC-BR": 0, "SC-BZ": 0, "SC-MX": 0 };
    seedData.sortingList.forEach((item) => {
      incoming["SC-CU"] += item.scCu;
      incoming["SC-BR"] += item.scBr;
      incoming["SC-BZ"] += item.scBz;
      incoming["SC-MX"] += item.scMx;
    });

    const used = { "SC-CU": 0, "SC-BR": 0, "SC-BZ": 0, "SC-MX": 0 };
    seedData.heatLogList.forEach((heat) => {
      const material = productCatalog[heat.product]?.material;
      if (material) used[material] += heat.inputKg;
    });

    return Object.keys(incoming).map((code) => ({
      code,
      name: materialCatalog[code].name,
      incomingKg: incoming[code],
      usedKg: used[code],
      balanceKg: Math.max(0, incoming[code] - used[code])
    }));
  }

  function getFinishedGoodsBalances() {
    const produced = { "ING-CU": 0, "ING-BR": 0, "ING-BZ": 0 };
    const exported = { "ING-CU": 0, "ING-BR": 0, "ING-BZ": 0 };
    const openingByProduct = { "ING-CU": 6500, "ING-BR": 6500, "ING-BZ": 5500 };
    seedData.heatLogList.filter((heat) => heat.status !== "Dalam Proses").forEach((heat) => {
      produced[heat.product] += heat.outputKg;
    });
    seedData.exportList.forEach((item) => {
      exported[item.product] += item.weightKg;
    });

    return Object.keys(produced).map((code) => ({
      code,
      name: productCatalog[code].name,
      producedKg: produced[code],
      exportedKg: exported[code],
      balanceKg: Math.max(0, openingByProduct[code] + produced[code] - exported[code])
    }));
  }

  function getSlagRows() {
    return seedData.heatLogList
      .filter((heat) => heat.slagKg > 0)
      .map((heat, index) => ({
        date: heat.date,
        heatNo: heat.heatNo,
        slagKg: heat.slagKg,
        status: index % 3 === 0 ? "Sudah Dikirim ke Pengelola" : "Di Gudang"
      }));
  }

  function renderSortingStockPreview() {
    const target = document.querySelector("[data-sorting-stock-preview]");
    if (!target) return;
    target.innerHTML = getRawWarehouseBalances().map((item) => `
      <div class="stock-card">
        <div class="stock-card-header">
          <h3>${escapeHtml(item.code)}</h3>
          ${renderMaterialBadge(item.code)}
        </div>
        <strong class="stock-balance">${escapeHtml(formatKg(item.balanceKg))}</strong>
        <div class="stock-lines">
          <div><span>Masuk dari pemilahan</span><strong>${escapeHtml(formatKg(item.incomingKg))}</strong></div>
          <div><span>Keluar ke produksi</span><strong>${escapeHtml(formatKg(item.usedKg))}</strong></div>
        </div>
      </div>
    `).join("");
  }

  function initSortingPage() {
    if (!document.querySelector("[data-sorting-page]")) return;
    renderSortingTable();
    renderSortingStockPreview();

    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-open-sorting]");
      if (button) fillSortingForm(button.dataset.openSorting);
    });

    document.querySelectorAll("[data-sort-sc-cu], [data-sort-sc-br], [data-sort-sc-bz], [data-sort-sc-mx], [data-sort-contaminant]").forEach((field) => {
      field.addEventListener("input", updateSortingPreview);
    });

    const form = document.querySelector("[data-sorting-form]");
    if (form) form.addEventListener("submit", handleSortingSubmit);
  }

  function renderWarehouseRawTab() {
    const cards = document.querySelector("[data-warehouse-bb-cards]");
    const table = document.querySelector("[data-warehouse-bb-table]");
    if (cards) {
      cards.innerHTML = getRawWarehouseBalances().map((item) => `
        <div class="stock-card">
          <div class="stock-card-header">
            <h3>${escapeHtml(item.name)}</h3>
            ${renderMaterialBadge(item.code)}
          </div>
          <strong class="stock-balance">${escapeHtml(formatKg(item.balanceKg))}</strong>
          <div class="stock-lines">
            <div><span>Masuk Bulan Ini</span><strong>${escapeHtml(formatKg(item.incomingKg))}</strong></div>
            <div><span>Keluar ke Produksi</span><strong>${escapeHtml(formatKg(item.usedKg))}</strong></div>
          </div>
        </div>
      `).join("");
    }

    if (table) {
      const rows = seedData.sortingList.slice(-10).reverse().map((item) => {
        const lot = seedData.receivingList.find((entry) => entry.lotNo === item.lotNo);
        const total = item.scCu + item.scBr + item.scBz + item.scMx;
        return `
          <tr>
            <td>${escapeHtml(getDateLabel(item.date))}</td>
            <td><strong>${escapeHtml(item.lotNo)}</strong></td>
            <td>${lot ? renderMaterialBadge(lot.material) : "-"}</td>
            <td class="text-right">${escapeHtml(formatKg(total))}</td>
            <td>${escapeHtml(item.operator)}</td>
          </tr>
        `;
      }).join("");
      table.innerHTML = rows;
    }
  }

  function renderWarehouseFinishedTab() {
    const cards = document.querySelector("[data-warehouse-fg-cards]");
    const table = document.querySelector("[data-warehouse-fg-table]");
    if (cards) {
      cards.innerHTML = getFinishedGoodsBalances().map((item) => `
        <div class="stock-card">
          <div class="stock-card-header">
            <h3>${escapeHtml(item.name)}</h3>
            <span class="status-badge" style="background:#E3F2FD;color:#1565C0">${escapeHtml(item.code)}</span>
          </div>
          <strong class="stock-balance">${escapeHtml(formatKg(item.balanceKg))}</strong>
          <div class="stock-lines">
            <div><span>Diproduksi Bulan Ini</span><strong>${escapeHtml(formatKg(item.producedKg))}</strong></div>
            <div><span>Diekspor Bulan Ini</span><strong>${escapeHtml(formatKg(item.exportedKg))}</strong></div>
          </div>
        </div>
      `).join("");
    }

    if (table) {
      table.innerHTML = seedData.heatLogList.filter((heat) => heat.status !== "Dalam Proses").slice(-10).reverse().map((heat) => `
        <tr>
          <td>${escapeHtml(getDateLabel(heat.date))}</td>
          <td><strong>${escapeHtml(heat.heatNo)}</strong></td>
          <td>${escapeHtml(heat.product)}</td>
          <td class="text-right">${escapeHtml(formatKg(heat.outputKg))}</td>
          <td>${renderStatusBadge("Closed")}</td>
        </tr>
      `).join("");
    }
  }

  function renderWarehouseSlagTab() {
    const table = document.querySelector("[data-warehouse-slag-table]");
    const cards = document.querySelector("[data-warehouse-slag-cards]");
    const rows = getSlagRows();
    const total = rows.reduce((sum, row) => sum + row.slagKg, 0);
    const inWarehouse = rows.filter((row) => row.status === "Di Gudang").reduce((sum, row) => sum + row.slagKg, 0);

    if (cards) {
      cards.innerHTML = `
        <div class="stock-card"><h3>Total Slag Bulan Ini</h3><strong class="stock-balance">${escapeHtml(formatKg(total))}</strong><div class="stock-lines"><div><span>Sumber</span><strong>${rows.length} heat</strong></div></div></div>
        <div class="stock-card"><h3>Saldo Di Gudang</h3><strong class="stock-balance">${escapeHtml(formatKg(inWarehouse))}</strong><div class="stock-lines"><div><span>Perlu monitoring</span><strong>${rows.filter((row) => row.status === "Di Gudang").length} batch</strong></div></div></div>
      `;
    }

    if (table) {
      table.innerHTML = rows.map((row) => `
        <tr>
          <td>${escapeHtml(getDateLabel(row.date))}</td>
          <td><strong>${escapeHtml(row.heatNo)}</strong></td>
          <td class="text-right">${escapeHtml(formatKg(row.slagKg))}</td>
          <td>${renderStatusBadge(row.status === "Di Gudang" ? "Dalam Proses" : "Closed")}</td>
        </tr>
      `).join("");
    }
  }

  function initWarehousePage() {
    if (!document.querySelector("[data-warehouse-page]")) return;
    renderWarehouseRawTab();
    renderWarehouseFinishedTab();
    renderWarehouseSlagTab();
  }

  function getProductionRows() {
    return seedData.heatLogList.map((heat) => ({
      ...heat,
      pieces: heat.pieces || Math.max(0, Math.round((heat.outputKg || 0) / 25)),
      inspection: heat.inspection || (heat.rejectKg > 60 ? "Ada Cacat Minor" : "OK"),
      batchNo: heat.batchNo || `FNM-BATCH-${heat.heatNo.slice(9)}`
    }));
  }

  function renderProductionTable() {
    const target = document.querySelector("[data-production-table]");
    const countTarget = document.querySelector("[data-production-count]");
    if (!target) return;
    const rows = getProductionRows().slice().reverse();
    if (countTarget) countTarget.textContent = `${rows.length} heat`;

    target.innerHTML = rows.map((heat) => `
      <tr>
        <td><strong>${escapeHtml(heat.heatNo)}</strong><br><span class="text-muted">${escapeHtml(heat.batchNo)}</span></td>
        <td>${escapeHtml(heat.product)}<br><span class="text-muted">${escapeHtml(productCatalog[heat.product].name)}</span></td>
        <td class="text-right">${escapeHtml(heat.status === "Dalam Proses" ? "-" : heat.pieces)}</td>
        <td class="text-right">${escapeHtml(heat.status === "Dalam Proses" ? "-" : formatKg(heat.outputKg))}</td>
        <td>${escapeHtml(heat.status === "Dalam Proses" ? "Belum inspeksi" : heat.inspection)}</td>
        <td>${renderStatusBadge(heat.status)}</td>
        <td><button class="button button-secondary button-sm" type="button" data-open-production="${escapeHtml(heat.heatNo)}">Input Hasil</button></td>
      </tr>
    `).join("");
  }

  function fillProductionForm(heatNo) {
    const heat = seedData.heatLogList.find((item) => item.heatNo === heatNo);
    if (!heat) return;
    document.querySelector("[data-prod-heat-no]").value = heat.heatNo;
    document.querySelector("[data-prod-heat-label]").textContent = `${heat.heatNo} - ${heat.product}`;
    document.querySelector("[data-prod-pieces]").value = heat.pieces || Math.max(0, Math.round((heat.outputKg || 0) / 25));
    document.querySelector("[data-prod-output]").value = heat.outputKg || 0;
    document.querySelector("[data-prod-reject]").value = heat.rejectKg || 0;
    document.querySelector("[data-prod-returns]").value = heat.returnsKg || 0;
    document.querySelector("[data-prod-inspection]").value = heat.inspection || "OK";
    document.querySelector("[data-prod-batch]").value = heat.batchNo || `FNM-BATCH-${heat.heatNo.slice(9)}`;
    openModal("#modal-production-result");
  }

  function handleProductionSubmit(event) {
    event.preventDefault();
    const heatNo = document.querySelector("[data-prod-heat-no]")?.value;
    const heat = seedData.heatLogList.find((item) => item.heatNo === heatNo);
    if (!heat) return;
    heat.pieces = Number(document.querySelector("[data-prod-pieces]")?.value || 0);
    heat.outputKg = Number(document.querySelector("[data-prod-output]")?.value || 0);
    heat.rejectKg = Number(document.querySelector("[data-prod-reject]")?.value || 0);
    heat.returnsKg = Number(document.querySelector("[data-prod-returns]")?.value || 0);
    heat.inspection = document.querySelector("[data-prod-inspection]")?.value || "OK";
    heat.batchNo = document.querySelector("[data-prod-batch]")?.value || `FNM-BATCH-${heat.heatNo.slice(9)}`;
    heat.yieldPct = calculateYield(heat.outputKg, heat.inputKg);
    heat.status = isYieldWithinStandard(heat.product, heat.yieldPct) ? "Selesai - Yield OK" : "Selesai - Yield Rendah";
    seedData.auditTrail.push({
      timestamp: "2025-05-19 14:00",
      category: "Produksi",
      activity: "Hasil pencetakan dicatat",
      ref: heat.heatNo,
      user: "QC Produksi",
      detail: `${heat.pieces} pieces, ${formatKg(heat.outputKg)}, inspeksi ${heat.inspection}`
    });
    closeModal("#modal-production-result");
    renderProductionTable();
    showToast(`Hasil pencetakan ${heat.heatNo} berhasil disimpan.`);
  }

  function initProductionPage() {
    if (!document.querySelector("[data-production-page]")) return;
    renderProductionTable();
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-open-production]");
      if (button) fillProductionForm(button.dataset.openProduction);
    });
    const form = document.querySelector("[data-production-form]");
    if (form) form.addEventListener("submit", handleProductionSubmit);
  }

  function renderExportProductOptions() {
    const productSelect = document.querySelector("[data-export-product]");
    const customerSelect = document.querySelector("[data-export-customer]");
    if (productSelect) {
      productSelect.innerHTML = Object.entries(productCatalog).map(([code, item]) => `<option value="${escapeHtml(code)}">${escapeHtml(code)} - ${escapeHtml(item.name)}</option>`).join("");
    }
    if (customerSelect) {
      customerSelect.innerHTML = customers.map((customer) => `<option value="${escapeHtml(customer.name)}">${escapeHtml(customer.name)}</option>`).join("");
    }
  }

  function renderExportStockSummary() {
    const target = document.querySelector("[data-export-stock-summary]");
    if (!target) return;
    target.innerHTML = getFinishedGoodsBalances().map((item) => `
      <div class="stock-card">
        <div class="stock-card-header">
          <h3>${escapeHtml(item.code)}</h3>
          <span class="status-badge" style="background:#E3F2FD;color:#1565C0">Ready</span>
        </div>
        <strong class="stock-balance">${escapeHtml(formatKg(item.balanceKg))}</strong>
        <div class="stock-lines">
          <div><span>Diproduksi</span><strong>${escapeHtml(formatKg(item.producedKg))}</strong></div>
          <div><span>Diekspor</span><strong>${escapeHtml(formatKg(item.exportedKg))}</strong></div>
        </div>
      </div>
    `).join("");
  }

  function renderExportTable() {
    const target = document.querySelector("[data-export-table]");
    const countTarget = document.querySelector("[data-export-count]");
    if (!target) return;
    const rows = seedData.exportList.slice().reverse();
    if (countTarget) countTarget.textContent = `${rows.length} DO`;
    target.innerHTML = rows.map((item) => `
      <tr>
        <td><strong>${escapeHtml(item.doNo)}</strong></td>
        <td>${escapeHtml(item.pebNo)}</td>
        <td>${escapeHtml(item.customer)}</td>
        <td>${escapeHtml(item.product)}</td>
        <td class="text-right">${escapeHtml(formatKg(item.weightKg))}</td>
        <td>${escapeHtml(getDateLabel(item.dateShip))}</td>
        <td>${renderStatusBadge(item.status)}</td>
        <td><button class="button button-secondary button-sm" type="button" data-preview-export="${escapeHtml(item.doNo)}">Preview</button></td>
      </tr>
    `).join("");
  }

  function updateExportDiffPreview() {
    const peb = Number(document.querySelector("[data-export-weight-peb]")?.value || 0);
    const actual = Number(document.querySelector("[data-export-weight-final]")?.value || 0);
    const target = document.querySelector("[data-export-diff-preview]");
    if (!target) return;
    const diffKg = actual - peb;
    const diffPct = calculateDiffPct(peb, actual);
    const cls = Math.abs(diffPct) > discrepancyThreshold.timbang ? "text-danger" : "text-success";
    target.innerHTML = `<span class="${cls}"><strong>${escapeHtml(formatKg(diffKg))}</strong> (${escapeHtml(formatPct(diffPct))})</span>`;
  }

  function handleExportSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const doNo = generateDocumentNo("FNM-DO", seedData.exportList, "doNo");
    const dateShip = formData.get("dateShip") || "2025-05-19";
    const product = formData.get("product");
    const weightKg = Number(formData.get("weightFinal") || 0);
    seedData.exportList.push({
      doNo,
      pebNo: formData.get("pebNo"),
      customer: formData.get("customer"),
      product,
      weightKg,
      dateShip,
      status: "Siap Muat",
      containerNo: formData.get("containerNo"),
      sealNo: formData.get("sealNo")
    });
    seedData.auditTrail.push({
      timestamp: `${dateShip} 15:00`,
      category: "Ekspor",
      activity: "DO ekspor dibuat",
      ref: doNo,
      user: "Admin Ekspor",
      detail: `${product} ${formatKg(weightKg)} ke ${formData.get("customer")}`
    });
    closeModal("#modal-new-export");
    event.currentTarget.reset();
    renderExportTable();
    renderExportStockSummary();
    updateExportDiffPreview();
    showToast(`Delivery Order ${doNo} berhasil dibuat.`);
  }

  function initExportPage() {
    if (!document.querySelector("[data-export-page]")) return;
    renderExportProductOptions();
    renderExportTable();
    renderExportStockSummary();
    updateExportDiffPreview();
    document.querySelectorAll("[data-export-weight-peb], [data-export-weight-final]").forEach((field) => {
      field.addEventListener("input", updateExportDiffPreview);
    });
    const form = document.querySelector("[data-export-form]");
    if (form) form.addEventListener("submit", handleExportSubmit);
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-preview-export]");
      if (button) showToast(`Preview dokumen ${button.dataset.previewExport} siap untuk demo.`);
    });
  }

  function getLmbData() {
    const summary = getDashboardSummary();
    const rawBalances = getRawWarehouseBalances();
    const fgBalances = getFinishedGoodsBalances();
    const completedHeats = seedData.heatLogList.filter((heat) => heat.status !== "Dalam Proses");
    const totalSlag = completedHeats.reduce((sum, heat) => sum + heat.slagKg, 0);
    const totalRejectReturns = completedHeats.reduce((sum, heat) => sum + heat.rejectKg + heat.returnsKg, 0);
    const totalAccounted = summary.ingotProduced + totalSlag + totalRejectReturns;
    const shrinkageKg = Math.max(0, summary.rawMaterialProcessed - totalAccounted);
    const yieldActual = calculateYield(summary.ingotProduced, summary.rawMaterialProcessed);
    const unexplainedPct = summary.rawMaterialProcessed ? (shrinkageKg / summary.rawMaterialProcessed) * 100 : 0;

    return {
      period: "Mei 2025",
      lmbNo: "FNM-LMB-2025-05",
      summary,
      rawBalances,
      fgBalances,
      totalSlag,
      totalRejectReturns,
      shrinkageKg,
      yieldActual,
      unexplainedPct
    };
  }

  function renderLmbSectionA(data) {
    return `
      <section class="lmb-section">
        <div class="lmb-section-title">
          <h3>A. Pemasukan Bahan Baku</h3>
          <strong>${escapeHtml(formatKg(data.summary.rawMaterialIn))}</strong>
        </div>
        <div class="table-wrap">
          <table class="table-data">
            <thead>
              <tr>
                <th>Jenis</th>
                <th>No. PIB</th>
                <th>Supplier</th>
                <th>Tgl</th>
                <th class="text-right">Berat kg</th>
              </tr>
            </thead>
            <tbody>
              ${seedData.receivingList.map((item) => `
                <tr>
                  <td>${renderMaterialBadge(item.material)}</td>
                  <td>${escapeHtml(item.pibNo)}</td>
                  <td>${escapeHtml(item.supplier)}</td>
                  <td>${escapeHtml(getDateLabel(item.dateIn))}</td>
                  <td class="text-right">${escapeHtml(formatKg(item.weightActual))}</td>
                </tr>
              `).join("")}
              <tr>
                <td colspan="4"><strong>TOTAL PEMASUKAN BB</strong></td>
                <td class="text-right"><strong>${escapeHtml(formatKg(data.summary.rawMaterialIn))}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  function renderLmbSectionB(data) {
    return `
      <section class="lmb-section">
        <div class="lmb-section-title">
          <h3>B. Pemakaian Bahan Baku ke Produksi</h3>
          <strong>${escapeHtml(formatKg(data.summary.rawMaterialProcessed))}</strong>
        </div>
        <div class="table-wrap">
          <table class="table-data">
            <thead>
              <tr>
                <th>No. Heat</th>
                <th>Produk Target</th>
                <th>Tanggal</th>
                <th class="text-right">Input BB</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${seedData.heatLogList.map((heat) => `
                <tr>
                  <td><strong>${escapeHtml(heat.heatNo)}</strong></td>
                  <td>${escapeHtml(heat.product)}</td>
                  <td>${escapeHtml(getDateLabel(heat.date))}</td>
                  <td class="text-right">${escapeHtml(formatKg(heat.inputKg))}</td>
                  <td>${renderStatusBadge(heat.status)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  function renderLmbSectionC(data) {
    return `
      <section class="lmb-section">
        <div class="lmb-section-title">
          <h3>C. Hasil Produksi Ingot Jadi</h3>
          <strong>${escapeHtml(formatKg(data.summary.ingotProduced))}</strong>
        </div>
        <div class="lmb-summary-grid">
          ${data.fgBalances.map((item) => `
            <div class="recon-item">
              <span>${escapeHtml(item.code)}</span>
              <strong>${escapeHtml(formatKg(item.producedKg))}</strong>
            </div>
          `).join("")}
          <div class="recon-item">
            <span>Reject + Returns</span>
            <strong>${escapeHtml(formatKg(data.totalRejectReturns))}</strong>
          </div>
        </div>
      </section>
    `;
  }

  function renderLmbSectionD(data) {
    return `
      <section class="lmb-section">
        <div class="lmb-section-title">
          <h3>D. Pengeluaran Produk Jadi Ekspor</h3>
          <strong>${escapeHtml(formatKg(data.summary.exported))}</strong>
        </div>
        <div class="table-wrap">
          <table class="table-data">
            <thead>
              <tr>
                <th>No. DO</th>
                <th>No. PEB</th>
                <th>Customer</th>
                <th>Produk</th>
                <th class="text-right">Berat</th>
              </tr>
            </thead>
            <tbody>
              ${seedData.exportList.map((item) => `
                <tr>
                  <td><strong>${escapeHtml(item.doNo)}</strong></td>
                  <td>${escapeHtml(item.pebNo)}</td>
                  <td>${escapeHtml(item.customer)}</td>
                  <td>${escapeHtml(item.product)}</td>
                  <td class="text-right">${escapeHtml(formatKg(item.weightKg))}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  function renderLmbSectionE(data) {
    return `
      <section class="lmb-section">
        <div class="lmb-section-title">
          <h3>E. Saldo Akhir</h3>
          <strong>BB + FG</strong>
        </div>
        <div class="lmb-summary-grid">
          <div class="recon-item">
            <span>Saldo Akhir BB</span>
            <strong>${escapeHtml(formatKg(data.rawBalances.reduce((sum, item) => sum + item.balanceKg, 0)))}</strong>
          </div>
          <div class="recon-item">
            <span>Saldo Akhir FG</span>
            <strong>${escapeHtml(formatKg(data.fgBalances.reduce((sum, item) => sum + item.balanceKg, 0)))}</strong>
          </div>
          <div class="recon-item">
            <span>Saldo Slag</span>
            <strong>${escapeHtml(formatKg(seedData.openingBalance.slagKg + data.totalSlag))}</strong>
          </div>
          <div class="recon-item">
            <span>Saldo Awal FG</span>
            <strong>${escapeHtml(formatKg(seedData.openingBalance.finishedGoodsKg))}</strong>
          </div>
        </div>
      </section>
    `;
  }

  function renderLmbSectionF(data) {
    const statusOk = data.yieldActual >= 88 && data.yieldActual <= 96 && data.unexplainedPct <= discrepancyThreshold.major;
    return `
      <section class="lmb-section">
        <div class="lmb-section-title">
          <h3>F. Neraca Konversi</h3>
          ${renderStatusBadge(statusOk ? "Closed" : "Open")}
        </div>
        <div class="lmb-conversion">
          <div class="mass-balance">
            <div class="mass-row"><strong>Total BB Diproses</strong><span class="text-right">${escapeHtml(formatKg(data.summary.rawMaterialProcessed))}</span><span class="text-right">100,0%</span></div>
            <div class="mass-row"><span>Ingot Jadi</span><span class="text-right">${escapeHtml(formatKg(data.summary.ingotProduced))}</span><span class="text-right">${escapeHtml(formatPct(data.yieldActual))}</span></div>
            <div class="mass-row"><span>Slag</span><span class="text-right">${escapeHtml(formatKg(data.totalSlag))}</span><span class="text-right">${escapeHtml(formatPct(calculateYield(data.totalSlag, data.summary.rawMaterialProcessed)))}</span></div>
            <div class="mass-row"><span>Reject + Returns</span><span class="text-right">${escapeHtml(formatKg(data.totalRejectReturns))}</span><span class="text-right">${escapeHtml(formatPct(calculateYield(data.totalRejectReturns, data.summary.rawMaterialProcessed)))}</span></div>
            <div class="mass-row"><span>Susut/Penguapan</span><span class="text-right">${escapeHtml(formatKg(data.shrinkageKg))}</span><span class="text-right">${escapeHtml(formatPct(data.unexplainedPct))}</span></div>
          </div>
          <div class="mass-balance">
            <div class="mass-balance-header">
              <div>
                <span class="text-muted">Yield Aktual</span><br>
                <strong class="${statusOk ? "text-success" : "text-danger"}">${escapeHtml(formatPct(data.yieldActual))}</strong>
              </div>
              <div>${renderStatusBadge(statusOk ? "Closed" : "Open")}</div>
            </div>
            <div class="yield-meter"><div class="yield-meter-fill" style="width:${Math.max(0, Math.min(100, data.yieldActual))}%;background:${statusOk ? "#2D8A4E" : "#C0392B"}"></div></div>
            <p class="panel-caption">Yield standar gabungan mengacu rentang alloy 88%-96%. Selisih tidak terjelaskan ${escapeHtml(formatPct(data.unexplainedPct))}.</p>
          </div>
        </div>
      </section>
    `;
  }

  function renderReconciliationPage() {
    const target = document.querySelector("[data-lmb-document]");
    if (!target) return;
    const data = getLmbData();
    target.innerHTML = `
      <article class="lmb-document">
        <header class="lmb-header">
          <div>
            <h2>LAPORAN MUTASI BARANG (LMB)</h2>
            <p>PT. Fremont Nusa Metal Indonesia | Periode ${escapeHtml(data.period)}</p>
          </div>
          <div class="lmb-meta">
            <strong>No. LMB:</strong> ${escapeHtml(data.lmbNo)}<br>
            <strong>Status:</strong> Simulasi Demo KB-Ready<br>
            <strong>Generated:</strong> 19 Mei 2026
          </div>
        </header>
        ${renderLmbSectionA(data)}
        ${renderLmbSectionB(data)}
        ${renderLmbSectionC(data)}
        ${renderLmbSectionD(data)}
        ${renderLmbSectionE(data)}
        ${renderLmbSectionF(data)}
      </article>
    `;
  }

  function initReconciliationPage() {
    if (!document.querySelector("[data-reconciliation-page]")) return;
    renderReconciliationPage();
    document.querySelectorAll("[data-export-sim]").forEach((button) => {
      button.addEventListener("click", () => {
        const type = button.dataset.exportSim;
        if (type === "print") {
          window.print();
          return;
        }
        showToast(`Export ${type.toUpperCase()} LMB disiapkan sebagai simulasi demo.`);
      });
    });
    const generateButton = document.querySelector("[data-generate-lmb]");
    if (generateButton) {
      generateButton.addEventListener("click", () => {
        renderReconciliationPage();
        showToast("LMB Mei 2025 berhasil digenerate ulang.");
      });
    }
  }

  function getDiscrepancyFilters() {
    return {
      type: document.querySelector("[data-filter-discrepancy-type]")?.value || "",
      status: document.querySelector("[data-filter-discrepancy-status]")?.value || "",
      date: document.querySelector("[data-filter-discrepancy-date]")?.value || ""
    };
  }

  function getFilteredDiscrepancies() {
    const filters = getDiscrepancyFilters();
    return seedData.discrepancyList.filter((item) => {
      const matchesType = !filters.type || item.type === filters.type;
      const matchesStatus = !filters.status || item.status === filters.status;
      const matchesDate = !filters.date || item.date === filters.date;
      return matchesType && matchesStatus && matchesDate;
    });
  }

  function getDiscrepancyClassification(type) {
    const map = {
      "Selisih Timbang": { className: "Selisih Timbang", tolerance: "≤ 0,3%", escalation: "Tidak perlu jika dalam toleransi" },
      "Selisih Pemilahan": { className: "Selisih Pemilahan", tolerance: "≤ 0,5%", escalation: "Kepala Gudang" },
      "Yield Produksi": { className: "Selisih Yield", tolerance: "± 2%", escalation: "Kepala Operasional" },
      "Stok Opname": { className: "Selisih Stock Opname", tolerance: "≤ 0,5%", escalation: "Kepala Operasional" }
    };
    return map[type] || { className: "Selisih Besar", tolerance: "> 2%", escalation: "Direktur + DJBC" };
  }

  function renderPriorityBadge(priority) {
    if (priority === "Eskalasi") {
      return `<span class="status-badge" style="background:#FFEBEE;color:#C0392B">Eskalasi</span>`;
    }
    return `<span class="status-badge" style="background:#E8F5E9;color:#2D8A4E">Normal</span>`;
  }

  function renderDiscrepancyFilters() {
    const typeSelect = document.querySelector("[data-filter-discrepancy-type]");
    if (!typeSelect) return;
    const types = Array.from(new Set(seedData.discrepancyList.map((item) => item.type)));
    typeSelect.innerHTML = `<option value="">Semua Jenis</option>${types.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`).join("")}`;
  }

  function renderDiscrepancyTable() {
    const target = document.querySelector("[data-discrepancy-table]");
    const countTarget = document.querySelector("[data-discrepancy-count]");
    if (!target) return;
    const rows = getFilteredDiscrepancies().slice().reverse();
    if (countTarget) countTarget.textContent = `${rows.length} kasus`;

    if (!rows.length) {
      target.innerHTML = `<tr><td colspan="7"><div class="empty-state">Tidak ada kasus selisih yang cocok dengan filter.</div></td></tr>`;
      return;
    }

    target.innerHTML = rows.map((item) => `
      <tr>
        <td><strong>${escapeHtml(item.caseNo)}</strong></td>
        <td>${escapeHtml(item.type)}</td>
        <td>${escapeHtml(item.ref)}</td>
        <td class="text-right"><strong>${escapeHtml(formatKg(item.discKg))}</strong><br><span class="${item.discPct > discrepancyThreshold.major ? "text-danger" : "text-muted"}">${escapeHtml(formatPct(item.discPct))}</span></td>
        <td>${renderStatusBadge(item.status)}</td>
        <td>${renderPriorityBadge(item.priority)}</td>
        <td><a class="button button-secondary button-sm" href="discrepancy-detail.html?case=${encodeURIComponent(item.caseNo)}">Lihat Detail</a></td>
      </tr>
    `).join("");
  }

  function initDiscrepancyPage() {
    if (!document.querySelector("[data-discrepancy-page]")) return;
    renderDiscrepancyFilters();
    renderDiscrepancyTable();
    document.querySelectorAll("[data-discrepancy-filter]").forEach((field) => {
      field.addEventListener("input", renderDiscrepancyTable);
      field.addEventListener("change", renderDiscrepancyTable);
    });
    const resetButton = document.querySelector("[data-reset-discrepancy-filters]");
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        document.querySelectorAll("[data-discrepancy-filter]").forEach((field) => {
          field.value = "";
        });
        renderDiscrepancyTable();
      });
    }
  }

  function findDiscrepancyCase() {
    const caseNo = getQueryParam("case") || seedData.discrepancyList[0]?.caseNo;
    return seedData.discrepancyList.find((item) => item.caseNo === caseNo) || null;
  }

  function renderDiscrepancyDetail() {
    if (!document.querySelector("[data-discrepancy-detail-page]")) return;
    const target = document.querySelector("[data-discrepancy-detail]");
    const item = findDiscrepancyCase();
    if (!target) return;

    if (!item) {
      target.innerHTML = `<div class="empty-state">Kasus selisih tidak ditemukan. Buka kembali dari daftar selisih.</div>`;
      return;
    }

    const classification = getDiscrepancyClassification(item.type);
    const isClosed = item.status === "Closed";
    target.innerHTML = `
      <section class="panel">
        <div class="detail-header">
          <div>
            <h2 class="detail-title">${escapeHtml(item.caseNo)}</h2>
            <p class="panel-caption">${escapeHtml(item.type)} pada referensi ${escapeHtml(item.ref)}</p>
          </div>
          <div class="detail-actions">
            ${renderPriorityBadge(item.priority)}
            ${renderStatusBadge(item.status)}
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Info Kasus</h2>
            <p class="panel-caption">Besaran selisih, tanggal, dan referensi dokumen</p>
          </div>
        </div>
        <div class="info-grid">
          <div class="info-item"><span>Jenis Selisih</span><strong>${escapeHtml(item.type)}</strong></div>
          <div class="info-item"><span>Referensi</span><strong>${escapeHtml(item.ref)}</strong></div>
          <div class="info-item"><span>Besar Selisih</span><strong class="${item.discPct > discrepancyThreshold.major ? "text-danger" : ""}">${escapeHtml(formatKg(item.discKg))} (${escapeHtml(formatPct(item.discPct))})</strong></div>
          <div class="info-item"><span>Tanggal</span><strong>${escapeHtml(getDateLabel(item.date))}</strong></div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Klasifikasi SOP-09</h2>
            <p class="panel-caption">Toleransi dan jalur eskalasi sesuai prosedur penanganan selisih</p>
          </div>
        </div>
        <div class="info-grid">
          <div class="info-item"><span>Klasifikasi</span><strong>${escapeHtml(classification.className)}</strong></div>
          <div class="info-item"><span>Toleransi</span><strong>${escapeHtml(classification.tolerance)}</strong></div>
          <div class="info-item"><span>Eskalasi</span><strong>${escapeHtml(classification.escalation)}</strong></div>
          <div class="info-item"><span>Prioritas</span><strong>${item.priority === "Eskalasi" ? "Direktur perlu review" : "Operasional normal"}</strong></div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Analisis & Tindakan</h2>
            <p class="panel-caption">Form investigasi sederhana untuk demo workflow closure</p>
          </div>
        </div>
        <form data-discrepancy-action-form>
          <div class="form-grid">
            <label class="form-field full" for="disc-cause">
              <span class="form-label">Analisis Penyebab</span>
              <textarea class="textarea" id="disc-cause" data-disc-cause>${escapeHtml(item.analysis || "Perlu verifikasi ulang dokumen timbang, log operator, dan hasil stock opname terkait.")}</textarea>
            </label>
            <label class="form-field" for="disc-action">
              <span class="form-label">Tindakan yang Ditetapkan</span>
              <select class="select" id="disc-action" data-disc-action>
                <option value="Verifikasi ulang timbang">Verifikasi ulang timbang</option>
                <option value="Koreksi kartu stok">Koreksi kartu stok</option>
                <option value="Review proses produksi">Review proses produksi</option>
                <option value="Eskalasi ke direktur">Eskalasi ke direktur</option>
              </select>
            </label>
            <label class="form-field" for="disc-owner">
              <span class="form-label">PIC Tindakan</span>
              <input class="input" id="disc-owner" value="${item.priority === "Eskalasi" ? "Kepala Operasional" : "Kepala Gudang"}" data-disc-owner>
            </label>
            <label class="form-field full" for="disc-note">
              <span class="form-label">Catatan Tindakan</span>
              <textarea class="textarea" id="disc-note" data-disc-note>${escapeHtml(item.actionNote || "Dokumentasi pendukung akan dilampirkan pada audit trail.")}</textarea>
            </label>
          </div>
          <div style="margin-top: 14px; display: flex; gap: 10px;">
            <button class="button button-secondary" type="submit">Simpan Investigasi</button>
            <button class="button button-primary" type="button" data-close-discrepancy ${isClosed ? "disabled" : ""}>Tutup Kasus</button>
          </div>
        </form>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">History Status</h2>
            <p class="panel-caption">Simulasi jejak perubahan status kasus</p>
          </div>
        </div>
        <div class="timeline">
          <div class="timeline-step complete">Open</div>
          <div class="timeline-step ${item.status !== "Open" ? "complete" : ""}">Dalam Investigasi</div>
          <div class="timeline-step ${isClosed ? "complete" : ""}">Closed</div>
        </div>
      </section>
    `;

    const form = document.querySelector("[data-discrepancy-action-form]");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        item.analysis = document.querySelector("[data-disc-cause]")?.value || "";
        item.action = document.querySelector("[data-disc-action]")?.value || "";
        item.actionNote = document.querySelector("[data-disc-note]")?.value || "";
        if (item.status === "Open") item.status = "Dalam Investigasi";
        showToast(`Investigasi ${item.caseNo} berhasil disimpan.`);
        renderDiscrepancyDetail();
      });
    }

    const closeButton = document.querySelector("[data-close-discrepancy]");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        showConfirm(`Tutup kasus ${item.caseNo}?`, () => {
          item.status = "Closed";
          item.action = document.querySelector("[data-disc-action]")?.value || "Koreksi kartu stok";
          seedData.auditTrail.push({
            timestamp: "2025-05-19 16:00",
            category: "Rekonsiliasi",
            activity: "Kasus selisih ditutup",
            ref: item.caseNo,
            user: "Kepala Operasional",
            detail: `${item.type} ${formatKg(item.discKg)} ditutup`
          });
          renderDiscrepancyDetail();
          showToast(`Kasus ${item.caseNo} ditutup.`);
        });
      });
    }
  }

  function getAuditCategoryMap() {
    return {
      all: "Semua Aktivitas",
      receiving: "Penerimaan",
      production: "Produksi",
      export: "Ekspor",
      reconciliation: "Rekonsiliasi"
    };
  }

  function getAuditRows(categoryKey = "all") {
    const category = getAuditCategoryMap()[categoryKey];
    const rows = categoryKey === "all"
      ? seedData.auditTrail
      : seedData.auditTrail.filter((item) => item.category === category);
    return rows.slice().sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)));
  }

  function renderAuditCounters() {
    const target = document.querySelector("[data-audit-counters]");
    if (!target) return;
    const categories = getAuditCategoryMap();
    target.innerHTML = Object.entries(categories).map(([key, label]) => {
      const count = getAuditRows(key).length;
      return `
        <div class="recon-item">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(count)}</strong>
        </div>
      `;
    }).join("");
  }

  function renderAuditTable(categoryKey = "all") {
    const target = document.querySelector("[data-audit-table]");
    const countTarget = document.querySelector("[data-audit-count]");
    if (!target) return;
    const rows = getAuditRows(categoryKey);
    if (countTarget) countTarget.textContent = `${rows.length} aktivitas`;

    if (!rows.length) {
      target.innerHTML = `<tr><td colspan="5"><div class="empty-state">Tidak ada aktivitas pada kategori ini.</div></td></tr>`;
      return;
    }

    target.innerHTML = rows.map((item) => `
      <tr>
        <td><strong>${escapeHtml(item.timestamp)}</strong></td>
        <td>${escapeHtml(item.activity)}<br><span class="text-muted">${escapeHtml(item.category)}</span></td>
        <td>${escapeHtml(item.ref)}</td>
        <td>${escapeHtml(item.user)}</td>
        <td>${escapeHtml(item.detail)}</td>
      </tr>
    `).join("");
  }

  function initAuditTrailPage() {
    if (!document.querySelector("[data-audit-page]")) return;
    renderAuditCounters();
    renderAuditTable("all");
    document.querySelectorAll("[data-audit-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-audit-tab]").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        renderAuditTable(button.dataset.auditTab);
      });
    });
  }

  function setActiveNavigation() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav]").forEach((link) => {
      const target = link.getAttribute("href") || "";
      const targetPage = target.split("?")[0].split("/").pop();
      link.classList.toggle("active", targetPage === currentPage);
    });
  }

  function renderSidebar() {
    const placeholder = document.querySelector("[data-layout-sidebar]");
    if (!placeholder) return;

    const links = [
      ["DB", "Dashboard", "dashboard.html"],
      ["IN", "Penerimaan", "receiving.html"],
      ["SO", "Pemilahan", "sorting.html"],
      ["WH", "Gudang", "warehouse.html"],
      ["HT", "Heat Log", "heat-log.html"],
      ["PR", "Produksi", "production.html"],
      ["EX", "Ekspor", "export.html"],
      ["LM", "Rekonsiliasi", "reconciliation.html"],
      ["DS", "Selisih", "discrepancy.html"],
      ["AU", "Audit Trail", "audit-trail.html"]
    ];

    placeholder.innerHTML = `
      <aside class="sidebar">
        <div class="sidebar-logo">
          <span class="brand-mark">FM</span>
          <span>
            <span class="sidebar-logo-title">MetalTrack</span>
            <span class="sidebar-logo-subtitle">by Freemont</span>
          </span>
        </div>
        <nav class="sidebar-nav">
          ${links.map(([code, label, href]) => `
            <a class="sidebar-link" data-nav href="${href}">
              <span class="sidebar-link-code">${code}</span>
              <span>${label}</span>
            </a>
          `).join("")}
        </nav>
        <div class="sidebar-user">
          <strong>Ahmad Fauzi</strong>
          <span>Admin Operasional</span>
        </div>
      </aside>
    `;
    setActiveNavigation();
  }

  function renderTopBar() {
    const placeholder = document.querySelector("[data-layout-topbar]");
    if (!placeholder) return;
    const title = placeholder.dataset.title || "Freemont MetalTrack";
    const subtitle = placeholder.dataset.subtitle || "Sistem Pencatatan Mutasi Material";
    const now = new Date();
    placeholder.innerHTML = `
      <header class="top-bar">
        <div>
          <h1 class="page-title">${escapeHtml(title)}</h1>
          <p class="page-subtitle">${escapeHtml(subtitle)}</p>
        </div>
        <div class="top-bar-meta">
          <strong>Ahmad Fauzi</strong><br>
          <span>${now.toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}</span>
        </div>
      </header>
    `;
  }

  function initLogin() {
    const form = document.querySelector("[data-login-form]");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      showToast("Login berhasil. Membuka dashboard...");
      window.setTimeout(() => {
        window.location.href = "pages/dashboard.html";
      }, 450);
    });
  }

  function initModalControls() {
    document.addEventListener("click", (event) => {
      const openTarget = event.target.closest("[data-open-modal]");
      if (openTarget) openModal(openTarget.dataset.openModal);

      const closeTarget = event.target.closest("[data-close-modal]");
      if (closeTarget) closeModal(closeTarget.dataset.closeModal);

      if (event.target.classList.contains("modal-backdrop")) {
        event.target.classList.remove("open");
      }

      const printTarget = event.target.closest("[data-print-page]");
      if (printTarget) window.print();
    });
  }

  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach((tabs) => {
      tabs.addEventListener("click", (event) => {
        const button = event.target.closest("[data-tab-target]");
        if (!button) return;
        const scope = tabs.dataset.tabs;
        document.querySelectorAll(`[data-tabs="${scope}"] [data-tab-target]`).forEach((item) => item.classList.remove("active"));
        document.querySelectorAll(`[data-tab-panel="${scope}"]`).forEach((panel) => {
          panel.hidden = panel.dataset.panelName !== button.dataset.tabTarget;
        });
        button.classList.add("active");
      });
    });
  }

  function initApp() {
    renderSidebar();
    renderTopBar();
    initLogin();
    initModalControls();
    initTabs();
    initDashboard();
    initReceivingPage();
    renderReceivingDetail();
    initHeatLogPage();
    renderHeatDetail();
    initSortingPage();
    initWarehousePage();
    initProductionPage();
    initExportPage();
    initReconciliationPage();
    initDiscrepancyPage();
    renderDiscrepancyDetail();
    initAuditTrailPage();
  }

  window.FreemontTrack = {
    suppliers,
    customers,
    materialCatalog,
    productCatalog,
    yieldStandard,
    discrepancyThreshold,
    seedData,
    escapeHtml,
    formatKg,
    formatTon,
    formatPct,
    getDateLabel,
    calculateDiffPct,
    calculateYield,
    isYieldWithinStandard,
    renderStatusBadge,
    renderMaterialBadge,
    showToast,
    showConfirm,
    openModal,
    closeModal,
    getQueryParam,
    generateDocumentNo,
    getDashboardSummary,
    renderReceivingTable,
    renderReceivingDetail,
    renderHeatTable,
    renderHeatDetail,
    renderSortingTable,
    initWarehousePage,
    renderProductionTable,
    renderExportTable,
    renderReconciliationPage,
    renderDiscrepancyTable,
    renderDiscrepancyDetail,
    renderAuditTable,
    setActiveNavigation
  };

  document.addEventListener("DOMContentLoaded", initApp);
})();
