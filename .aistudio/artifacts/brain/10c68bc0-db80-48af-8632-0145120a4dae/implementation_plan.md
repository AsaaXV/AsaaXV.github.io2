# Rencana Implementasi: Mengembalikan Roda Kemudi Kayu Kapal Sesuai Gambar Referensi

Berdasarkan konfirmasi dan gambar referensi yang Anda unggah (`image_8a48e386.png`):
1. **Roda Kemudi Kayu Kapal Utuh**: Mengembalikan roda kemudi kapal kayu 100% persis seperti gambar referensi, lengkap dengan rim kayu cokelat, 8 gagang kemudi luar (pegs/handles) dengan ujung knob bulat, jeruji kayu padat (spokes), dan busur konsentris kuning/emas di bagian dalam.
2. **Palang Dasar Horizontal & Poros Putar**: Mengembalikan palang kayu horizontal cokelat tebal dengan ujung bulat dan lekukan dalam, serta tombol kubah poros hijau tua (`#283618`) bertuliskan "PUTAR" di tengah bawah.
3. **Skema Warna Tombol Angka 1–4**:
   - **Tahap Aktif**: Bulatan hijau tua (`#283618`), angka putih bersih, dengan bingkai kuning cerah tebal (`ring-4 ring-amber-400`).
   - **Tahap Non-Aktif**: Bulatan abu-abu krem (`#C4B8A5` / `#BFB5A2`) dengan teks warna gelap, persis seperti pada gambar referensi.

---

## 1. Rincian Visual Elemen Roda Kemudi (`RecycleSection.tsx`)

1. **Lingkar Luar & Gagang Kemudi (Wooden Rim & Handles)**:
   - Rim lingkar kayu cokelat tua (`#5B4436` / `#433126`) dengan garis jahitan putus-putus (*dashed line*) di sisi dalam.
   - 8 gagang kayu luar (pegs) yang menonjol keluar di setiap sudut 45° (0°, 45°, 90°, 135°, dst.), lengkap dengan knob bulat di ujung gagang.
2. **Jeruji Kayu Padat (Radial Spokes)**:
   - Batang jeruji kayu cokelat gelap dari poros pusat ke lingkar kemudi, dengan aksen rivet kuningan di kuadran utama.
3. **Busur Konsentris Kuning Emas (Brass Arc)**:
   - Garis lengkung tipis berwarna kuning emas (`border-amber-400/90`) di bagian dalam jeruji, persis seperti pada tangkapan layar referensi.
4. **Pin Angka pada Roda (Wheel Indicator)**:
   - Pin angka pada puncak lingkaran roda kemudi: lingkaran hijau tua dengan angka putih tebal dan ring kuning/putih, yang berotasi balik (*counter-rotated*) agar angka tetap selalu tegak.
5. **Poros Hijau Tengah Bawah**:
   - Kubah setengah lingkaran hijau tua (`#283618`) dengan ikon `RefreshCw` putih dan label teks "PUTAR" yang presisi di tengah dasar roda.
6. **Palang Kayu Horizontal**:
   - Palang dasar kayu horizontal cokelat tua (`#433126`) yang membentang di bawah busur setengah lingkaran, berujung melengkung (*rounded*) dengan strip aksen kayu di dalamnya.
7. **Baris Tombol Angka Tahap 1–4**:
   - Terletak tepat di bawah palang dasar.
   - Sesuai gambar referensi: bulatan abu-abu krem lembut (`bg-[#C4B8A5]`) untuk tahap non-aktif, dan bulatan hijau tua berbingkai kuning emas (`bg-[#283618] text-white ring-4 ring-amber-400`) untuk tahap aktif.

---

## 2. Mekanisme Interaksi & Audio

1. **Putar Seret / Sentuh (*Touch & Mouse Drag*)**:
   - Pengguna dapat menyeret busur roda kemudi kapal secara mulus di HP atau laptop, dengan titik rotasi di tengah bawah palang dasar.
   - Otomatis melakukan *snap* ke kuadran 90° terdekat saat jari/mouse diangkat.
2. **Klik Tombol Putar & Angka**:
   - Mengetuk tombol poros "PUTAR" memutar roda ke tahap berikutnya.
   - Mengetuk tombol angka 1, 2, 3, atau 4 di bawah memutar roda langsung ke tahap tersebut.
3. **Efek Suara Ratchet**:
   - Mempertahankan efek suara klik mekanis putaran setir saat roda diputar.

---

## 3. Rencana Verifikasi

1. **Verifikasi Visual terhadap Gambar Referensi**:
   - Membandingkan langsung tampilan aplikasi dengan gambar `image_8a48e386.png` untuk memastikan:
     - Rim cokelat kemudi, jeruji kayu, dan gagang luar persis sesuai.
     - Lengkungan busur kuning emas terlihat jelas.
     - Palang horizontal cokelat dan tombol poros hijau di posisi yang tepat.
     - Warna tombol angka 1-4 (abu-abu krem dan hijau berbingkai kuning) identik.
2. **Pengujian Interaksi**:
   - Uji seret sentuh pada roda dan uji klik pada tombol poros dan angka.
3. **Kompilasi & Linting**:
   - Menjalankan `lint_applet` dan `compile_applet` untuk menjamin tidak ada error TypeScript maupun regresi.
