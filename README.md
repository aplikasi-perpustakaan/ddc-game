# Permainan Susunan Buku Perpustakaan (DDC Game)

Aplikasi web interaktif pembelajaran dan latihan penyusunan buku mengikut piawaian **Dewey Decimal Classification (DDC)** / **Sistem Pengkelasan Perpuluhan Dewey**.

Dibina semula sepenuhnya ke standard **HTML5, CSS3, dan Vanilla JavaScript (100% Bebas Flash)** bagi latihan kemahiran penjajaran dan penyusunan buku di rak perpustakaan.

🎮 **Main terus di pelayar (GitHub Pages):**  
[https://aplikasi-perpustakaan.github.io/ddc-game/](https://aplikasi-perpustakaan.github.io/ddc-game/)

---

## 🌟 Ciri-Ciri Utama Versi HTML5

1. **100% Bebas Adobe Flash:**
   - Berfungsi secara terus (*native*) di mana-mana pelayar web moden (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari) tanpa memerlukan pemalam (*plugins*).
2. **Sokongan Pelbagai Peranti & Mod Interaksi:**
   - **Heret & Lepas (Drag & Drop):** Menggunakan HTML5 Drag and Drop API dengan pratonton buku seretan yang jelas dan legap.
   - **Sentuh & Ketik (Touch & Tap-to-Swap):** Sokongan penuh skrin sentuh untuk tablet, iPad, dan telefon pintar.
   - **Ketik untuk Tukar (Click/Tap to Swap):** Klik mana-mana buku pertama, kemudian klik buku sasaran untuk menukar kedudukan dengan mudah.
3. **Bar Kemajuan Sentiasa Kelihatan (Sticky Progress Bar):**
   - Bar terapung di bahagian atas memaparkan bilangan tahap yang telah selesai secara masa nyata (`0 / 10 Selesai (0%)`).
   - Pil nombor tahap interaktif (`1` – `10`): bertukar hijau dengan tanda semak (`✓`) apabila selesai dan boleh diklik untuk melompat terus ke tahap tersebut.
4. **Kesan Bunyi Berasaskan Web Audio API:**
   - Chime harmoni untuk jawapan tepat (*CORRECT!*).
   - Nada lembut untuk jawapan salah (*WRONG*).
   - Tiada kebergantungan fail audio luaran (dijana secara sintetik oleh pelayar).
   - Boleh dimatikan (*Mute*) pada bila-bila masa.
5. **Animasi Konfeti Keraian (Celebratory Confetti):**
   - Letusan zarah konfeti berwarna-warni secara automatik apabila kesemua 10 tahap berjaya diselesaikan.
6. **Petua Asal:**
   - Butang **HINT** yang menyediakan panduan praktikal dalam Bahasa Melayu.
7. **Peringatan Petugas & Modal Tahniah:**
   - Modal tahniah automatik selepas kesemua 10 tahap selesai untuk memudahkan semakan petugas perpustakaan.

---

## 📁 Struktur Fail

```text
ddc-game/
│
├── index.html            # Halaman utama aplikasi HTML5 moden (lengkap Google Tag GTM-TKKTQ272)
├── sort.html             # Serasi dengan pautan lama (menggunakan enjin HTML5)
│
├── css/
│   └── style.css         # Reka bentuk rak buku 3D, animasi, bar melekat, dan responsif
│
├── js/
│   ├── data.js           # Konfigurasi data 10 tahap, warna, dan nombor panggilan DDC
│   ├── audio.js          # Pengendali kesan bunyi Web Audio API (tanpa fail MP3 luaran)
│   ├── confetti.js       # Enjin animasi konfeti keraian berasaskan HTML5 Canvas
│   └── game.js           # Logik permainan, drag-and-drop, tap-to-swap, dan semakan susunan
│
├── logo.svg              # Logo vektor tapak DDC Game
├── logo.png              # Imej logo beresolusi tinggi
├── favicon.svg           # Favicon vektor aplikasi
├── favicon.ico           # Multi-resolution favicon ICO
├── favicon-16x16.png     # Favicon 16x16
├── favicon-32x32.png     # Favicon 32x32
├── apple-touch-icon.png  # Ikon skrin utama iOS / iPadOS
├── og-image.png          # Imej pratonton media sosial (Open Graph & Twitter Card 1200x630)
├── org-avatar.svg        # Ikon avatar rasmi organisasi
├── org-avatar.png        # Imej avatar rasmi organisasi
├── LICENSE               # Lesen Perisian Sumber Terbuka MIT
└── README.md             # Dokumentasi projek
```

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini tidak memerlukan pelayan web (*web server*) yang rumit atau pemasangan perisian tambahan.

1. Buka folder projek dalam Windows Explorer.
2. Dwiklik fail **[index.html](file:///D:/GitHub/aplikasi-perpustakaan/ddc-game/index.html)** atau **[sort.html](file:///D:/GitHub/aplikasi-perpustakaan/ddc-game/sort.html)**.
3. Aplikasi akan dibuka serta-merta dalam pelayar web pilihan anda.

---

## 📚 Ringkasan 10 Tahap & Peraturan DDC

| Tahap | Kelas Utama / Subjek | Konsep Pengkelasan yang Diuji | Petua Asal |
|:---:|:---|:---|:---|
| **1** | `150` – `823` | Susunan asas 10 kelas utama DDC (000 – 900) mengikut turutan nombor bulat menaik. | *Dimulakan dengan buku kuning (150). Diakhiri dengan buku hijau (823).* |
| **2** | `510` – `570` | Divisyen dan seksyen nombor bulat dalam kelas yang sama (500 Sains Tulen). | *Buku biru (510) di awal rak. 519 mendahului 530, dan diakhiri dengan buku kuning (570).* |
| **3** | `004` – `004.6` | Nombor bulat asas mendahului pecahan satu titik perpuluhan (`004` sebelum `004.1`). | *Nombor asas 004 tanpa perpuluhan mendahului titik perpuluhan. Diakhiri dengan 004.6 (kelabu).* |
| **4** | `621.04` – `621.205` | Nilai perpuluhan matematik sebenar (`.18` mendahului `.2` kerana `.18 < .20`). | *Awas perangkap perpuluhan! .18 lebih kecil daripada .2 (.20). Dimulakan dengan buku jingga.* |
| **5** | `330.9595` | Turutan abjad kod pengarang / Cutter 3 huruf (`ABD`, `CHE`, `ISM`, `TAN`, `ZAI`). | *Nombor kelas semua sama (330.9595). Susun kod pengarang mengikut turutan abjad A hingga Z.* |
| **6** | `823.914` | Nombor Cutter berangka bertindak sebagai perpuluhan (`.A45` sebelum `.A5`). | *Nombor Cutter berangka adalah perpuluhan: .A45 mendahului .A5 (.50), manakala .R68 mendahului .R7.* |
| **7** | `658.4 KOT` | Susunan kronologi tahun penerbitan (`2012` hingga `2024`) bagi buku dan pengarang sama. | *Semua buku mempunyai nombor dan pengarang sama. Susun mengikut tahun terbit: 2012 di awal, 2024 di akhir.* |
| **8** | `959.5 HAL` | Keutamaan jilid (`v.1`, `v.2`, `v.3`) dan nombor salinan (`c.1`, `c.2`). | *Jilid 1 (v.1) mendahului Jilid 2 (v.2). Di dalam jilid yang sama, salinan 1 (c.1) mendahului salinan 2 (c.2).* |
| **9** | `720` – `720.9595` | Hierarki pecahan DDC bertingkat (daripada skop topik umum kepada khusus/wilayah). | *Daripada skop umum (720) kepada skop khusus (720.9595). Dimulakan dengan buku jingga, diakhiri dengan buku merah.* |
| **10** | `005.13` – `005.14` | Penguasaan penuh gabungan perpuluhan panjang, abjad pengarang, tahun, dan jilid. | *Kacang! Gabungkan semua: 005.13 mendahului 005.133, JAV mendahului PYT, v.1 sebelum v.2, dan 005.14 di penghujung.* |

---

## 📄 Lesen

Dilesenkan di bawah [Lesen MIT](file:///D:/GitHub/aplikasi-perpustakaan/ddc-game/LICENSE).  
Hak Cipta &copy; 2026 Perpustakaan Tun Abdul Razak, Universiti Teknologi MARA.
