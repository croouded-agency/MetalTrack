# CLAUDE.md — Freemont MetalTrack
## Panduan AI untuk Pengembangan Prototype HTML

> Dokumen ini adalah panduan kerja utama untuk Claude Code / AI assistant dalam membangun prototype **Freemont MetalTrack** — sistem pencatatan mutasi material berbasis web untuk PT. Fremont Nusa Metal Indonesia.
>
> Baca dokumen ini **sepenuhnya** sebelum menulis satu baris kode pun.

---

## 1. KONTEKS PROYEK

### Tentang Klien
**PT. Fremont Nusa Metal Indonesia** adalah perusahaan peleburan logam non-besi (tembaga, kuningan, perunggu) yang:
- Mengimpor 100% bahan baku berupa **scrap logam non-besi bersih** dari berbagai negara
- Mengekspor 100% produk jadi berupa **ingot** ke Taiwan dan negara lain
- Sedang dalam proses pengajuan status **Kawasan Berikat (KB)** ke DJBC

### Masalah yang Dipecahkan
Audit bea cukai menemukan sistem pencatatan internal perusahaan sangat minim. Perusahaan diminta memperbaiki sistem pencatatan mutasi material (masuk–proses–keluar) sebagai syarat menuju KB. Prototype ini adalah **demonstrasi solusi digital** yang akan ditawarkan.

### Tujuan Prototype
Bukan aplikasi production-ready. Ini adalah **interactive demo** berkualitas tinggi untuk:
1. Meyakinkan manajemen PT. Fremont bahwa sistem ini bisa menjawab kebutuhan mereka
2. Menunjukkan kepada auditor bea cukai bahwa pencatatan akan dilakukan dengan benar
3. Menjadi blueprint untuk pengembangan aplikasi nyata

### Referensi Proyek Serupa
Prototype ini terinspirasi dari **IndoSync** — sistem kontrol manufaktur yang dibangun untuk PT. Indospring Tbk (perusahaan spring/per otomotif). IndoSync adalah referensi untuk **kualitas UI, struktur navigasi, dan pola interaksi**, bukan untuk konten bisnis. Konten bisnis harus mengacu pada SOP PT. Fremont (lihat Bagian 4).

---

## 2. ATURAN TEKNIS — WAJIB DIPATUHI

### Stack & Environment
```
- Pure HTML5, CSS3, Vanilla JavaScript (ES6+)
- TIDAK boleh menggunakan framework apapun (React, Vue, Angular, Bootstrap, Tailwind, dll.)
- TIDAK boleh menggunakan CDN library apapun kecuali yang disebutkan eksplisit di bawah
- Semua file berjalan dari filesystem lokal (file://) tanpa server
- Satu file CSS utama: assets/css/main.css
- Satu file JS utama: assets/js/main.js
- Data dummy: hardcoded langsung di JS atau inline di HTML
```

### Library yang Diizinkan (via CDN)
```html
<!-- Chart.js untuk grafik di Dashboard -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- QR Code generator untuk fitur cetak label -->
<script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
```
Selain dua library di atas, tidak ada CDN lain yang boleh ditambahkan tanpa konfirmasi eksplisit.

### Struktur Direktori
```
freemont-metaltrack/
├── index.html                    ← Halaman login / entry point
├── assets/
│   ├── css/
│   │   └── main.css              ← Semua styling, satu file
│   └── js/
│       └── main.js               ← Semua logic, satu file
└── pages/
    ├── dashboard.html
    ├── receiving.html            ← SOP-01: Penerimaan Material
    ├── receiving-detail.html     ← Detail per penerimaan + QR label
    ├── sorting.html              ← SOP-02: Pemilahan & Penimbangan
    ├── warehouse.html            ← SOP-03 + SOP-06: Gudang BB & FG (gabungan)
    ├── heat-log.html             ← SOP-04: Log Heat Peleburan
    ├── heat-log-detail.html      ← Detail satu heat + kalkulasi yield
    ├── production.html           ← SOP-05: Pencetakan & Inspeksi
    ├── export.html               ← SOP-07: Pengiriman & Ekspor
    ├── reconciliation.html       ← SOP-08: Rekonsiliasi & LMB Bulanan
    ├── discrepancy.html          ← SOP-09: Penanganan Selisih
    ├── discrepancy-detail.html   ← Detail kasus selisih + investigasi
    └── audit-trail.html          ← Log aktivitas sistem
```

### Konvensi Penamaan
```
- ID elemen: kebab-case (contoh: btn-submit-heat, tbl-receiving-list)
- Kelas CSS: kebab-case, prefiks per komponen (contoh: .card-metric, .table-data, .status-badge)
- Variabel JS: camelCase (contoh: heatLogData, receivingList)
- Fungsi JS: camelCase verb+noun (contoh: renderHeatTable(), calculateYield())
- Nomor dokumen dummy: ikuti format SOP (contoh: FNM-LOT-202505-001, FNM-HEAT-202505-001)
```

---

## 3. PANDUAN DESAIN UI

### Filosofi Visual
Tampilan harus terkesan **profesional industri manufaktur**, bukan SaaS startup. Referensi: industrial control system, ERP dashboard. Kesan: *bisa dipercaya, terstruktur, tidak ada noise*.

### Color Palette — WAJIB KONSISTEN
```css
/* Primary */
--color-primary-dark:   #1B2A4A;   /* Sidebar background, header utama */
--color-primary:        #2E4A7A;   /* Elemen aktif, CTA button */
--color-primary-light:  #3A6BC7;   /* Hover state, link */

/* Accent — digunakan hemat */
--color-accent-orange:  #E07B39;   /* Warning, pending action */
--color-accent-green:   #2D8A4E;   /* Status OK, success */
--color-accent-red:     #C0392B;   /* Status NG, error, reject */

/* Neutral */
--color-bg-page:        #F0F2F5;   /* Background halaman */
--color-bg-card:        #FFFFFF;   /* Background card/panel */
--color-bg-sidebar:     #1B2A4A;   /* Sidebar */
--color-border:         #D8DDE6;   /* Border tabel, card */
--color-text-primary:   #1A1A2E;   /* Teks utama */
--color-text-secondary: #6B7280;   /* Label, caption */
--color-text-white:     #FFFFFF;

/* Status badges — konsisten di seluruh aplikasi */
--status-pending:       #FFF3E0;   /* bg */ / #E07B39  /* text */
--status-ok:            #E8F5E9;   /* bg */ / #2D8A4E  /* text */
--status-ng:            #FFEBEE;   /* bg */ / #C0392B  /* text */
--status-hold:          #E3F2FD;   /* bg */ / #1565C0  /* text */
--status-closed:        #F3E5F5;   /* bg */ / #6A1B9A  /* text */
```

### Tipografi
```css
font-family: 'Segoe UI', 'Inter', system-ui, -apple-system, sans-serif;
/* Ukuran */
--text-xs:    11px;  /* caption, label tabel kecil */
--text-sm:    13px;  /* body tabel */
--text-base:  14px;  /* body teks umum */
--text-md:    16px;  /* judul section */
--text-lg:    20px;  /* judul halaman */
--text-xl:    28px;  /* angka metric di dashboard */
```

### Layout Komponen Utama

#### Sidebar
```
Lebar: 200px (desktop), collapsible
Background: --color-bg-sidebar
Logo area: 60px tinggi, nama "MetalTrack" + tagline "by Freemont"
Menu items: icon + label, highlight aktif dengan background --color-primary-light
User info: pojok bawah, nama + jabatan
```

#### Top Bar (per halaman)
```
Judul halaman (bold, --text-lg)
Subjudul/deskripsi (--text-sm, --color-text-secondary)
Kanan: nama user + tanggal/waktu
```

#### Cards Metric (Dashboard)
```
Padding: 20px
Border-radius: 8px
Shadow: 0 2px 8px rgba(0,0,0,0.08)
Angka besar: --text-xl, bold
Label: --text-sm, --color-text-secondary
Klik → navigasi ke halaman terkait
```

#### Tabel Data
```
Header: background --color-primary-dark, teks putih, --text-sm
Row: alternating #FFFFFF / #F8FAFC
Hover row: background #EFF3FB
Border: 1px solid --color-border
Cell padding: 10px 14px
Status: gunakan .status-badge dengan warna dari palette status
Aksi: tombol kecil "Lihat Detail" / "Edit"
```

#### Form Input
```
Label di atas input
Input border: 1px solid --color-border, radius 6px
Focus: border --color-primary-light, shadow 0 0 0 3px rgba(58,107,199,0.15)
Required field: asterisk merah di label
Submit: tombol solid --color-primary, teks putih
```

---

## 4. DATA BISNIS & KONTEN — REFERENSI SOP

### Jenis Material (konsisten di seluruh aplikasi)
```
Kode      Nama Lengkap              Warna Badge
SC-CU     Scrap Tembaga             #B87333 (copper tone)
SC-BR     Scrap Kuningan (Brass)    #CFB53B (brass tone)
SC-BZ     Scrap Perunggu (Bronze)   #CD7F32 (bronze tone)
SC-MX     Scrap Campuran            #9E9E9E (grey)
```

### Jenis Produk Jadi (Ingot)
```
Kode      Nama                      Yield Standar   Slag Tipikal
ING-CU    Ingot Tembaga             94%             5%
ING-BR    Ingot Kuningan            90%             8%
ING-BZ    Ingot Perunggu            92%             6%
```

### Format Nomor Dokumen (WAJIB konsisten)
```
Lot Bahan Baku:     FNM-LOT-[YYYYMM]-[NNN]     contoh: FNM-LOT-202505-001
Nomor Heat:         FNM-HEAT-[YYYYMM]-[NNN]    contoh: FNM-HEAT-202505-007
Delivery Order:     FNM-DO-[YYYYMM]-[NNN]      contoh: FNM-DO-202505-003
LMB Bulanan:        FNM-LMB-[YYYY]-[MM]        contoh: FNM-LMB-2025-05
Laporan Selisih:    FNM-SEL-[YYYYMM]-[NNN]     contoh: FNM-SEL-202505-002
```

### Supplier Dummy (untuk data demo)
```javascript
const suppliers = [
  { id: "SUP-001", name: "Sino Metal Resources Co., Ltd.", country: "China",    material: ["SC-CU", "SC-MX"] },
  { id: "SUP-002", name: "Hanwa Metal Corp.",               country: "Japan",    material: ["SC-BR", "SC-BZ"] },
  { id: "SUP-003", name: "Metal Management Asia Pte. Ltd.", country: "Singapore", material: ["SC-CU", "SC-BR"] },
  { id: "SUP-004", name: "Korea Zinc Trading Co.",          country: "Korea",    material: ["SC-BZ", "SC-MX"] },
];
```

### Customer Dummy (untuk data demo ekspor)
```javascript
const customers = [
  { id: "CST-001", name: "Taiwan Copper Industries Ltd.",   country: "Taiwan" },
  { id: "CST-002", name: "Yung Chi Metal Co., Ltd.",        country: "Taiwan" },
  { id: "CST-003", name: "Sumitomo Metal Industries",       country: "Japan"  },
];
```

### Yield Standar & Toleransi Selisih
```javascript
const yieldStandard = {
  "ING-CU": { min: 92, max: 96, slagTypical: 5 },
  "ING-BR": { min: 88, max: 93, slagTypical: 8 },
  "ING-BZ": { min: 90, max: 94, slagTypical: 6 },
};

const discrepancyThreshold = {
  timbang:    0.3,   // % — selisih timbang wajar
  pemilahan:  0.5,   // % — selisih setelah pemilahan
  yieldProd:  2.0,   // % — deviasi dari yield standar
  stokOpname: 0.5,   // % — selisih stock opname
  major:      2.0,   // % — eskalasi ke direktur
};
```

---

## 5. SPESIFIKASI HALAMAN PER MODUL

### 5.0 — index.html (Login)
**Tujuan:** Entry point. Kesan pertama profesional.
**Elemen:**
- Logo "Freemont MetalTrack" di tengah
- Tagline: "Sistem Pencatatan Mutasi Material — KB-Ready"
- Form login: username + password
- Nama perusahaan di footer: "PT. Fremont Nusa Metal Indonesia"
- Login langsung redirect ke `pages/dashboard.html` (tidak perlu validasi)
- User dummy: admin@freemont.com / password123

---

### 5.1 — dashboard.html
**Tujuan:** Ringkasan operasional harian. Satu pandangan, semua status kritis.

**Metric Cards (baris atas, 5 card):**
```
1. Penerimaan Hari Ini        → jumlah lot masuk hari ini
2. Pending Pemilahan          → lot yang belum dipilah
3. Heat Aktif / Dalam Proses  → jumlah heat sedang berjalan
4. Selisih Terdeteksi         → jumlah kasus selisih open
5. Stok Siap Ekspor (ton)     → total berat FG ready
```

**Tabel "Penerimaan Terkini":**
Kolom: No. Lot | Jenis Material | Supplier | Tgl Masuk | Berat (kg) | Status | Aksi

**Grafik (Chart.js, 2 grafik berdampingan):**
- Kiri: Bar chart "Material Masuk vs Output Ingot — 7 Hari Terakhir" (dua series: input BB dan output ingot, dalam ton)
- Kanan: Doughnut chart "Komposisi Produksi Bulan Ini" (Cu / Brass / Bronze dalam persen)

**Tabel "Heat Log Terkini":**
Kolom: No. Heat | Jenis Produk | Input BB (kg) | Output Ingot (kg) | Yield (%) | Status | Aksi
Yield di bawah standar → angka merah

**Widget "Rekonsiliasi Bulan Ini":**
Mini summary: Total BB Masuk | Total BB Diproses | Total Ingot Diproduksi | Total Ekspor | Selisih
Tombol "Lihat LMB Lengkap" → link ke reconciliation.html

---

### 5.2 — receiving.html
**Tujuan:** Daftar semua penerimaan bahan baku. Entry point data impor.

**Filter bar:** Jenis Material | Supplier | Status | Tanggal | Search

**Tabel:**
Kolom: No. Lot | No. PIB | Jenis Material | Supplier | Tgl Terima | Berat PIB (kg) | Berat Aktual (kg) | Selisih | Status | Aksi

**Status yang mungkin:**
- `Menunggu Pemilahan` (orange)
- `Sudah Dipilah` (blue)
- `Selisih Terdeteksi` (red)

**Tombol:** "Tambah Penerimaan Baru" → buka form inline atau modal

**Form Penerimaan Baru (modal):**
```
- No. PIB (auto-generate atau input manual)
- Supplier (dropdown dari data supplier)
- Jenis Material (dropdown: SC-CU / SC-BR / SC-BZ / SC-MX)
- Tanggal & Jam Kedatangan
- Berat Sesuai PIB/Invoice (kg)
- Berat Aktual Timbang (kg) — otomatis hitung selisih
- Nomor Surat Jalan Supplier
- Catatan (opsional)
- Submit → generate Nomor Lot otomatis
```

---

### 5.3 — receiving-detail.html
**Tujuan:** Detail lengkap satu lot penerimaan. Sama konsepnya dengan IndoSync receiving-detail.

**Sections:**
1. **Header:** Nomor Lot | Status badge | Tombol "Cetak Label QR"
2. **Informasi Umum:** No. PIB, Supplier, Jenis Material, Tgl Masuk, Berat PIB, Berat Aktual, Selisih
3. **Timeline Status:** Received → Pemilahan → Masuk Gudang BB (visual progress bar horizontal)
4. **Dokumen Terlampir:** tabel daftar dokumen (PIB.pdf, Surat Jalan, COA jika ada)
5. **Modal QR Label:** sama persis polanya seperti IndoSync — QR code + info singkat + tombol Print

**QR Code content:** JSON string `{"lot":"FNM-LOT-202505-001","material":"SC-CU","weight":1250,"supplier":"Sino Metal","date":"2025-05-09"}`

---

### 5.4 — sorting.html
**Tujuan:** Pencatatan hasil pemilahan per lot. TIDAK ADA DI INDOSYNC — halaman unik untuk Freemont.

**Konsep:** Setiap lot penerimaan perlu dipilah. Halaman ini menunjukkan daftar lot yang menunggu pemilahan dan mencatat hasilnya.

**Tabel "Menunggu Pemilahan":**
Kolom: No. Lot | Supplier | Tgl Terima | Berat Total (kg) | Status | Aksi ("Input Hasil Pemilahan")

**Form "Input Hasil Pemilahan" (modal/inline expandable):**
```
Nomor Lot: [read-only, dari data]
Berat Masuk (kg): [read-only, dari LPB]

--- Hasil Pemilahan ---
Scrap Tembaga (SC-CU):   [input kg]
Scrap Kuningan (SC-BR):  [input kg]
Scrap Perunggu (SC-BZ):  [input kg]
Scrap Campuran (SC-MX):  [input kg]
Berat Kontaminan:        [input kg]

Total Terpilah: [auto-sum] kg
Selisih vs Berat Masuk: [auto-calc] kg ([auto-calc]%)
Warning jika selisih > 0.5%

Operator: [input nama]
Tanggal & Jam: [datetime-local]
Catatan: [textarea]
[Simpan Hasil Pemilahan]
```

**Setelah disimpan:** Kartu Stok Gudang BB terupdate secara visual (bisa simulasi dengan update data JS).

---

### 5.5 — warehouse.html
**Tujuan:** Tampilan stok real-time gudang bahan baku (BB) dan produk jadi (FG) dalam satu halaman.

**Tab/Toggle:** "Gudang Bahan Baku" | "Gudang Produk Jadi" | "Slag & By-product"

**Tab Gudang BB:**
Kartu stok per jenis (4 kartu horizontal):
```
[SC-CU — Scrap Tembaga]
Saldo: 4.250 kg
Masuk Bulan Ini: 12.500 kg
Keluar ke Produksi: 8.250 kg
```
Di bawah kartu: tabel mutasi terbaru (10 baris terakhir per jenis)

**Tab Gudang FG:**
Kartu stok per jenis ingot (3 kartu):
```
[ING-CU — Ingot Tembaga]
Saldo: 2.100 kg
Diproduksi Bulan Ini: 8.820 kg
Diekspor Bulan Ini: 6.720 kg
```

**Tab Slag:**
Tabel sederhana: tanggal | sumber heat | berat slag (kg) | status (di gudang / sudah dikirim ke pengelola)

---

### 5.6 — heat-log.html
**Tujuan:** Daftar semua heat/siklus peleburan. HALAMAN KRITIS — paling unik untuk bisnis Freemont.

**Filter:** Jenis Produk | Status | Tanggal | Search

**Tabel:**
Kolom: No. Heat | Tanggal | Jenis Produk | Input BB (kg) | Output Ingot (kg) | Slag (kg) | Yield (%) | Status | Aksi

**Kolom Yield:** 
- Warna HIJAU jika dalam range standar
- Warna MERAH jika di luar range standar
- Tooltip saat hover: "Standar: 92%-96%"

**Status Heat:**
- `Dalam Proses` (blue)
- `Selesai — Yield OK` (green)
- `Selesai — Yield Rendah` (orange/red)

**Tombol:** "Buat Heat Baru" → buka form

**Form "Buat Heat Baru" (modal):**
```
Nomor Heat: [auto-generate]
Jenis Produk Target: [dropdown: ING-CU / ING-BR / ING-BZ]
Nomor Lot BB Digunakan: [multi-select dari stok tersedia di gudang BB]
Berat Input BB (kg): [auto-fill dari lot dipilih, bisa override]
Operator Tungku: [input]
Kepala Shift: [input]
Tanggal & Waktu Mulai: [datetime-local]
Catatan: [textarea]
[Mulai Heat]
```

---

### 5.7 — heat-log-detail.html
**Tujuan:** Detail satu heat — input, output, kalkulasi yield, neraca massa.

**Sections:**
1. **Header:** No. Heat | Jenis Produk | Status badge
2. **Input Bahan Baku:**
   Tabel: No. Lot BB | Jenis | Berat Digunakan (kg)
   Total Input: [sum]
3. **Output Produksi:**
   ```
   Berat Ingot OK (kg):      [input / display]
   Berat Ingot Reject (kg):  [input / display]
   Berat Slag (kg):          [input / display]
   Berat Returns/Sisa (kg):  [input / display]
   ```
4. **Kalkulasi Yield (VISUAL, auto-kalkulasi):**
   ```
   ┌─────────────────────────────────────────────┐
   │  INPUT                                       │
   │  Total BB Masuk Tungku:    5.200 kg  (100%)  │
   │                                              │
   │  OUTPUT                                      │
   │  Ingot OK:                 4.810 kg  (92.5%) │ ← hijau jika OK
   │  Ingot Reject:                50 kg  ( 0.9%) │
   │  Slag:                       280 kg  ( 5.4%) │
   │  Returns/Sisa:                45 kg  ( 0.9%) │
   │  Penguapan/Susut:             15 kg  ( 0.3%) │
   │  ─────────────────────────────────────────── │
   │  Total Output:             5.200 kg  (100%)  │
   │                                              │
   │  YIELD FINAL:  92.5%  [■■■■■■■■■□□] ✓ OK    │
   │  Standar:      92%–96%                       │
   └─────────────────────────────────────────────┘
   ```
5. **Timeline:** Mulai → Charging → Pouring → Selesai (timestamps)
6. **Dokumen:** Log sheet yang bisa di-download (simulasi)
7. **Tombol:** "Input Hasil Produksi" (jika status masih dalam proses)

---

### 5.8 — production.html
**Tujuan:** Pencatatan hasil pencetakan ingot dan inspeksi visual per heat.

**Tabel:**
Kolom: No. Heat | Jenis | Jumlah Pieces | Berat Total (kg) | Hasil Inspeksi | Status | Aksi

**Form "Input Hasil Pencetakan" (inline expand):**
```
No. Heat: [read-only]
Jumlah Pieces Ingot: [number]
Berat Total Ingot (kg): [number]
Berat Ingot Reject (kg): [number]
Berat Returns/Sisa (kg): [number]
Hasil Inspeksi Visual: [OK / Ada Cacat Minor / Ada Cacat Mayor]
Catatan Cacat (jika ada): [textarea]
Label Batch: [auto-generate: FNM-BATCH-YYYYMM-NNN]
Operator: [input]
[Simpan & Update Stok FG]
```

---

### 5.9 — export.html
**Tujuan:** Pencatatan pengiriman ekspor. Mengurangi stok FG, generate Delivery Order.

**Tabel "Riwayat Ekspor":**
Kolom: No. DO | No. PEB | Customer | Jenis Ingot | Berat (kg) | Tgl Kirim | Status | Aksi

**Form "Input Pengiriman Ekspor" (modal):**
```
Nomor DO: [auto-generate]
Customer: [dropdown]
Nomor PO Customer: [input]
Nomor PEB: [input]
Jenis Ingot: [dropdown: ING-CU / ING-BR / ING-BZ]
Berat Sesuai PEB (kg): [number]
Berat Final Timbang (kg): [number — bisa berbeda kecil dari PEB]
Nomor Kontainer: [input]
Nomor Seal: [input]
Tanggal Pengiriman: [date]
[Simpan & Kurangi Stok FG]
```

---

### 5.10 — reconciliation.html
**Tujuan:** Laporan Mutasi Barang (LMB) bulanan. HALAMAN PALING PENTING untuk auditor bea cukai.

**Selector:** Pilih Bulan | Tahun → [Generate LMB]

**Tampilan LMB (sesuai format SOP-08, 6 seksi A-F):**

```
┌── LAPORAN MUTASI BARANG (LMB) ─────────────────────────────────┐
│  Periode: Mei 2025 | PT. Fremont Nusa Metal Indonesia           │
│  No. LMB: FNM-LMB-2025-05                                      │
├─────────────────────────────────────────────────────────────────┤
│  A. PEMASUKAN BAHAN BAKU                                        │
│  ┌──────────────┬───────────┬──────────┬──────────┬──────────┐ │
│  │ Jenis        │ No. PIB   │ Supplier │ Tgl      │ Berat kg │ │
│  ├──────────────┼───────────┼──────────┼──────────┼──────────┤ │
│  │ SC-CU        │ PIB-...   │ Sino Met │ 02/05    │ 12.500   │ │
│  │ ...          │           │          │          │          │ │
│  │ TOTAL                                           │ 38.200   │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  B. PEMAKAIAN BAHAN BAKU (ke produksi)          38.100 kg     │
│  C. HASIL PRODUKSI (ingot jadi)                 35.050 kg     │
│  D. PENGELUARAN EKSPOR                          32.400 kg     │
│  E. SALDO AKHIR BB: 100 kg | FG: 2.650 kg                    │
│                                                                 │
│  F. NERACA KONVERSI                                            │
│     Yield Aktual: 92.2% | Yield Standar: ~92% | Status: ✓ OK │
│     Selisih Tidak Terjelaskan: 0.3% — dalam toleransi         │
├─────────────────────────────────────────────────────────────────┤
│  [Export PDF]  [Export Excel]  [Cetak]                         │
└─────────────────────────────────────────────────────────────────┘
```

Export PDF/Excel: simulasi dengan `window.print()` atau download file dummy.

---

### 5.11 — discrepancy.html
**Tujuan:** Daftar semua kasus selisih yang terdeteksi.

**Filter:** Jenis Selisih | Status | Tanggal

**Tabel:**
Kolom: No. Kasus | Jenis Selisih | Referensi (No. Lot/Heat) | Besar Selisih (kg / %) | Status | Prioritas | Aksi

**Status:**
- `Open` (red)
- `Dalam Investigasi` (orange)
- `Closed` (green)

**Prioritas:**
- `Normal` jika ≤ threshold
- `Eskalasi` jika > threshold (ditandai icon ⚠️)

---

### 5.12 — discrepancy-detail.html
**Tujuan:** Detail investigasi satu kasus selisih.

**Sections:**
1. Info kasus: jenis, besar selisih, tanggal, referensi dokumen
2. Klasifikasi (sesuai SOP-09): Selisih Timbang / Pemilahan / Yield / Stok Opname / Major
3. Analisis penyebab (form textarea jika open)
4. Tindakan yang ditetapkan (dropdown + textarea)
5. Status & history perubahan status
6. Tombol "Tutup Kasus" (jika sudah resolved)

---

### 5.13 — audit-trail.html
**Tujuan:** Log semua aktivitas sistem. Transparansi untuk auditor.

**Tab:** "Semua Aktivitas" | "Penerimaan" | "Produksi" | "Ekspor" | "Rekonsiliasi"

**Tabel:**
Kolom: Timestamp | Aktivitas | Referensi Dokumen | Dilakukan Oleh | Detail

Contoh baris:
```
2025-05-09 08:32  | Penerimaan dicatat    | FNM-LOT-202505-001 | Admin Gudang    | SC-CU 1.250 kg dari Sino Metal
2025-05-09 10:15  | Pemilahan selesai     | FNM-LOT-202505-001 | Operator Line 1 | SC-CU 1.230 kg, Kontaminan 20 kg
2025-05-09 13:00  | Heat dimulai          | FNM-HEAT-202505-007| Operator Tungku | Input 4.800 kg → ING-CU
2025-05-09 16:45  | Heat selesai          | FNM-HEAT-202505-007| Operator Tungku | Output 4.430 kg, Yield 92.3%
```

---

## 6. DATA DUMMY — SEED DATA

Buat data dummy yang cukup untuk membuat prototype terkesan "sudah berjalan". Gunakan data ini sebagai basis tampilan awal di semua halaman.

```javascript
// Contoh struktur — kembangkan sendiri hingga ~20 baris per tabel utama
const seedData = {
  receivingList: [
    {
      lotNo: "FNM-LOT-202505-001", pibNo: "PIB-2025-00089",
      supplier: "Sino Metal Resources Co., Ltd.", material: "SC-CU",
      dateIn: "2025-05-02 08:30", weightPIB: 12500, weightActual: 12480,
      status: "Sudah Dipilah"
    },
    {
      lotNo: "FNM-LOT-202505-002", pibNo: "PIB-2025-00090",
      supplier: "Hanwa Metal Corp.", material: "SC-BR",
      dateIn: "2025-05-04 10:15", weightPIB: 8000, weightActual: 7985,
      status: "Sudah Dipilah"
    },
    {
      lotNo: "FNM-LOT-202505-003", pibNo: "PIB-2025-00091",
      supplier: "Metal Management Asia Pte. Ltd.", material: "SC-CU",
      dateIn: "2025-05-06 14:00", weightPIB: 15000, weightActual: 14950,
      status: "Menunggu Pemilahan"
    },
    // ... tambah sampai 15-20 baris
  ],

  heatLogList: [
    {
      heatNo: "FNM-HEAT-202505-001", product: "ING-CU",
      inputKg: 5200, outputKg: 4810, slagKg: 280, yieldPct: 92.5,
      date: "2025-05-03", status: "Selesai — Yield OK"
    },
    {
      heatNo: "FNM-HEAT-202505-002", product: "ING-BR",
      inputKg: 4800, outputKg: 4230, slagKg: 420, yieldPct: 88.1,
      date: "2025-05-04", status: "Selesai — Yield OK"
    },
    {
      heatNo: "FNM-HEAT-202505-006", product: "ING-CU",
      inputKg: 5500, outputKg: 4840, slagKg: 310, yieldPct: 88.0,
      date: "2025-05-08", status: "Selesai — Yield Rendah" // di bawah standar 92%
    },
    // ... tambah sampai ~10 heat
  ],

  exportList: [
    {
      doNo: "FNM-DO-202505-001", pebNo: "PEB-2025-00112",
      customer: "Taiwan Copper Industries Ltd.", product: "ING-CU",
      weightKg: 14500, dateShip: "2025-05-10", status: "Dikirim"
    },
    // ... tambah 5-8 baris
  ],

  discrepancyList: [
    {
      caseNo: "FNM-SEL-202505-001", type: "Yield Produksi",
      ref: "FNM-HEAT-202505-006", discKg: 220, discPct: 4.0,
      status: "Open", priority: "Eskalasi"
    },
    // ... tambah 3-5 baris
  ]
};
```

---

## 7. POLA NAVIGASI & STATE MANAGEMENT

### Navigasi Antar Halaman
```javascript
// Gunakan query parameter untuk passing ID antar halaman
// Contoh: receiving-detail.html?lot=FNM-LOT-202505-001
// Di halaman detail, baca dengan:
const params = new URLSearchParams(window.location.search);
const lotNo = params.get('lot');
// Lalu cari di seedData.receivingList
```

### Active State Sidebar
```javascript
// Di setiap halaman, detect halaman aktif dari window.location
// Tambahkan class 'active' ke menu item yang sesuai
```

### Simulasi Interaksi (penting untuk demo)
- Form submit → update data di JS in-memory → re-render tabel → tampilkan notifikasi sukses
- Status badge berubah secara visual setelah aksi
- Metric card di dashboard terupdate
- Tidak perlu persistensi (localStorage opsional, tapi tidak wajib)

---

## 8. KOMPONEN REUSABLE

Berikut komponen yang harus konsisten tampilannya di seluruh aplikasi:

### Status Badge
```javascript
function renderStatusBadge(status) {
  const map = {
    "Menunggu Pemilahan":    { bg: "#FFF3E0", color: "#E07B39" },
    "Sudah Dipilah":         { bg: "#E3F2FD", color: "#1565C0" },
    "Selisih Terdeteksi":    { bg: "#FFEBEE", color: "#C0392B" },
    "Dalam Proses":          { bg: "#E3F2FD", color: "#1565C0" },
    "Selesai — Yield OK":    { bg: "#E8F5E9", color: "#2D8A4E" },
    "Selesai — Yield Rendah":{ bg: "#FFEBEE", color: "#C0392B" },
    "Open":                  { bg: "#FFEBEE", color: "#C0392B" },
    "Closed":                { bg: "#E8F5E9", color: "#2D8A4E" },
    "Dikirim":               { bg: "#E8F5E9", color: "#2D8A4E" },
  };
  const s = map[status] || { bg: "#F3F4F6", color: "#6B7280" };
  return `<span class="status-badge" style="background:${s.bg};color:${s.color};padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600">${status}</span>`;
}
```

### Notifikasi Toast
```javascript
function showToast(message, type = "success") {
  // type: "success" | "warning" | "error"
  // Muncul pojok kanan bawah, auto-dismiss 3 detik
}
```

### Konfirmasi Modal
```javascript
function showConfirm(message, onConfirm) {
  // Modal konfirmasi sederhana sebelum aksi destruktif
}
```

---

## 9. URUTAN PENGERJAAN YANG DISARANKAN

Bangun halaman dalam urutan berikut agar setiap sesi kerja menghasilkan sesuatu yang bisa di-demo:

```
Sesi 1:  index.html + main.css (layout, sidebar, palette, komponen dasar)
Sesi 2:  dashboard.html (metric cards + tabel + chart)
Sesi 3:  receiving.html + receiving-detail.html + QR label modal
Sesi 4:  heat-log.html + heat-log-detail.html (kalkulasi yield)
Sesi 5:  sorting.html + warehouse.html
Sesi 6:  production.html + export.html
Sesi 7:  reconciliation.html (LMB — halaman paling kompleks)
Sesi 8:  discrepancy.html + discrepancy-detail.html
Sesi 9:  audit-trail.html
Sesi 10: Polish — responsiveness, animasi, edge cases, review menyeluruh
```

---

## 10. CATATAN PENTING UNTUK AI

1. **Jangan mulai dari scratch setiap sesi.** Selalu baca CLAUDE.md ini dulu, lalu baca file yang akan dimodifikasi sebelum menulis kode baru.

2. **Konsistensi warna dan komponen adalah prioritas utama.** Jika ragu tentang warna atau ukuran, cek Bagian 3 terlebih dahulu.

3. **Jangan improvise konten bisnis.** Semua terminologi (nama jenis material, format nomor dokumen, nilai yield standar, batas toleransi selisih) harus sesuai Bagian 4. Jangan mengubah sendiri.

4. **Halaman heat-log-detail.html adalah show-stopper.** Kalkulasi yield dan neraca massa di halaman ini harus benar secara logika dan menarik secara visual. Prioritaskan kualitas ekstra di sini.

5. **Data dummy harus terasa realistis.** Gunakan nama supplier, nomor dokumen, dan angka yang konsisten antar halaman. Ingot yang diproduksi di heat-log harus muncul sebagai stok di warehouse, dan stok yang diekspor di export.html harus mengurangi saldo tersebut.

6. **Reconciliation.html adalah halaman untuk auditor.** Layout harus bersih, tabel harus mudah dibaca, angka total harus match secara logika. Ini yang akan dilihat pertama kali oleh tim bea cukai saat demo.

7. **Jangan gunakan alert() untuk notifikasi.** Selalu gunakan komponen toast yang didefinisikan di Bagian 8.

8. **Mobile responsiveness adalah bonus, bukan prioritas.** Fokus desktop (min-width: 1200px) dulu.

---

*Dokumen ini dibuat oleh Crooud untuk proyek PT. Fremont Nusa Metal Indonesia.*
*Versi: 1.0 | Mei 2025*
