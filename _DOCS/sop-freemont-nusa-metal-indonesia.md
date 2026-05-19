# SOP Pencatatan Mutasi Material

## Metadata Dokumen

| Field | Value |
|---|---|
| Company | PT. Fremont Nusa Metal Indonesia |
| Industry | Peleburan Logam Non-Besi |
| Document Type | Standar Prosedur Operasional |
| System | Sistem Pencatatan Mutasi Material |
| Document Number | FNM-SOP-001 |
| Revision | Rev. 00 |
| Release Date | Mei 2026 |
| Status | DRAFT — Untuk Tinjauan Internal |

> Dokumen ini dirancang KB-Ready menuju Kawasan Berikat.

---

# 1. Tujuan dan Ruang Lingkup

## 1.1 Tujuan

SOP ini bertujuan untuk:

- menetapkan tata cara pencatatan mutasi material secara sistematis dan akurat
- memastikan seluruh pergerakan barang terdokumentasi dan dapat diverifikasi
- membangun fondasi pencatatan sesuai persyaratan Kawasan Berikat DJBC
- menyediakan dasar implementasi IT Inventory berbasis digital

## 1.2 Ruang Lingkup

SOP mencakup:

- penerimaan bahan baku scrap logam non-besi impor
- pemilahan dan penimbangan material
- pengelolaan gudang bahan baku
- proses peleburan dan pencetakan ingot
- pencatatan yield konversi
- pengelolaan produk jadi
- pengiriman ekspor
- penanganan slag/by-product
- rekonsiliasi mutasi material

## 1.3 Catatan KB-Ready

SOP disusun mengacu pada:

- PMK No. 65/PMK.04/2021
- persyaratan IT Inventory DJBC
- kebutuhan integrasi Kawasan Berikat

---

# 2. Referensi dan Dasar Hukum

| Regulasi | Keterangan |
|---|---|
| PMK No. 65/PMK.04/2021 | Kawasan Berikat & IT Inventory |
| PMK No. 200/PMK.04/2019 | Tata laksana kepabeanan ekspor |
| UU No. 17 Tahun 2006 | Kepabeanan |
| PP No. 32 Tahun 2009 jo. PP No. 85 Tahun 2021 | Pengelolaan lingkungan hidup |
| SNI Logam Non-Besi | Standar mutu ingot |

---

# 3. Definisi dan Istilah

| Istilah | Definisi |
|---|---|
| Scrap | Bahan baku logam non-besi impor |
| Heat / Charge | Satu siklus peleburan |
| Ingot | Produk jadi hasil peleburan |
| Slag / Terak | Residu non-logam hasil peleburan |
| Dross | Lapisan oksida logam |
| Yield / Rendemen | Rasio output terhadap input |
| Mutasi Material | Pergerakan stok/material |
| LPB | Laporan Penerimaan Barang |
| PIB | Pemberitahuan Impor Barang |
| PEB | Pemberitahuan Ekspor Barang |
| KB | Kawasan Berikat |
| IT Inventory | Sistem pencatatan digital DJBC |

---

# SOP-01 — Penerimaan Material (Incoming)

## Metadata SOP

| Field | Value |
|---|---|
| SOP Number | FNM-SOP-001-01 |
| PIC | Admin / Kepala Gudang |
| Related Docs | PIB, Invoice, Packing List, COO |
| Form | FNM-F-001 (LPB) |

## Alur Proses

### 1. Notifikasi Kedatangan

- supplier/freight forwarder menginformasikan jadwal kedatangan
- admin mencatat pada log penerimaan

### 2. Pemeriksaan Dokumen Kepabeanan

Verifikasi:

- PIB
- Commercial Invoice
- Packing List
- Bill of Lading
- Certificate of Origin

### 3. Penimbangan Bruto

Catat:

- berat kendaraan
- berat muatan
- berat neto

### 4. Pemeriksaan Fisik Material

Pastikan:

- tidak tercampur material lain
- bebas kontaminan B3
- sesuai spesifikasi pembelian

### 5. Pemberian Label Lot

Format:

```txt
FNM-LOT-[YYYYMM]-[NNN]
```

Contoh:

```txt
FNM-LOT-202505-001
```

### 6. Pembuatan LPB

Isi LPB:

- nomor lot
- tanggal terima
- supplier
- nomor PIB
- jenis material
- berat bruto/neto

### 7. Area Karantina

- material ditempatkan di area karantina
- tidak boleh masuk produksi sebelum pemilahan

## Ketentuan Tambahan

- pemeriksaan maksimal 2x24 jam
- ketidaksesuaian wajib didokumentasikan
- seluruh data dicatat di hari yang sama

---

# SOP-02 — Pemilahan dan Penimbangan Material

## Metadata SOP

| Field | Value |
|---|---|
| SOP Number | FNM-SOP-001-02 |
| PIC | Operator Produksi / Kepala Gudang |
| Form | FNM-F-002 |

## Tahapan

1. pengambilan material dari area karantina
2. pemilahan berdasarkan jenis logam
3. pemisahan kontaminan
4. penimbangan per kategori
5. rekonsiliasi berat
6. update kartu stok gudang

## Kategorisasi Material

| Kode | Jenis | Tujuan |
|---|---|---|
| SC-CU | Scrap Tembaga | Peleburan Tembaga |
| SC-BR | Scrap Kuningan | Peleburan Kuningan |
| SC-BZ | Scrap Perunggu | Peleburan Perunggu |
| SC-MX | Scrap Campuran | Analisis lanjut |

---

# SOP-03 — Manajemen Gudang Bahan Baku

## Metadata SOP

| Field | Value |
|---|---|
| SOP Number | FNM-SOP-001-03 |
| PIC | Kepala Gudang |
| Form | FNM-F-003 |

## Proses

### Material Masuk

Catatan:

- tanggal
- nomor lot
- jenis
- berat masuk
- saldo

### Penempatan Material

- berdasarkan zona
- menggunakan prinsip FIFO

### Material Keluar ke Produksi

Harus disertai:

- Surat Perintah Produksi (SPP)

### Stock Opname

- dilakukan mingguan
- dibandingkan dengan kartu stok

### Pelaporan Harian

Admin merekap:

- saldo awal
- material masuk
- material keluar
- saldo akhir

---

# SOP-04 — Proses Peleburan (Smelting)

## Metadata SOP

| Field | Value |
|---|---|
| SOP Number | FNM-SOP-001-04 |
| PIC | Operator Tungku / Kepala Shift |
| Form | FNM-F-004 (Log Heat) |

## Tahapan

1. penerbitan SPP
2. pengambilan material
3. charging tungku
4. proses peleburan
5. pemisahan slag/dross
6. pouring
7. pencatatan yield

## Format Nomor Heat

```txt
FNM-HEAT-[YYYYMM]-[NNN]
```

Contoh:

```txt
FNM-HEAT-202505-001
```

## Formula Yield

```txt
Yield (%) = (Berat Output Cair / Berat Input) x 100%
```

## Data Utama Log Heat

- nomor heat
- tanggal & shift
- jenis produk
- nomor lot bahan baku
- berat input
- berat slag
- berat output
- yield
- operator
- verifikasi kepala shift

---

# SOP-05 — Pencetakan dan Inspeksi Produk Jadi

## Metadata SOP

| Field | Value |
|---|---|
| SOP Number | FNM-SOP-001-05 |
| PIC | Operator / QC |
| Form | FNM-F-005 |

## Tahapan

1. pendinginan cetakan
2. demoulding
3. pembersihan/pemotongan
4. penimbangan produk jadi
5. inspeksi visual
6. labeling produk
7. update laporan produksi

## Formula Yield Final

```txt
Yield Final (%) = Berat Ingot OK / Berat Input BB x 100%
```

## Neraca Kontrol

```txt
Berat Input =
Ingot OK +
Ingot Reject +
Slag +
Returns +
Kontaminan ± Toleransi Penguapan
```

---

# SOP-06 — Manajemen Gudang Produk Jadi

## Metadata SOP

| Field | Value |
|---|---|
| SOP Number | FNM-SOP-001-06 |
| PIC | Kepala Gudang / Admin |
| Form | FNM-F-006 |

## Aktivitas

- penerimaan dari produksi
- pencatatan stok masuk
- penempatan per zona alloy
- alokasi order ekspor
- pengelolaan slag/by-product
- stock opname mingguan

---

# SOP-07 — Pengiriman dan Ekspor

## Metadata SOP

| Field | Value |
|---|---|
| SOP Number | FNM-SOP-001-07 |
| PIC | Admin / Kepala Gudang |
| Form | FNM-F-007 |

## Tahapan

1. konfirmasi PO ekspor
2. persiapan dokumen ekspor
3. final weighing
4. pengurangan stok
5. loading kontainer
6. pengarsipan dokumen

## Dokumen Ekspor

- Packing List
- Commercial Invoice
- PEB
- COO
- Bill of Lading

---

# SOP-08 — Rekonsiliasi dan Pelaporan Mutasi

## Metadata SOP

| Field | Value |
|---|---|
| SOP Number | FNM-SOP-001-08 |
| PIC | Admin / Kepala Operasional |
| Form | FNM-F-008 |
| Frekuensi | Harian & Bulanan |

## Rekonsiliasi Harian

Meliputi:

- mutasi gudang bahan baku
- produksi harian
- gudang produk jadi
- verifikasi neraca

## Laporan Mutasi Barang (LMB)

### Struktur LMB

| Seksi | Isi |
|---|---|
| A | Pemasukan bahan baku |
| B | Pemakaian bahan baku |
| C | Hasil produksi |
| D | Pengeluaran produk jadi |
| E | Saldo akhir |
| F | Neraca konversi |

## Catatan KB-Ready

Format LMB dirancang sesuai:

- PMK 65/2021 Pasal 60
- kebutuhan audit DJBC
- persyaratan Kawasan Berikat

---

# SOP-09 — Penanganan Selisih dan Ketidaksesuaian

## Metadata SOP

| Field | Value |
|---|---|
| SOP Number | FNM-SOP-001-09 |
| PIC | Admin / Kepala Operasional |
| Eskalasi | Direktur (>2%) |
| Form | FNM-F-009 |

## Klasifikasi Selisih

| Jenis | Toleransi | Eskalasi |
|---|---|---|
| Selisih timbang | ≤ 0,3% | Tidak perlu |
| Selisih pemilahan | ≤ 0,5% | Kepala Gudang |
| Selisih yield | ± 2% | Kepala Operasional |
| Selisih stock opname | ≤ 0,5% | Kepala Operasional |
| Selisih besar | > 2% | Direktur + DJBC |

## Alur Penanganan

1. identifikasi selisih
2. analisis penyebab
3. penetapan tindakan
4. dokumentasi & closure
5. monitoring berulang

---

# Lampiran

## L-1 — Master List Form

| Form | Nama |
|---|---|
| FNM-F-001 | LPB |
| FNM-F-001b | Ketidaksesuaian Incoming |
| FNM-F-002 | Form Pemilahan |
| FNM-F-003 | Kartu Stok BB |
| FNM-F-004 | Log Heat |
| FNM-F-005 | Laporan Produksi |
| FNM-F-006 | Kartu Stok FG |
| FNM-F-006b | Log Slag |
| FNM-F-007 | Delivery Order |
| FNM-F-008 | LMB Bulanan |
| FNM-F-009 | Laporan Selisih |

---

## L-2 — Format Nomor Dokumen

| Dokumen | Format |
|---|---|
| Lot BB | FNM-LOT-[YYYYMM]-[NNN] |
| Heat | FNM-HEAT-[YYYYMM]-[NNN] |
| DO Ekspor | FNM-DO-[YYYYMM]-[NNN] |
| LMB | FNM-LMB-[YYYY]-[MM] |
| Laporan Selisih | FNM-SEL-[YYYYMM]-[NNN] |

---

## L-3 — Referensi Yield Standar

| Alloy | Yield | Slag |
|---|---|---|
| Tembaga | 92–96% | 3–6% |
| Kuningan | 88–93% | 5–9% |
| Perunggu | 90–94% | 4–8% |

---

# Roadmap Implementasi Menuju Kawasan Berikat

| Fase | Periode | Aktivitas |
|---|---|---|
| 1 | Bulan 1–2 | Implementasi manual |
| 2 | Bulan 2–4 | Digitalisasi IT Inventory |
| 3 | Bulan 4–6 | Full digital & validasi |
| 4 | Bulan 6+ | Pengajuan Kawasan Berikat |
