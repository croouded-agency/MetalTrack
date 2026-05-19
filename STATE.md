# STATE.md — Freemont MetalTrack
## Status Pengerjaan Prototype

> **Cara pakai dokumen ini:**
> Setiap kali sesi baru dimulai, AI wajib membaca `CLAUDE.md` + `STATE.md` ini sebelum menulis kode apapun.
> Setiap kali sesi selesai atau konteks hampir habis, AI wajib mengupdate STATE.md ini sebelum berhenti.
>
> Format update: pindahkan task dari `[ ]` ke `[x]`, tambahkan catatan di bagian "Log Sesi", dan update "Konteks Aktif".

---

## STATUS KESELURUHAN

```
Total Halaman : 13 halaman + 1 entry point
Selesai       : 0 / 14
Progress      : 0%
Fase          : Belum mulai — siap dikerjakan
```

---

## CHECKLIST PENGERJAAN

### Fondasi (harus selesai pertama)
- [ ] `assets/css/main.css` — layout dasar, sidebar, palette, semua komponen reusable (badge, toast, modal, tabel, form)
- [ ] `assets/js/main.js` — seed data lengkap, fungsi reusable (renderStatusBadge, showToast, showConfirm, navigasi)
- [ ] `index.html` — halaman login

### Halaman Utama
- [ ] `pages/dashboard.html` — metric cards, tabel penerimaan terkini, 2 grafik Chart.js, widget rekonsiliasi
- [ ] `pages/receiving.html` — daftar penerimaan + filter + form tambah baru (modal)
- [ ] `pages/receiving-detail.html` — detail lot + timeline + dokumen + modal QR label
- [ ] `pages/sorting.html` — daftar menunggu pemilahan + form input hasil pemilahan
- [ ] `pages/warehouse.html` — 3 tab: Gudang BB / Gudang FG / Slag
- [ ] `pages/heat-log.html` — daftar heat + filter + form buat heat baru
- [ ] `pages/heat-log-detail.html` — detail heat + neraca massa visual + kalkulasi yield
- [ ] `pages/production.html` — pencatatan hasil cetak ingot + inspeksi
- [ ] `pages/export.html` — riwayat ekspor + form input pengiriman
- [ ] `pages/reconciliation.html` — LMB bulanan format 6 seksi A-F + export simulasi
- [ ] `pages/discrepancy.html` — daftar kasus selisih + filter
- [ ] `pages/discrepancy-detail.html` — detail investigasi + form tindakan
- [ ] `pages/audit-trail.html` — log aktivitas + tab per kategori

### Polish & Finalisasi
- [ ] Konsistensi visual lintas halaman (warna, spacing, font)
- [ ] Interaksi form → update data in-memory → re-render tabel
- [ ] Navigasi antar halaman via query parameter berfungsi
- [ ] Semua angka di dashboard konsisten dengan seed data
- [ ] Review menyeluruh sebelum demo

---

## KONTEKS AKTIF

```
Halaman sedang dikerjakan : —
File terakhir dimodifikasi : —
Masalah yang belum selesai : —
Keputusan yang perlu dikonfirmasi ke Ahmad : —
```

---

## KEPUTUSAN DESAIN YANG SUDAH DIKUNCI

Bagian ini mencatat keputusan yang sudah disetujui Ahmad dan TIDAK boleh diubah oleh AI tanpa konfirmasi ulang.

| # | Keputusan | Tanggal |
|---|-----------|---------|
| 1 | Stack: pure HTML/CSS/JS vanilla, tanpa framework | Mei 2025 |
| 2 | CDN diizinkan: Chart.js + QRCode.js saja | Mei 2025 |
| 3 | Semua 9 SOP masuk MVP (13 halaman + index) | Mei 2025 |
| 4 | Nama aplikasi: Freemont MetalTrack | Mei 2025 |
| 5 | heat-log-detail.html harus punya neraca massa visual dengan kalkulasi yield otomatis | Mei 2025 |
| 6 | reconciliation.html menggunakan format LMB 6 seksi (A–F) sesuai SOP-08 | Mei 2025 |
| 7 | Color primary: #1B2A4A (sidebar) / #2E4A7A (primary) / #3A6BC7 (accent) | Mei 2025 |
| 8 | Mobile responsiveness adalah bonus, fokus desktop min-width 1200px | Mei 2025 |

---

## LOG SESI

### Sesi 0 — Persiapan Dokumen
**Tanggal:** Mei 2025
**Dikerjakan:**
- Finalisasi SOP PT. Fremont Nusa Metal Indonesia (9 modul, format docx)
- Pembuatan CLAUDE.md — panduan lengkap pengembangan prototype
- Pembuatan STATE.md ini

**Belum dikerjakan:** Semua kode prototype

**Catatan:**
- SOP tersimpan di: `SOP_PT_Fremont_Nusa_Metal_Indonesia.docx`
- CLAUDE.md dan STATE.md siap digunakan di root project
- Seed data awal sudah didefinisikan di CLAUDE.md Bagian 6 — kembangkan hingga ~20 baris per tabel saat memulai main.js

### Sesi 1 — Orientasi Repo
**Tanggal:** 19 Mei 2026
**Dikerjakan:**
- Membaca instruksi global `RTK.md`
- Membaca `CLAUDE.md`, `STATE.md`, SOP utama di `_DOCS/`, dan skill lokal di `SKILLS/`
- Memetakan status repo: belum ada file aplikasi HTML/CSS/JS, baru dokumen perencanaan

**Masalah ditemukan:**
- Folder ini belum terinisialisasi sebagai git repository

**Belum selesai / perlu dilanjutkan:**
- Mulai fondasi sesuai urutan: `assets/css/main.css`, `assets/js/main.js`, lalu `index.html`

**Catatan untuk sesi berikutnya:**
- Semua command shell harus diprefix `rtk` sesuai `RTK.md`; untuk PowerShell cmdlet gunakan `rtk powershell -NoProfile -Command "..."`

---

<!-- TEMPLATE UNTUK SESI BERIKUTNYA — copy-paste dan isi:

### Sesi [N] — [Judul Singkat]
**Tanggal:** [tanggal]
**Dikerjakan:**
- [file yang dibuat/dimodifikasi]
- [fitur yang selesai]

**Masalah ditemukan:**
- [bug atau keputusan yang harus diambil]

**Belum selesai / perlu dilanjutkan:**
- [task yang setengah jalan]

**Catatan untuk sesi berikutnya:**
- [hal penting yang harus diingat AI di sesi berikut]

-->
