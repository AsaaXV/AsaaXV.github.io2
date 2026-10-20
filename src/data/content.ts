import {
  FlipCardItem,
  ComparisonItem,
  RecyclePhase,
  FactItem,
  ActionFolder,
  TeamMember,
  LogbookEntry,
} from '../types';

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Steffi Ansari Situmorang', nim: '240806500040', role: 'Ketua / Project Manager & UX Research' },
  { name: 'Aura Putri Nabila', nim: '240806500043', role: 'UI Designer & Visual Asset Creator' },
  { name: 'Muhammad Antasari Aryansyah', nim: '240806500046', role: 'Content Writer & Usability Researcher' },
  { name: 'Muh. Fatur Idris', nim: '240806501062', role: 'Interactive Prototyper & Interaction Specialist' },
  { name: 'Fathimah Azzahrah', nim: '240806501065', role: 'Graphic Illustrator & Visual Stylist' },
  { name: 'Alfathir Awan Arillah', nim: '2408060502034', role: 'Front-End Implementer & Accessibility QA' },
];

export const LECTURERS = [
  { name: 'Nurul Fadhillah S, S.Sos., M.A.', role: 'Dosen Pengampu Utama' },
  { name: 'Lulu Afifah Ichsan, S.Ds., M.Ds.', role: 'Dosen Pengampu DKV' },
  { name: 'Nurjayanti, S.Sos., M.I.Kom.', role: 'Dosen Pengampu Komunikasi' },
];

export const REDUCE_CARDS: FlipCardItem[] = [
  {
    id: 'reduce-1',
    number: '01',
    title: 'Bawa Tumbler & Wadah Pribadi',
    tagline: 'BYO (Bring Your Own)',
    iconType: 'tumbler',
    frontDescription:
      'Setiap hari ribuan cup plastik es teh dan botol air mineral sekali pakai mencemari lingkungan kampus kita. Bawa tumbler sendiri.',
    flipBackText: '1 tumbler menghemat ratusan botol plastik per tahun',
    backTips: [
      'Isi air minum gratis di water station kampus.',
      'Bawa tumbler saat beli es kopi atau boba.',
    ],
    impactMetric: 'Hemat uang saku + nol limbah botol & cup plastik.',
    campusContext: 'Solusi paling hemat dan praktis untuk mahasiswa.',
  },
  {
    id: 'reduce-2',
    number: '02',
    title: 'Tolak Kantong Plastik',
    tagline: 'Bawa Totebag Belanja',
    iconType: 'plastic',
    frontDescription:
      'Kantong kresek sekali pakai membutuhkan ratusan tahun untuk terurai. Cara tercepat adalah menolak kresek dan membawa tas kain.',
    flipBackText: '1 totebag kain gantikan ratusan kantong plastik',
    backTips: [
      'Simpan 1 totebag lipat di dalam tas kuliahmu.',
      'Katakan "tanpa kantong plastik" saat belanja.',
    ],
    impactMetric: 'Menghemat ratusan lembar kantong plastik per semester.',
    campusContext: 'Gaya hidup ramah lingkungan paling mudah dimulai dari tas belanja.',
  },
  {
    id: 'reduce-3',
    number: '03',
    title: 'Pilih Produk Isi Ulang',
    tagline: 'Hindari Sekali Pakai',
    iconType: 'food',
    frontDescription:
      'Sedotan plastik dan wadah sachet sekali pakai langsung dibuang setelah beberapa menit pemakaian.',
    flipBackText: 'Sedotan plastik dipakai 20 menit, terurai 200 tahun',
    backTips: [
      'Gunakan sedotan besi & alat makan pakai ulang.',
      'Pilih perlengkapan kemasan isi ulang (refill).',
    ],
    impactMetric: 'Mereduksi timbulan mikroplastik beracun di ekosistem perairan.',
    campusContext: 'Kebiasaan kecil yang memberi dampak panjang bagi kelestarian alam.',
  },
];

export const REUSE_ITEMS: ComparisonItem[] = [
  {
    id: 'reuse-1',
    title: 'Botol Bekas',
    subtitle: 'Pot Tanaman',
    category: 'Kreasi 1',
    captionUnderPhoto: 'Botol Bekas -> Pot Tanaman',
    before: {
      label: 'Sebelum (Limbah)',
      description: 'Botol kaca atau botol plastik bekas minuman yang sudah tidak terpakai.',
      drawback: 'Kaca butuh jutaan tahun untuk terurai di alam.',
      visualType: 'glass-waste',
    },
    after: {
      label: 'Sesudah (Kreasi)',
      description: 'Disulap menjadi pot tanaman hidroponik atau sukulen meja yang asri.',
      benefit: 'Menghijaukan ruangan dan hemat beli pot baru.',
      visualType: 'glass-plant',
    },
  },
  {
    id: 'reuse-2',
    title: 'Kardus',
    subtitle: 'Rak Mini',
    category: 'Kreasi 2',
    captionUnderPhoto: 'Kardus -> Rak Mini',
    before: {
      label: 'Sebelum (Limbah)',
      description: 'Kardus bekas kemasan atau paket belanja yang menumpuk di kamar.',
      drawback: 'Menumpuk cepat dan menjadi sarang debu jika tidak dimanfaatkan.',
      visualType: 'cardboard-waste',
    },
    after: {
      label: 'Sesudah (Kreasi)',
      description: 'Dipotong dan dirakit menjadi rak mini bersekat untuk alat tulis atau buku.',
      benefit: 'Meja belajar rapi tanpa mengeluarkan biaya tambahan.',
      visualType: 'cardboard-organizer',
    },
  },
  {
    id: 'reuse-3',
    title: 'Baju Bayi',
    subtitle: 'Selimut',
    category: 'Kreasi 3',
    captionUnderPhoto: 'Baju Bayi -> Selimut',
    before: {
      label: 'Sebelum (Limbah)',
      description: 'Pakaian atau baju bayi yang sudah kekecilan dan tak terpakai lagi.',
      drawback: 'Limbah tekstil butuh waktu puluhan tahun untuk terurai.',
      visualType: 'tshirt-waste',
    },
    after: {
      label: 'Sesudah (Kreasi)',
      description: 'Disambung dan dijahit kain perca menjadi selimut lembut multifungsi.',
      benefit: 'Penuh kenangan dan memberikan kehangatan baru.',
      visualType: 'tshirt-totebag',
    },
  },
];

export const RECYCLE_PHASES: RecyclePhase[] = [
  {
    step: 1,
    title: 'Pilah Sampah',
    subtitle: 'Tahap 1',
    action: 'Pilah Sampah',
    material: 'Plastik, kertas, karton, kaca & logam',
  },
  {
    step: 2,
    title: 'Kumpulkan',
    subtitle: 'Tahap 2',
    action: 'Kumpulkan',
    material: 'Wadah terpilah, bersih & kering',
  },
  {
    step: 3,
    title: 'Serahkan ke Bank Sampah',
    subtitle: 'Tahap 3',
    action: 'Serahkan ke Bank Sampah',
    material: 'Bank sampah unit / TPS3R',
  },
  {
    step: 4,
    title: 'Jadi Produk Baru',
    subtitle: 'Tahap 4',
    action: 'Jadi Produk Baru',
    material: 'Biji daur ulang & barang siap pakai',
  },
];

export const FACTS_DATA: FactItem[] = [
  {
    id: 'fact-1',
    number: '2.000',
    unit: 'Truk/Hari',
    title: 'Sampah plastik yang masuk ke laut, sungai, dan danau di seluruh dunia, setiap hari.',
    description: 'Sampah plastik yang masuk ke laut, sungai, dan danau di seluruh dunia, setiap hari.',
    source: 'Data Global',
    detailText: 'Sampah plastik yang masuk ke laut, sungai, dan danau di seluruh dunia, setiap hari.',
    badge: 'Fakta 1',
  },
  {
    id: 'fact-2',
    number: '25,14',
    unit: 'Juta Ton',
    title: 'Total sampah Indonesia yang tercatat sepanjang 2025.',
    description: 'Total sampah Indonesia yang tercatat sepanjang 2025.',
    source: 'Data Nasional 2025',
    detailText: 'Total sampah Indonesia yang tercatat sepanjang 2025.',
    badge: 'Fakta 2',
  },
  {
    id: 'fact-3',
    number: '40,76%',
    unit: 'Sisa Makanan',
    title: 'Sisa makanan adalah jenis sampah terbesar di Indonesia, dari semua yang kita buang.',
    description: 'Sisa makanan adalah jenis sampah terbesar di Indonesia, dari semua yang kita buang.',
    source: 'Komposisi Sampah',
    detailText: 'Sisa makanan adalah jenis sampah terbesar di Indonesia, dari semua yang kita buang.',
    badge: 'Fakta 3',
  },
];

export const ACTION_FOLDERS: ActionFolder[] = [
  {
    id: 'act-1',
    stepNumber: 1,
    title: 'Bawa Wadah Sendiri (BYO Tumbler & Kotak Bekal)',
    summary: 'Kurangi sampah plastik saat makan di kantin atau cafe favoritmu.',
    checklist: [
      'Siapkan botol minum di tas sebelum berangkat ke kampus.',
      'Bawa kotak bekal untuk pesanan takeaway tanpa styrofoam.',
      'Tolak sedotan plastik dan sendok plastik sekali pakai.',
    ],
    quote: '"Langkah paling mudah yang bisa dilakukan setiap mahasiswa setiap hari."',
    isCompleted: false,
  },
  {
    id: 'act-2',
    stepNumber: 2,
    title: 'Buat Pojok Pilah Sampah di Kamar Kos',
    summary: 'Sediakan 2 kantong terpisah: Sampah Kering (Botol/Kertas) vs Sampah Basah (Organik).',
    checklist: [
      'Bilas dan remukkan botol plastik sebelum disimpan di kardus pilah.',
      'Kumpulkan kertas HVS bekas tugas & print draft skripsi.',
      'Jauhkan sisa makanan basah dari kardus daur ulang agar tidak bau.',
    ],
    quote: '"Kamar kos rapi, sampahmu siap dijemput bank sampah atau pemulung."',
    isCompleted: false,
  },
  {
    id: 'act-3',
    stepNumber: 3,
    title: 'Kolektif & Bagikan Semangat 3R ke Teman Kampus',
    summary: 'Ajak teman sekelas dan satu circle untuk mulai peduli dan ikut ambil bagian.',
    checklist: [
      'Bagikan link microsite 3R ini ke grup WhatsApp angkatan.',
      'Dukung inisiatif bank sampah atau green movement di kampusmu.',
      'Jadikan gaya hidup ramah lingkungan sebagai kebanggaan anak muda.',
    ],
    quote: '"Bumi ini dipinjam dari anak cucu kita, yuk kita jaga bareng-bareng!"',
    isCompleted: false,
  },
];

export const LOGBOOK_ENTRIES: LogbookEntry[] = [
  {
    meeting: 1,
    date: '9 September 2026',
    focus: 'Proposal Proyek: Tema, Tujuan, Target Audiens, Jenis Media',
    feedback: 'Pastikan demografi mahasiswa jelas, lalu mantapkan media microsite responsif.',
    deliverable: 'Draft BAB I (2-3 hal) + Pembagian tugas anggota kelompok',
    isPassed: true,
  },
  {
    meeting: 2,
    date: '16 September 2026',
    focus: 'Riset Sederhana (Survei Google Form & Wawancara Mendalam)',
    feedback: 'Visual harus menarik berdasarkan preferensi responden (Akbar, Rani, Keyra) sebagai acuan konsep.',
    deliverable: 'Data riset 16 responden + insight pain points + persona Rani',
    isPassed: true,
  },
  {
    meeting: 3,
    date: '23 September 2026',
    focus: 'Konsep & Ideasi: Big Idea "Belajar 3R Sekali Scroll", Moodboard, Palet Warna 60-30-10',
    feedback: 'Kombinasi warna Mustard Green, Peach, dan Golden Brown sangat harmonis dengan tema bumi.',
    deliverable: 'Moodboard + Konsep + User Flow alur navigasi',
    isPassed: true,
  },
  {
    meeting: 4,
    date: '30 September 2026',
    focus: 'Wireframe Low-Fidelity Semua Section Kunci (Flip Card, Panah Before-After, Roda Siklus)',
    feedback: 'Interaksi sudah terarah dan memperhitungkan kemudahan scroll pengguna mobile.',
    deliverable: 'Wireframe layout hitam-putih struktur microsite lengkap',
    isPassed: true,
  },
  {
    meeting: 5,
    date: 'Oktober 2026',
    focus: 'Mockup High-Fidelity & Penerapan Prinsip Desain (Kontras, Hierarki, Aksesibilitas)',
    feedback: 'Keterbacaan teks dan rasio kontras WCAG harus dijaga di setiap kartu.',
    deliverable: 'Mockup visual penuh dengan palet warna final',
    isPassed: true,
  },
  {
    meeting: 6,
    date: 'Oktober 2026',
    focus: 'Prototyping Interaktif (Clickable) & Transisi Animasi',
    feedback: 'Pastikan transisi flip card dan putaran roda responsif di smartphone.',
    deliverable: 'Prototipe interaktif clickable berbasis web',
    isPassed: true,
  },
  {
    meeting: 7,
    date: 'Oktober 2026',
    focus: 'Usability Testing (3-5 Pengguna Mahasiswa) & Evaluasi Heuristik',
    feedback: 'Uji apakah tombol share dan interaksi tempat sampah mudah dipahami tanpa instruksi rumit.',
    deliverable: 'Skenario uji + catatan hasil observasi pengguna',
    isPassed: true,
  },
  {
    meeting: 8,
    date: 'November 2026',
    focus: 'Iterasi & Penyempurnaan Berdasarkan Hasil Pengujian',
    feedback: 'Perhalus feedback visual saat kartu diflip dan beri indikator langkah yang jelas.',
    deliverable: 'Perbandingan before-after dan revisi perbaikan',
    isPassed: true,
  },
  {
    meeting: 9,
    date: 'November 2026',
    focus: 'Finalisasi Laporan Lengkap (BAB I–VI) & Prototipe Siap Pakai',
    feedback: 'Siapkan link live yang bisa dibuka langsung oleh dosen dan rekan mahasiswa.',
    deliverable: 'Laporan final lengkap + microsite terpublikasi',
    isPassed: true,
  },
  {
    meeting: 10,
    date: '11 November 2026',
    focus: 'Gladi Presentasi & Presentasi Akhir di Hadapan Dosen Pengampu',
    feedback: 'Presentasikan hasil perancangan media interaktif dan dampaknya bagi mahasiswa UNM.',
    deliverable: 'Slide presentasi + demonstrasi langsung microsite clickable',
    isPassed: true,
  },
];
