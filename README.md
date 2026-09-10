# Adel's Little Scrapbook ♡

Website scrapbook digital personal untuk Adel. Static website (HTML + CSS + Vanilla JS + GSAP), tidak butuh backend, database, atau build tool apa pun.

## Cara Menjalankan

Cukup buka file `index.html` langsung di browser (double click), atau jalankan lewat live server apa pun (VS Code Live Server, dll). Tidak perlu instalasi atau `npm install`.

```
adel-scrapbook/
│
├── index.html      → struktur halaman
├── style.css       → semua styling & tema warna
├── script.js       → animasi GSAP + interaksi
│
├── images/         → taruh foto asli Adel di sini
│   ├── adel-01.jpg
│   ├── adel-02.jpg
│   ├── adel-03.jpg
│   ├── adel-04.jpg
│   ├── adel-05.jpg
│   ├── adel-06.jpg
│   ├── memory-01.jpg   (foto untuk memory pertama)
│   ├── memory-02.jpg   (foto untuk memory kedua)
│   └── memory-03.jpg   (foto untuk memory ketiga)
│
├── music/
│   └── about-you.mp3   → taruh file musik asli di sini
│
└── README.md
```

Karena file gambar dan musik belum ada, website akan otomatis menampilkan **placeholder vector** (untuk foto) sehingga tidak error saat dibuka. Musik hanya akan mulai diputar setelah tombol "Open Scrapbook ♡" diklik (mengikuti kebijakan autoplay browser).

## Cara Mengganti Foto

1. Siapkan 6 foto, beri nama persis:
   `adel-01.jpg`, `adel-02.jpg`, `adel-03.jpg`, `adel-04.jpg`, `adel-05.jpg`, `adel-06.jpg`
2. Masukkan ke folder `images/`.
3. Selesai — placeholder otomatis tergantikan oleh foto asli tanpa perlu edit kode.

Lokasi penanda di `index.html`:
```html
<!-- GANTI FOTO ADEl DI SINI -->
```

## Cara Menambahkan Foto di Little Memories

Setiap kotak memory di section **Pieces of Memories** juga bisa diisi foto asli, sama seperti Photo Wall.

1. Siapkan foto, beri nama: `memory-01.jpg`, `memory-02.jpg`, `memory-03.jpg` (sesuai urutan memory-nya).
2. Masukkan ke folder `images/`.
3. Selesai — kotak placeholder pink otomatis tergantikan oleh foto asli.

Kalau mau menambah memory baru sekaligus fotonya, copy-paste satu blok `.memory-item` di `index.html` (cari komentar `<!-- EDIT MEMORY DI SINI -->`), lalu ganti nama file `src` gambarnya (misalnya `memory-04.jpg`) dan taruh foto dengan nama yang sama di folder `images/`.

## Cara Mengganti Musik

1. Siapkan file musik format `.mp3`.
2. Beri nama `about-you.mp3`.
3. Masukkan ke folder `music/`.

Lokasi penanda di `index.html`:
```html
<!-- MUSIC FILE: music/about-you.mp3 -->
```

## Cara Mengedit Informasi Adel

Cari komentar berikut di `index.html` pada section **About**:
```html
<!-- EDIT INFORMASI ADEl DI SINI -->
```
Ganti isi `Coming soon...` pada bagian *Hobby*, *Personality*, dan *Fun Fact* dengan informasi asli.

## Cara Mengedit Memories

Cari komentar:
```html
<!-- EDIT MEMORY DI SINI -->
```
Setiap potongan kertas memory memiliki tanggal/judul kecil dan isi cerita — bisa ditambah atau dikurangi sesuai kebutuhan (cukup copy-paste blok `.memory-item` untuk menambah).

## Cara Mengedit Surat

Cari komentar pada section **Letter**:
```html
<!-- EDIT SURAT DI SINI -->
```
Ganti teks `[Write your message here]` dengan isi surat asli.

## Struktur Alur Website

```
COVER → Open Scrapbook → Music mulai
  → About Adel
  → Favorite Things
  → Photo Wall
  → Little Memories
  → A Little Letter
  → Last Page
```

## Teknologi

- HTML5, CSS3, Vanilla JavaScript
- [GSAP](https://gsap.com/) + ScrollTrigger (dimuat via CDN — butuh koneksi internet saat animasi dijalankan)
- Google Fonts: Cormorant Garamond (serif heading), Caveat (handwritten), Nunito Sans (sans-serif body)

## Catatan

- Website menghormati pengaturan `prefers-reduced-motion` — animasi otomatis dipercepat/diminimalkan untuk pengguna yang mengaktifkan pengaturan tersebut di sistem operasi mereka.
- Semua warna menggunakan palet pastel pink, blush, cream, dan coklat tua untuk teks — tanpa warna neon.
- Layout sudah responsive untuk mobile (navbar berubah jadi tombol menu, grid foto & favorit menyesuaikan jumlah kolom).