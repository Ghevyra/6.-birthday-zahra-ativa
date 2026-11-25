# AMARA — Surat Ulang Tahun Digital
Panduan edit cepat (buat kamu yang mau custom / jual ulang)

## 📁 Struktur folder
```
birthday-website/
├── index.html          → isi teks, nama, urutan slide
├── css/style.css        → semua warna, font, ukuran, animasi
├── js/script.js         → durasi tiap slide & teks surat (slide 4)
├── images/               → SEMUA foto ganti di sini
└── audio/song.mp3        → lagu latar (masih placeholder senyap)
```
Buka `index.html` pakai Live Server (Blackbox AI / VS Code) seperti biasa.

---

## 1. Ganti foto
Tinggal timpa (replace) file di folder `images/` dengan nama file yang SAMA
persis, ukurannya tidak perlu pas — foto akan otomatis menyesuaikan (crop rapi).

| Nama file                     | Dipakai di slide         | Rekomendasi ukuran |
|--------------------------------|---------------------------|---------------------|
| `slide2-photo.jpg`             | Amplop (peek) + Slide 1 (foto kedip) | 800×1000 px, wajah menghadap depan |
| `slide6-main.jpg`              | Slide 5 — foto besar       | 1000×1300 px |
| `slide6-collage-1/2/3.jpg`     | Slide 5 — 3 foto kecil     | 500×500 px |
| `slide7-film-1..5.jpg`         | Slide 6 — strip film       | 400×500 px |
| `slide9-1/2/3.jpg`             | Slide terakhir (I·Love·You)| 500×700 px |

> **Efek mata berkedip** di Slide 1 memakai overlay posisi persentase (bukan
> deteksi wajah asli), supaya pas dengan fotomu, atur posisinya di
> `css/style.css` cari class `.eyelid` → ubah `top`, `left`, `right`.
> Default sudah pas untuk foto wajah menghadap kamera & terpusat.

---

## 2. Ganti lagu latar 🎵
File `audio/song.mp3` saat ini **senyap (placeholder)** — karena saya tidak
bisa mengunduh audio dari YouTube (hak cipta & sistem tidak mengizinkan
pengambilan audio dari YouTube secara langsung).

Cara pasang lagu pilihanmu:
1. Siapkan file mp3 lagu yang kamu punya hak pakainya (beli/download resmi,
   rekam sendiri, atau pakai situs musik bebas royalti).
2. Beri nama file **`song.mp3`**.
3. Timpa file yang ada di folder `audio/`.

Perilaku lagu (sudah otomatis diatur di `js/script.js`):
- Lagu **mulai diputar** saat amplop diklik → masuk slide 2.
- Lagu **berhenti** total begitu sampai di slide terakhir.
- Kalau user menekan tombol restart (↺ pojok kanan atas slide terakhir),
  lagu balik ke detik ke-0 dan siap main lagi dari slide 2.

---

## 3. Ganti nama & teks
Semua teks ada langsung di `index.html`, cari dan ganti:
- `Kaila Adiratna` → nama penerima
- `Untuk Kaila, dengan sayang.` → nama di amplop
- `Raffi` (di `final-sign`) → nama pengirim
- Tanggal di Slide 4 (`21 Maret`, kalender) → sesuaikan tanggal ulang tahun
- 6 kartu gosok (Slide 7, `data-msg="..."`) → ganti isi harapan sesukamu

Teks surat panjang (Slide 3, efek ngetik) ada di `js/script.js`,
cari variabel `LETTER_TEXT` di baris paling atas.

---

## 4. Ganti warna / nuansa
Semua warna terpusat di `css/style.css` bagian paling atas (`:root`):
```css
--bordeaux: #3D0C1F;   /* merah anggur utama */
--gold: #C9A661;        /* emas aksen */
--ivory: #F8F1E4;       /* krem surat */
--blush: #C79A96;       /* pink dusty pelengkap */
```
Ganti nilai hex-nya saja, seluruh halaman ikut berubah otomatis.

---

## 5. Urutan & waktu tiap slide
Diatur di `js/script.js` fungsi `runSlideBehavior()` — angka dalam
milidetik (1000 = 1 detik). Slide juga bisa dilewati manual dengan
tap/klik di layar (kecuali amplop, kartu gosok, dan slide terakhir).

Selamat berkreasi! 🤍
