/**
 * DDC Game - Data Soalan & Konfigurasi Tahap
 * Sistem Pengkelasan Perpuluhan Dewey (Dewey Decimal Classification - DDC)
 * Hak Cipta (c) 2026 Perpustakaan Tun Abdul Razak, Universiti Teknologi MARA
 */

const DDC_COLORS = {
  kuning: {
    name: "kuning",
    bg: "linear-gradient(180deg, #fde047 0%, #eab308 60%, #ca8a04 100%)",
    border: "#a16207",
    spine: "#713f12",
    textColor: "#1f2937"
  },
  biru: {
    name: "biru",
    bg: "linear-gradient(180deg, #60a5fa 0%, #3b82f6 60%, #1d4ed8 100%)",
    border: "#1e40af",
    spine: "#172554",
    textColor: "#ffffff"
  },
  hijau: {
    name: "hijau",
    bg: "linear-gradient(180deg, #84cc16 0%, #65a30d 60%, #4d7c0f 100%)",
    border: "#3f6212",
    spine: "#1a2e05",
    textColor: "#ffffff"
  },
  merah: {
    name: "merah",
    bg: "linear-gradient(180deg, #f87171 0%, #dc2626 60%, #991b1b 100%)",
    border: "#7f1d1d",
    spine: "#450a0a",
    textColor: "#ffffff"
  },
  kelabu: {
    name: "kelabu",
    bg: "linear-gradient(180deg, #9ca3af 0%, #6b7280 60%, #4b5563 100%)",
    border: "#374151",
    spine: "#1f2937",
    textColor: "#ffffff"
  },
  jingga: {
    name: "jingga",
    bg: "linear-gradient(180deg, #fb923c 0%, #ea580c 60%, #c2410c 100%)",
    border: "#9a3412",
    spine: "#7c2d12",
    textColor: "#ffffff"
  },
  ungu: {
    name: "ungu",
    bg: "linear-gradient(180deg, #c084fc 0%, #9333ea 60%, #7e22ce 100%)",
    border: "#6b21a8",
    spine: "#4c1d95",
    textColor: "#ffffff"
  }
};

const DDC_LEVELS = [
  {
    "id": 1,
    "title": "Tahap 1",
    "code": "ddc_level_01",
    "hint": "Dimulakan dengan buku kuning. Diakhiri dengan buku hijau.",
    "explanation": "Sistem DDC disusun mengikut nilai nombor kelas dari 000 hingga 999. Oleh itu, 150 mendahului 330, diikuti 510, 658, dan 823.",
    "books": [
      {
        "id": "b1",
        "bookNumber": 1,
        "callNumber": "150 PSY",
        "initialSlot": 3,
        "targetSlot": 1,
        "color": DDC_COLORS.kuning,
        "lines": ["150", "PSY"]
      },
      {
        "id": "b2",
        "bookNumber": 2,
        "callNumber": "330 ECO",
        "initialSlot": 5,
        "targetSlot": 2,
        "color": DDC_COLORS.biru,
        "lines": ["330", "ECO"]
      },
      {
        "id": "b3",
        "bookNumber": 3,
        "callNumber": "510 MAT",
        "initialSlot": 1,
        "targetSlot": 3,
        "color": DDC_COLORS.merah,
        "lines": ["510", "MAT"]
      },
      {
        "id": "b4",
        "bookNumber": 4,
        "callNumber": "658 MGT",
        "initialSlot": 4,
        "targetSlot": 4,
        "color": DDC_COLORS.kelabu,
        "lines": ["658", "MGT"]
      },
      {
        "id": "b5",
        "bookNumber": 5,
        "callNumber": "823 LIT",
        "initialSlot": 2,
        "targetSlot": 5,
        "color": DDC_COLORS.hijau,
        "lines": ["823", "LIT"]
      }
    ]
  },
  {
    "id": 2,
    "title": "Tahap 2",
    "code": "ddc_level_02",
    "hint": "Buku biru di awal rak dan diakhiri dengan buku kuning.",
    "explanation": "Dalam kelas yang sama (500 Sains Tulen), bandingkan nilai digit puluhan dan sa: 510 < 519 < 530 < 540 < 570.",
    "books": [
      {
        "id": "b1",
        "bookNumber": 1,
        "callNumber": "510 MAT",
        "initialSlot": 4,
        "targetSlot": 1,
        "color": DDC_COLORS.biru,
        "lines": ["510", "MAT"]
      },
      {
        "id": "b2",
        "bookNumber": 2,
        "callNumber": "519 STA",
        "initialSlot": 1,
        "targetSlot": 2,
        "color": DDC_COLORS.jingga,
        "lines": ["519", "STA"]
      },
      {
        "id": "b3",
        "bookNumber": 3,
        "callNumber": "530 PHY",
        "initialSlot": 5,
        "targetSlot": 3,
        "color": DDC_COLORS.hijau,
        "lines": ["530", "PHY"]
      },
      {
        "id": "b4",
        "bookNumber": 4,
        "callNumber": "540 CHE",
        "initialSlot": 2,
        "targetSlot": 4,
        "color": DDC_COLORS.ungu,
        "lines": ["540", "CHE"]
      },
      {
        "id": "b5",
        "bookNumber": 5,
        "callNumber": "570 BIO",
        "initialSlot": 3,
        "targetSlot": 5,
        "color": DDC_COLORS.kuning,
        "lines": ["570", "BIO"]
      }
    ]
  },
  {
    "id": 3,
    "title": "Tahap 3",
    "code": "ddc_level_03",
    "hint": "Nombor asas tanpa perpuluhan mendahului titik perpuluhan. Diakhiri dengan kelabu.",
    "explanation": "Nombor bulat 004 sentiasa mendahului nombor yang mempunyai pecahan perpuluhan (.1 hingga .6). Seterusnya nilai perpuluhan disusun menaik: .1 < .2 < .5 < .6.",
    "books": [
      {
        "id": "b1",
        "bookNumber": 1,
        "callNumber": "004 COM",
        "initialSlot": 2,
        "targetSlot": 1,
        "color": DDC_COLORS.merah,
        "lines": ["004", "COM"]
      },
      {
        "id": "b2",
        "bookNumber": 2,
        "callNumber": "004.1 HAR",
        "initialSlot": 5,
        "targetSlot": 2,
        "color": DDC_COLORS.biru,
        "lines": ["004.1", "HAR"]
      },
      {
        "id": "b3",
        "bookNumber": 3,
        "callNumber": "004.2 ARC",
        "initialSlot": 1,
        "targetSlot": 3,
        "color": DDC_COLORS.kuning,
        "lines": ["004.2", "ARC"]
      },
      {
        "id": "b4",
        "bookNumber": 4,
        "callNumber": "004.5 MEM",
        "initialSlot": 3,
        "targetSlot": 4,
        "color": DDC_COLORS.hijau,
        "lines": ["004.5", "MEM"]
      },
      {
        "id": "b5",
        "bookNumber": 5,
        "callNumber": "004.6 NET",
        "initialSlot": 4,
        "targetSlot": 5,
        "color": DDC_COLORS.kelabu,
        "lines": ["004.6", "NET"]
      }
    ]
  },
  {
    "id": 4,
    "title": "Tahap 4",
    "code": "ddc_level_04",
    "hint": ".18 lebih kecil daripada .2",
    "explanation": "Perpuluhan Dewey adalah pecahan matematik sebenar: .04 < .10 < .18 < .20 < .205. Jangan anggap 18 lebih besar daripada 2 kerana .2 bersamaan .20!",
    "books": [
      {
        "id": "b1",
        "bookNumber": 1,
        "callNumber": "621.04 ENG",
        "initialSlot": 5,
        "targetSlot": 1,
        "color": DDC_COLORS.jingga,
        "lines": ["621.04", "ENG"]
      },
      {
        "id": "b2",
        "bookNumber": 2,
        "callNumber": "621.1 STM",
        "initialSlot": 2,
        "targetSlot": 2,
        "color": DDC_COLORS.biru,
        "lines": ["621.1", "STM"]
      },
      {
        "id": "b3",
        "bookNumber": 3,
        "callNumber": "621.18 BLR",
        "initialSlot": 4,
        "targetSlot": 3,
        "color": DDC_COLORS.ungu,
        "lines": ["621.18", "BLR"]
      },
      {
        "id": "b4",
        "bookNumber": 4,
        "callNumber": "621.2 HYD",
        "initialSlot": 1,
        "targetSlot": 4,
        "color": DDC_COLORS.kuning,
        "lines": ["621.2", "HYD"]
      },
      {
        "id": "b5",
        "bookNumber": 5,
        "callNumber": "621.205 APP",
        "initialSlot": 3,
        "targetSlot": 5,
        "color": DDC_COLORS.hijau,
        "lines": ["621.205", "APP"]
      }
    ]
  },
  {
    "id": 5,
    "title": "Tahap 5",
    "code": "ddc_level_05",
    "hint": "Nombor sama tapi abjad tidak",
    "explanation": "Apabila nombor kelas sama (330.9595 Sejarah Ekonomi Malaysia), susunan ditentukan oleh baris kod abjad pengarang mengikut abjad: ABD, CHE, ISM, TAN, ZAI.",
    "books": [
      {
        "id": "b1",
        "bookNumber": 1,
        "callNumber": "330.9595 ABD",
        "initialSlot": 3,
        "targetSlot": 1,
        "color": DDC_COLORS.kuning,
        "lines": ["330.9595", "ABD"]
      },
      {
        "id": "b2",
        "bookNumber": 2,
        "callNumber": "330.9595 CHE",
        "initialSlot": 1,
        "targetSlot": 2,
        "color": DDC_COLORS.merah,
        "lines": ["330.9595", "CHE"]
      },
      {
        "id": "b3",
        "bookNumber": 3,
        "callNumber": "330.9595 ISM",
        "initialSlot": 5,
        "targetSlot": 3,
        "color": DDC_COLORS.biru,
        "lines": ["330.9595", "ISM"]
      },
      {
        "id": "b4",
        "bookNumber": 4,
        "callNumber": "330.9595 TAN",
        "initialSlot": 2,
        "targetSlot": 4,
        "color": DDC_COLORS.hijau,
        "lines": ["330.9595", "TAN"]
      },
      {
        "id": "b5",
        "bookNumber": 5,
        "callNumber": "330.9595 ZAI",
        "initialSlot": 4,
        "targetSlot": 5,
        "color": DDC_COLORS.kelabu,
        "lines": ["330.9595", "ZAI"]
      }
    ]
  },
  {
    "id": 6,
    "title": "Tahap 6",
    "code": "ddc_level_06",
    "hint": ".A45 mendahului .A5",
    "explanation": "Nombor Cutter berangka (.A45, .A5, .K56, .R68, .R7) dikira sebagai perpuluhan. Nilai .45 lebih kecil daripada .50, dan .68 lebih kecil daripada .70.",
    "books": [
      {
        "id": "b1",
        "bookNumber": 1,
        "callNumber": "823.914 .A45",
        "initialSlot": 4,
        "targetSlot": 1,
        "color": DDC_COLORS.hijau,
        "lines": ["823.914", ".A45"]
      },
      {
        "id": "b2",
        "bookNumber": 2,
        "callNumber": "823.914 .A5",
        "initialSlot": 2,
        "targetSlot": 2,
        "color": DDC_COLORS.biru,
        "lines": ["823.914", ".A5"]
      },
      {
        "id": "b3",
        "bookNumber": 3,
        "callNumber": "823.914 .K56",
        "initialSlot": 5,
        "targetSlot": 3,
        "color": DDC_COLORS.ungu,
        "lines": ["823.914", ".K56"]
      },
      {
        "id": "b4",
        "bookNumber": 4,
        "callNumber": "823.914 .R68",
        "initialSlot": 1,
        "targetSlot": 4,
        "color": DDC_COLORS.kuning,
        "lines": ["823.914", ".R68"]
      },
      {
        "id": "b5",
        "bookNumber": 5,
        "callNumber": "823.914 .R7",
        "initialSlot": 3,
        "targetSlot": 5,
        "color": DDC_COLORS.merah,
        "lines": ["823.914", ".R7"]
      }
    ]
  },
  {
    "id": 7,
    "title": "Tahap 7",
    "code": "ddc_level_07",
    "hint": "Yang lama mendahului yang baru",
    "explanation": "Apabila nombor kelas dan kod pengarang sama (658.4 KOT), buku disusun mengikut turutan tahun penerbitan paling awal hingga paling terkini (2012, 2016, 2019, 2021, 2024).",
    "books": [
      {
        "id": "b1",
        "bookNumber": 1,
        "callNumber": "658.4 KOT 2012",
        "initialSlot": 3,
        "targetSlot": 1,
        "color": DDC_COLORS.kelabu,
        "lines": ["658.4", "KOT", "2012"]
      },
      {
        "id": "b2",
        "bookNumber": 2,
        "callNumber": "658.4 KOT 2016",
        "initialSlot": 1,
        "targetSlot": 2,
        "color": DDC_COLORS.biru,
        "lines": ["658.4", "KOT", "2016"]
      },
      {
        "id": "b3",
        "bookNumber": 3,
        "callNumber": "658.4 KOT 2019",
        "initialSlot": 5,
        "targetSlot": 3,
        "color": DDC_COLORS.hijau,
        "lines": ["658.4", "KOT", "2019"]
      },
      {
        "id": "b4",
        "bookNumber": 4,
        "callNumber": "658.4 KOT 2021",
        "initialSlot": 2,
        "targetSlot": 4,
        "color": DDC_COLORS.kuning,
        "lines": ["658.4", "KOT", "2021"]
      },
      {
        "id": "b5",
        "bookNumber": 5,
        "callNumber": "658.4 KOT 2024",
        "initialSlot": 4,
        "targetSlot": 5,
        "color": DDC_COLORS.merah,
        "lines": ["658.4", "KOT", "2024"]
      }
    ]
  },
  {
    "id": 8,
    "title": "Tahap 8",
    "code": "ddc_level_08",
    "hint": "Volume",
    "explanation": "Bagi karya multi-jilid (959.5 HAL), jilid disusun mengikut turutan v.1, v.2, dan v.3. Untuk jilid yang sama, salinan pertama (c.1) mendahului salinan kedua (c.2).",
    "books": [
      {
        "id": "b1",
        "bookNumber": 1,
        "callNumber": "959.5 HAL 2020 v.1 c.1",
        "initialSlot": 4,
        "targetSlot": 1,
        "color": DDC_COLORS.biru,
        "lines": ["959.5", "HAL", "v.1 c.1"]
      },
      {
        "id": "b2",
        "bookNumber": 2,
        "callNumber": "959.5 HAL 2020 v.1 c.2",
        "initialSlot": 1,
        "targetSlot": 2,
        "color": DDC_COLORS.kuning,
        "lines": ["959.5", "HAL", "v.1 c.2"]
      },
      {
        "id": "b3",
        "bookNumber": 3,
        "callNumber": "959.5 HAL 2020 v.2 c.1",
        "initialSlot": 5,
        "targetSlot": 3,
        "color": DDC_COLORS.hijau,
        "lines": ["959.5", "HAL", "v.2 c.1"]
      },
      {
        "id": "b4",
        "bookNumber": 4,
        "callNumber": "959.5 HAL 2020 v.2 c.2",
        "initialSlot": 2,
        "targetSlot": 4,
        "color": DDC_COLORS.ungu,
        "lines": ["959.5", "HAL", "v.2 c.2"]
      },
      {
        "id": "b5",
        "bookNumber": 5,
        "callNumber": "959.5 HAL 2020 v.3 c.1",
        "initialSlot": 3,
        "targetSlot": 5,
        "color": DDC_COLORS.merah,
        "lines": ["959.5", "HAL", "v.3 c.1"]
      }
    ]
  },
  {
    "id": 9,
    "title": "Tahap 9",
    "code": "ddc_level_09",
    "hint": "Anda mampu selesaikan sendiri..",
    "explanation": "Struktur hierarki perpuluhan DDC: Setiap digit tambahan memperkhususkan skop subjek dan wilayah: 720 (Umum) < 720.9 (Sejarah) < 720.95 (Asia) < 720.959 (Asia Tenggara) < 720.9595 (Malaysia).",
    "books": [
      {
        "id": "b1",
        "bookNumber": 1,
        "callNumber": "720 ARC",
        "initialSlot": 2,
        "targetSlot": 1,
        "color": DDC_COLORS.jingga,
        "lines": ["720", "ARC"]
      },
      {
        "id": "b2",
        "bookNumber": 2,
        "callNumber": "720.9 HIS",
        "initialSlot": 5,
        "targetSlot": 2,
        "color": DDC_COLORS.biru,
        "lines": ["720.9", "HIS"]
      },
      {
        "id": "b3",
        "bookNumber": 3,
        "callNumber": "720.95 ASI",
        "initialSlot": 1,
        "targetSlot": 3,
        "color": DDC_COLORS.kuning,
        "lines": ["720.95", "ASI"]
      },
      {
        "id": "b4",
        "bookNumber": 4,
        "callNumber": "720.959 SEA",
        "initialSlot": 4,
        "targetSlot": 4,
        "color": DDC_COLORS.hijau,
        "lines": ["720.959", "SEA"]
      },
      {
        "id": "b5",
        "bookNumber": 5,
        "callNumber": "720.9595 MAL",
        "initialSlot": 3,
        "targetSlot": 5,
        "color": DDC_COLORS.merah,
        "lines": ["720.9595", "MAL"]
      }
    ]
  },
  {
    "id": 10,
    "title": "Tahap 10",
    "code": "ddc_level_10",
    "hint": "Kacang!",
    "explanation": "Penguasaan penuh DDC: Nilai perpuluhan .13 < .133 < .14. Antara buku 005.133, abjad pengarang JAV mendahului PYT, dan jilid 1 mendahului jilid 2.",
    "books": [
      {
        "id": "b1",
        "bookNumber": 1,
        "callNumber": "005.13 SOM 2018",
        "initialSlot": 5,
        "targetSlot": 1,
        "color": DDC_COLORS.biru,
        "lines": ["005.13", "SOM", "2018"]
      },
      {
        "id": "b2",
        "bookNumber": 2,
        "callNumber": "005.133 JAV 2020 v.1",
        "initialSlot": 2,
        "targetSlot": 2,
        "color": DDC_COLORS.kuning,
        "lines": ["005.133", "JAV", "v.1 2020"]
      },
      {
        "id": "b3",
        "bookNumber": 3,
        "callNumber": "005.133 JAV 2020 v.2",
        "initialSlot": 4,
        "targetSlot": 3,
        "color": DDC_COLORS.ungu,
        "lines": ["005.133", "JAV", "v.2 2020"]
      },
      {
        "id": "b4",
        "bookNumber": 4,
        "callNumber": "005.133 PYT 2022",
        "initialSlot": 1,
        "targetSlot": 4,
        "color": DDC_COLORS.hijau,
        "lines": ["005.133", "PYT", "2022"]
      },
      {
        "id": "b5",
        "bookNumber": 5,
        "callNumber": "005.14 PRE 2019",
        "initialSlot": 3,
        "targetSlot": 5,
        "color": DDC_COLORS.merah,
        "lines": ["005.14", "PRE", "2019"]
      }
    ]
  }
];
