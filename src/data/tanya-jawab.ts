/* =========================================
   Tanya Jawab Data — Dakwah Tulungagung
   Dijawab oleh Ustadz Moh. Shohibul Umam,
   Lc., M.Pd. Hafidzahullahu Ta'ala
   ========================================= */

export interface TanyaJawabEntry {
  id: number;
  kategori?: string;
  penanya?: string; // e.g. "Perempuan / 36 th"
  pertanyaan: string;
  jawaban: string; // raw text, may contain Arabic
  ustadz: string;
}

export const TANYA_JAWAB_DATA: TanyaJawabEntry[] = [
  {
    id: 1,
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Sebagai seorang nakes, terkadang tanpa disadari pernah berucap atau bertindak yang melukai hati pasien. Namun baru menyadarinya setelah beberapa waktu berlalu. Saat ingin minta maaf, Qadarullah pasien tersebut sudah pulang dari rumah sakit atau bahkan sudah meninggal dunia. Bagaimana cara meminta maaf dan menebus kesalahan tersebut? Khawatir mendapatkan Qisas di Yaumul Akhir.",
    jawaban: `Bismillah wassholatu wassalamu a'lam rasulillah

Yang pertama, hukum asalnya melakukan kesalahan tanpa disadari atau tidak sengaja akan dimaafkan oleh Allah sebagaimana dalam hadits disebutkan:

"إِنَّ اللَّهَ تَجَاوَزَ عَنْ أُمَّتِى الْخَطَأَ وَالنِّسْيَانَ وَمَا اسْتُكْرِهُوا عَلَيْهِ"

"Sesungguhnya Allah memaafkan umatku ketika ia tidak sengaja, lupa atau dipaksa." (HR. Ibnu Majah, no. 2043)

Yang ke dua, akan tetapi jika kesalahan itu berkaitan dengan orang lain, maka Allah akan tetap menghisabnya di akhirat nanti. Nabi shallallahu 'alaihi wa sallam bersabda:

"مَنْ كَانَتْ لَهُ مَظْلَمَةٌ لِأَخِيهِ مِنْ عِرْضِهِ أَوْ شَيْءٍ فَلْيَتَحَلَّلْهُ مِنْهُ الْيَوْمَ..."

"Barang siapa yang pernah berbuat zalim terhadap kehormatan saudaranya atau mengambil sesuatu darinya, hendaknya segera meminta maaf dan kehalalannya (di dunia ini) sebelum tiba hari di mana dinar dan dirham tak lagi bermanfaat..." (HR. Bukhari, no. 2449)

Yang ke tiga, kita tidak tahu apakah pasien tersebut telah memaafkan kita atau belum. Jika dia sudah memaafkan kita, maka syukurlah. Namun jika pasien tersebut belum memaafkan kita di dunia, maka satu-satunya jalan adalah kita bertaubat kepada Allah dan memperbanyak amal shalih kita, karena tidak mungkin lagi untuk meminta maaf kepada orang yang sudah meninggal dunia.

Wallahu a'lam`,
  },
  {
    id: 2,
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Saat mendapatkan pasien kritis yang akan meninggal dunia sedangkan pasien tersebut tidak ada keluarga yang menunggui dan kita tidak tahu apakah pasien tersebut seorang muslim atau non muslim. Bolehkah kita mentalqinya?",
    jawaban: `Bismillah wassholatu wassalamu a'lam rasulillah

Mendorong seorang pasien yang kafir untuk mengucapkan dua kalimat syahadat adalah perbuatan yang baik, karena hal itu merupakan bagian dari upaya mendakwanya ke Islam guna menyelamatkannya dari api neraka.

Ketika Abu Talib mendekati ajalnya, Rasulullah shallallahu 'alaihi wa sallam datang menemuinya dan berkata: "Wahai paman, ucapkanlah 'La ilaha illallah', kalimat yang akan aku saksikan untukmu di hadapan Allah."

Syaikh Ibn Baz pernah ditanya: Apakah diperbolehkan menemani orang kafir yang sedang sekarat dan membimbingnya mengucapkan kalimat syahadat? Beliau menjawab: Hal itu diperbolehkan jika memungkinkan. Dahulu, Nabi shallallahu 'alaihi wa sallam memiliki seorang pelayan Yahudi yang sakit, lalu Nabi mengunjunginya dan membimbingnya mengucapkan kalimat syahadat. Orang Yahudi itu lalu mengucapkannya, lalu Nabi berkata: "Segala puji bagi Allah yang menyelamatkannya dari neraka melalui diriku."

Wallahu a'lam`,
  },
  {
    id: 3,
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Saya sering melihat kenyataan bahwa muslim yang jauh dari Allah (tidak sholat, zalim dengan orang lain, bermaksiat) hidupnya lancar dan baik-baik saja. Sedangkan muslim yang taat, hidupnya tidak sebaik dan selancar mereka, bahkan kerap terkena cobaan. Mohon penjelasan yang lebih komprehensif tentang istidraj dan ujian bagi orang beriman.",
    jawaban: `Bismillah wassholatu wassalamu a'lam rasulillah

Ada dua orang yang sama-sama mendapatkan warisan senilai 100 juta. Orang pertama menggunakan uang tersebut untuk berfoya-foya. Sedangkan orang kedua menggunakan uangnya sebagian untuk memenuhi kebutuhannya dan sebagiannya dia investasikan. Mana dari kedua orang tersebut yang masih bisa menikmati warisan di tahun-tahun berikutnya?

Begitulah perumpamaan seorang yang taat beragama dengan orang yang tidak taat. Tidak aneh jika semakin jauh orang tersebut dari agama maka semakin makmur hidupnya, karena memang dia totalitas untuk hanya hidup di dunia.

Dan ini adalah bentuk keadilan Allah ta'la. Allah berikan untuk orang yang mengejar dunia, dunia yang dia kejar — tapi dia tidak mendapatkan apa-apa di akhirat kelak.

Allah Subhanahu Wa Ta'ala berfirman (QS. Al-Isra' 17: 18-19):
"مَنْ كَا نَ يُرِيْدُ الْعَا جِلَةَ عَجَّلْنَا لَهٗ فِيْهَا مَا نَشَآءُ لِمَنْ نُّرِيْدُ ثُمَّ جَعَلْنَا لَهٗ جَهَنَّمَ..."

"Barang siapa menghendaki kehidupan sekarang (duniawi), maka Kami segerakan baginya di dunia ini apa yang Kami kehendaki... Kemudian Kami sediakan baginya (di akhirat) Neraka Jahanam."

Dan janji Allah kepada orang-orang yang berbuat ketaatan (QS. An-Nahl 16: 97):
"مَنْ عَمِلَ صَا لِحًـا مِّنْ ذَكَرٍ اَوْ اُنْثٰى وَهُوَ مُؤْمِنٌ فَلَـنُحْيِيَنَّهٗ حَيٰوةً طَيِّبَةً..."

"Barang siapa mengerjakan kebajikan, baik laki-laki maupun perempuan dalam keadaan beriman, maka pasti akan Kami berikan kepadanya kehidupan yang baik..."

Wallahu a'lam`,
  },
  {
    id: 4,
    penanya: "Perempuan / 36 tahun",
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Bagaimana jawaban saya terhadap pertanyaan anak perempuan yang kritis tentang ayahnya yang tidak taat kepada Allah dan sering berbuat dzolim? Saya khawatir tentang contoh figur laki-laki untuk anak saya di masa depannya.",
    jawaban: `Bismillah wassholatu wassalamu a'la rasulillah

Semoga Allah memperbaiki kondisi suami dan keluarga penanya.

Yang pertama, tekankan kepada anak anda bahwa sosok yang paling pantas untuk dicontoh adalah Nabi Muhammad shallallahu 'alaihi wasallam, dan setiap manusia itu diuji oleh Allah — ada yang diuji dengan ekonomi, sakit, ditinggal oleh orang yang dicintai, dan lain-lain.

Yang ketiga, tekankan juga bahwa ayah saat ini sedang diuji hawa nafsunya oleh Allah, apakah ayah akan berhasil atau tidak, maka kita harus membantu ayah untuk bisa terus Istiqomah di atas agama Allah.

Yang ke empat, mari kita bantu ayah dengan mendoakan kebaikan agar beliau mendapatkan hidayah, dan kita berusaha untuk memberikan nasehat dengan cara yang baik.

Wallahu a'lam`,
  },
  {
    id: 5,
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Bolehkah seorang nakes ketika akan melakukan suatu tindakan yang dirasa sulit, melakukan sholat sunnah 2 rakaat dulu untuk memohon pertolongan dan petunjuk dari Allah agar dimudahkan? Apakah hal tersebut dibolehkan untuk dirutinkan dan bukan termasuk bid'ah?",
    jawaban: `Bismillah wassholatu wassalamu a'la rosulillah

Boleh saja, karena Nabi shallallahu 'alaihi wa sallam diceritakan oleh sahabat Jabir bin Abdillah Radhiyallahu 'anhuma:

"كَانَ رَسُولُ اللَّهِ – صلى الله عليه وسلم – يُعَلِّمُ أَصْحَابَهُ الاِسْتِخَارَةَ فِى الأُمُورِ كُلِّهَا"

"Rasulullah shallallahu 'alaihi wa sallam biasa mengajari para sahabatnya shalat istikharah dalam setiap urusan." (HR. Bukhari no. 7390)`,
  },
  {
    id: 6,
    penanya: "Perempuan / 46 tahun",
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Saat ditunjuk sebagai kepala puskesmas, sampai sejauh mana tanggung jawab di akhirat nanti berkenaan dengan staf yang dipimpin? Mengingat ini instansi pemerintah, agak sulit mengkondisikan staf agar bekerja sesuai syariah Islam (soal musik, pakaian, ikhtilat, dll). Apakah bertahan sebagai kepala puskesmas lebih baik atau mengundurkan diri?",
    jawaban: `Bismillah wassholatu wassalamu a'lam rasulillah

Semoga Allah memudahkan urusan anda.

Yang pertama, kaedah utama dalam amar makruf nahi munkar adalah kita melakukannya untuk mendapatkan pahala dari Allah, di dalam jalan Allah, dan dengan pertolongan Allah.

Yang ke dua, anda bisa menekankan kepada para staf bahwa amar makruf nahi munkar yang anda lakukan adalah untuk kebaikan mereka.

Yang ke tiga, dalam melakukan ketaatan kepada Allah, kita melakukannya semampu kita. Jika kita sudah berusaha sebaik mungkin dan ternyata ada saja staf yang melanggar, maka itu sudah di luar kemampuan kita dan insya Allah kita tidak berdosa. Allah berfirman:

"إِنَّكَ لَا تَهْدِي مَنْ أَحْبَبْتَ وَلَٰكِنَّ اللَّهَ يَهْدِي مَن يَشَاءُ..."

"Sesungguhnya engkau (Muhammad) tidak akan dapat memberi hidayah (petunjuk) kepada orang yang kamu kasihi, tetapi Allah memberi hidayah kepada orang yang Dia kehendaki." (Al-Qashash: 56)

Yang ke empat, coba anda istikharah kepada Allah terkait keputusan untuk bertahan atau mencari pekerjaan lain. Nasehat saya, coba dalam beberapa bulan atau 1 tahun untuk melakukan perubahan yang baik — namun jika perubahan baik itu sangat minim, sebaiknya anda bisa resign untuk menyelamatkan agama kita.

Wallahu a'lam`,
  },
  {
    id: 7,
    penanya: "Perempuan / 36 tahun",
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Saya ingin anak perempuan saya bisa bersekolah di tempat yang memiliki pendidikan agama yang baik, namun suami belum mengizinkan masuk pondok pesantren. Bagaimana prioritas dalam memilih SMP? Dan bagaimana hukum memberikan hadiah untuk guru anak-anak, atau memberikan bantuan medis kepada ustadzah yang berkonsultasi tentang kesehatannya?",
    jawaban: `Bismillah wassholatu wassalamu a'la rosulillah

Semoga Allah ta'la senantiasa menjaga keluarga anda untuk bisa Istiqomah di atas Sunnah Rasulullah.

Yang pertama, untuk pendidikan di SMP, usahakan minimal untuk mencari sekolah yang terpisah antara putra dengan putri, kemudian kurikulum yang baik, dan para pendidik yang amanah. Jika ibu tidak bekerja dan full di rumah, mungkin bisa dicoba opsi homeschooling yang kurikulumnya sudah sesuai syariat Islam.

Yang ke dua, jika anda berniat untuk memberikan hadiah atau bantuan kepada beberapa guru, sebaiknya anda meminta izin secara langsung kepada pihak kepala sekolah. Hadiah untuk guru tidak boleh jika hanya diberikan kepada guru tertentu dan tanpa izin atau sepengetahuan kepala sekolah. Namun jika kepala sekolah telah mengizinkan, maka boleh bagi walimurid untuk memberikan hadiah tersebut.

Wallahu a'lam`,
  },
  {
    id: 8,
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Saya adalah bidan yang bekerja di RS swasta. Kami kadang mau tidak mau harus merekayasa data hasil pemeriksaan pasien supaya bisa ditanggung BPJS (dengan niatan menolong pasien). Apakah kami berdosa? Apakah gaji dari pendapatan BPJS seperti ini halal?",
    jawaban: `Bismillah wassholatu wassalamu a'la rosulillah

Pertama-tama harus anda ketahui bahwa sogokan yang haram adalah yang bisa mengantarkan seseorang kepada sesuatu yang batil — misalnya menyogok hakim agar memutuskan dengan cara yang batil. Ini hukumnya haram.

Adapun sogokan yang mengantarkan seseorang kepada haknya — misalnya ia tidak mungkin mendapatkan haknya kecuali dengan memberi uang — maka ini hukumnya haram bagi si penerima tapi tidak haram bagi si pemberi, karena si pemberi memberikannya untuk memperoleh haknya. (Fatawa Syaikh Ibnu Utsaimin, hal 16-18)

Maka selama niat anda benar-benar untuk menolong pasien agar pasien mendapatkan haknya untuk layak mendapatkan BPJS, insya Allah tidak mengapa. Imam Al-Mawardi menyatakan: "Terkait hukum memberi suap, bila motivasinya demi menyelamatkan haknya atau menghindari perilaku semena-mena, maka tidak haram." (Al-Hawi Al-Kabir, 16:284)

Tapi janganlah bermudah-mudahan dalam hal tersebut jika bukan dalam urusan mengembalikan hak orang lain.

Wallahu a'lam`,
  },
  {
    id: 9,
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Sebentar lagi musim haji. Adakah ajaran bahwa kita harus berkunjung kepada yang baru pulang haji atau umrah?",
    jawaban: `Bismillah was shalatu was salamu 'ala Rasulillah, amma ba'du.

Terdapat beberapa dalil yang menunjukkan bahwa para sahabat menyambut kedatangan Rasulullah shallallahu 'alaihi wa sallam dari safar. Diantaranya hadis dari Ibnu Abbas Radhiyallahu 'anhuma:

"لَمَّا قَدِمَ النَّبِيُّ صلى الله عليه وسلم مَكَّةَ اسْتَقْبَلَتْهُ أُغَيْلِمَةُ بَنِي عَبْدِ الْمُطَّلِبِ..."

Ketika Nabi shallallahu 'alaihi wa sallam datang di Mekah, anak-anak kecil bani Abdul Muthalib menyambut kedatangan beliau. (HR. Bukhari 1798)

Imam Bukhari membuat judul bab: "Bab, menyambut kedatangan jamaah haji yang baru pulang."

Acara makan-makan dalam rangka penyambutan orang yang baru pulang haji disebut an-Naqi'ah. Imam an-Nawawi mengatakan bahwa dianjurkan untuk mengadakan naqi'ah, yaitu hidangan makanan yang digelar sepulang safar.

Allahu a'lam.`,
  },
  {
    id: 10,
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Bila kepala keluarga berqurban kambing atau sapi atas nama keluarganya (anak dan istri), apakah istri dan anak juga harus menahan diri dari potong rambut dan kuku selama 1 Dzulhijjah hingga qurban disembelih?",
    jawaban: `Bismillah wassholatu wassalamu a'la rasulillah

Yang wajib menahan diri untuk tidak memotong kuku dan rambut hanya suami saja.

Hal ini berdasarkan dzahir hadis berikut:

"مَنْ كَانَ لَهُ ذِبْحٌ يَذْبَحُهُ فَإِذَا أُهِلَّ هِلاَلُ ذِى الْحِجَّةِ فَلاَ يَأْخُذَنَّ مِنْ شَعْرِهِ وَلاَ مِنْ أَظْفَارِهِ شَيْئًا حَتَّى يُضَحِّىَ"

"Siapa saja yang ingin berqurban dan apabila telah memasuki awal Dzulhijah, maka janganlah ia memotong rambut dan kukunya sampai ia berqurban." (HR. Muslim)

Pada hadis di atas, Nabi shallallahu 'alaihi wa sallam mengaitkan larangan memotong kuku dan rambut dengan si pengkurban saja — yakni yang keluar biaya untuk beli kurban.

Wallahu a'lam`,
  },
  {
    id: 11,
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Bagaimana syarah/tafsirnya jika istiqamah tidak sedih (Surat Yunus ayat 62, Surat Al-Baqarah ayat 38)? Sedangkan ayahnya Nabi Musa sedih sampai buta, dan Nabi ﷺ juga bersedih saat ditinggal wafat istrinya. Apakah para Nabi bukan termasuk yang istiqamah?",
    jawaban: `Bismillah wassholatu wassalamu a'la rosulillah

Pertanyaan ini muncul karena ada kesan seakan-akan ayat tentang istiqamah dan hidayah menafikan seluruh rasa sedih secara mutlak. Padahal para nabi sendiri pernah bersedih. Maka perlu dibedakan antara:

• Sedih tabi'i (alami/manusiawi)
• Sedih yang tercela — yaitu kesedihan yang lahir dari lemahnya iman, protes terhadap takdir, atau ketakutan terhadap masa depan akhirat.

Tafsir Ibnu Katsir pada QS. Yunus: 62 menjelaskan:
"أي: لا يخافون مما يستقبلونه من أهوال القيامة، ولا يحزنون على ما وراءهم في الدنيا"
"Yakni mereka tidak takut terhadap dahsyatnya perkara yang akan mereka hadapi pada hari kiamat, dan tidak bersedih terhadap dunia yang mereka tinggalkan."

Artinya, "tidak takut dan tidak bersedih" dalam ayat-ayat tersebut bukan berarti hilangnya seluruh kesedihan manusiawi. Yang dinafikan adalah kesedihan terhadap dunia dan akhirat — bukan kesedihan yang bersifat fitrah manusia.

Ketika putra Nabi Ibrahim wafat, beliau bersabda:
"Sesungguhnya mata menangis dan hati bersedih, namun kami tidak mengatakan kecuali yang diridhai Rabb kami." (Sahih al-Bukhari no. 1303)

Hadis ini adalah kaidah besar: sedih dan menangis itu fitrah — yang tercela adalah ucapan dan sikap yang melampaui batas terhadap takdir Allah.

Wallahu a'lam`,
  },
  {
    id: 12,
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Bagaimana cara mengingatkan sholat dengan cara yang baik dan halus? Banyak dari teman-teman nakes yang sering melalaikan sholat dengan alasan sibuk.",
    jawaban: `Bismillah wassholatu wassalamu a'la rasulullah

Semoga Allah membalas niat kebaikan antum dengan pahala yang besar. Ada beberapa cara efektif:

1. Gunakan Pendekatan Tidak Langsung — Hindari menegur di depan umum atau menggunakan kalimat yang menghakimi. Lebih baik gunakan sapaan santai seperti: "Yuk, shalat dulu, mumpung waktu luang sebentar."

2. Ajak Bersamaan — Daripada hanya memerintah, coba ajak secara langsung: "Aku mau ke mushola nih, bareng yuk?" Ini terasa lebih ringan dan tidak menggurui.

3. Berikan Keteladanan — Tunjukkan sikap profesional kerja yang baik sekaligus konsisten menjaga waktu shalat. Ketika teman melihat anda selalu menyempatkan shalat di sela kesibukan, mereka akan terdorong untuk meniru.

4. Gunakan Media yang Santai — Sesekali kirim gambar jadwal shalat harian, stiker Islami yang lucu, atau kutipan singkat tentang ibadah via WhatsApp.

5. Mendoakan — Mengingatkan teman adalah bentuk kasih sayang sesama muslim. Jika teguran lisan belum berhasil, iringi dengan doa terbaik untuk mereka di setiap kesempatan.

Wallahu a'lam bisshowab`,
  },
  {
    id: 13,
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Sebaiknya sholat tahajjud dilakukan sendiri atau berjamaah bersama suami? Saya merasa lebih nyaman sholat sendiri dan leluasa berdoa sendiri, tapi suami bilang sunnahnya berjamaah.",
    jawaban: `Bismillah wassholatu wassalamu a'la rasululillah

Hukum asal shalat sunnah adalah dikerjakan sendirian. Syaikhul Islam Ibnu Taimiyah dalam Majmu'ah Al-Fatawa (23:414) menyebutkan bahwa umumnya shalat sunnah Nabi shallallahu 'alaihi wa sallam dilakukan munfarid (sendirian).

Jika dilakukan berjamaah suami dan istri maka diperbolehkan, tetapi tidak boleh menjadi kebiasaan, karena pada hakekatnya sholat sunnah sesuai dengan kemampuan masing-masing — ada yang doanya panjang, ada yang doanya pendek. Jadi jika dilakukan sesekali maka boleh, tetapi jika menjadi kebiasaan maka tidak diperbolehkan.

Wallahu a'lam`,
  },
  {
    id: 14,
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Seorang wanita meninggal dunia dengan meninggalkan suami, 1 anak laki-laki (dari suami sebelumnya), dan 1 kakak perempuan. (1) Apakah tabungan haji termasuk harta waris? (2) Apakah tabungan dari sisa nafkah suami langsung dibagi atau dikeluarkan dulu? (3) Apakah kakak perempuan berhak mendapat warisan?",
    jawaban: `Waalaikumsalam warahmatullahi wabarakatuh, bismillah wassholatu wassalamu a'la rasulillah.

1. Tabungan haji beliau termasuk warisan, atau bisa saja digunakan oleh suami atau anaknya untuk pelimpahan nomor porsi keberangkatan haji.

2. Nafkah dari suami yang ditabung oleh istri kemudian istri tersebut wafat maka termasuk harta warisan istri yang dibagikan langsung kepada ahli warisnya.

3. Pembagian warisan:

A. Bagian suami adalah 1/4 atau 25% dari seluruh harta warisan istrinya (QS. An-Nisa: 12).

B. Bagian anak laki-laki adalah sisa setelah bagian suami, atau lebih tepatnya 75% dari harta istri (HR. Bukhari no. 6732 dan Muslim no. 1615).

C. Saudari perempuan tidak mendapatkan bagian dari warisan tersebut karena bagiannya tertutup disebabkan adanya anak laki-laki.

Wallahu a'lam`,
  },
  {
    id: 15,
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Bagaimana hukumnya sering menjamak sholat? Saya perawat bedah dan kalau operasi sering sekali jamak 2 sholat karena durasi operasi yang lama. Mau gantian perawat juga tidak bisa karena keterbatasan SDM.",
    jawaban: `Waalaikumsalam warahmatullahi wabarakatuh, bismillah wassholatu 'ala rasulillah.

Islam adalah agama yang memberikan kemudahan dalam perkara-perkara yang membuat kesulitan pada seorang muslim. Ibnu Abbas Radhiyallahu anhu meriwayatkan:

"جَمَعَ رَسُولُ اللهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ بَيْنَ الظُّهْرِ وَالْعَصْرِ وَالْمَغْرِبِ وَالْعِشَاءِ بِالْمَدِينَةِ فِى غَيْرِ خَوْفٍ وَلاَ مَطَرٍ..."

"Rasulullah menjama' antara Zhuhur dan Ashar, Maghrib dan Isya di Madinah, bukan karena takut dan juga bukan karena hujan." (HR. Muslim)

Syaikhul-Islam Ibnu Taimiyah juga membolehkan jama' bagi para buruh dan pekerja yang merasakan kesulitan pada waktu tertentu. (Majmu' Fatawa, 21:458)

Kasus dalam pertanyaan anda termasuk udzur, sehingga dibolehkan untuk menjama' shalat. Sebab, apabila operasi ditinggal di tengah-tengah pekerjaan untuk melaksanakan shalat, hal itu akan menimbulkan madharat bagi pasien.

Caranya: kerjakan shalat Ashar di waktu Zhuhur tersebut sebelum operasi. Kemudian untuk Shalat Maghrib dan Isya dijama' setelah usai operasi.

Wallahu a'lam`,
  },
  {
    id: 16,
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Apa yang bisa kita lakukan sebagai keluarga bila ada saudara atau anggota keluarga yang sedang dirawat di ICU dalam keadaan koma agar kita bisa tetap mendampingi untuk talqin, sementara kita tahu bahwa tidak boleh ada penunggu pasien di ruang ICU?",
    jawaban: `Bismillah wassholatu wassalamu a'lam rosulillah

Berikut saran dari seorang dokter spesialis bedah yang bekerja di RS:

• Ada kalanya pasien mendadak memburuk kondisinya sehingga tidak sempat memanggil keluarga pasien (misal pada kasus henti jantung mendadak) — maka kami sebagai nakes yang membantu mentalqin pasien tersebut.

• Namun jika perburukan tidak mendadak (misal pada kasus penyakit kronis seperti stroke atau kanker) — maka saat kondisi mulai memburuk, keluarga dipersilahkan masuk untuk mentalqin.

• Atau bisa juga keluarga pasien minta ke petugas, meminta jika kondisi pasien memburuk diijinkan untuk mentalqin. InsyaAllah oleh petugas akan diijinkan jika kondisinya memungkinkan.

Tambahan: jangan lupakan doa kebaikan untuk keluarga yang sedang dirawat di ICU tersebut, agar diwafatkan dalam kondisi menyebut kalimat tauhid.

Wallahua'lam`,
  },
  {
    id: 17,
    ustadz: "Ustadz Moh. Shohibul Umam, Lc., M.Pd.",
    pertanyaan:
      "Beberapa pekan yang lalu saya diberi ujian yang cukup membuat saya tertekan hingga menimbulkan rasa cemas yang hebat. Alhamdulillah Allah beri pertolongan dan rasa cemas sudah berangsur hilang. Namun terkadang rasa cemas itu muncul tiba-tiba. Mohon nasehatnya, ikhtiar apa yang bisa dilakukan untuk menepis rasa cemas saat muncul kembali?",
    jawaban: `Bismillah wassholatu wassalamu a'la rasulillah

Semoga beberapa nasehat ini bisa mengurangi kecemasan penanya:

1. Sadari dan terima bahwa anda sedang mengalami kecemasan — lalu ungkapkan isi hati dengan jujur. Bersikaplah lebih lembut kepada diri anda sendiri dan cari lingkungan yang membuat anda merasa diterima.

2. Bangun cara hidup yang sehat: mendekat kepada Allah dengan shalat, dzikir, membaca Al-Qur'an, dan memperbanyak shalawat. Diiringi dengan olahraga, tidur cukup, dan aktivitas positif.

Diantara doa yang diajarkan Nabi Muhammad shallallahu 'alaihi wasallam:

"اللَّهُمَّ إنِّي أعُوذُ بكَ مِنَ الهَمِّ والحَزَنِ، والعَجْزِ والكَسَلِ، والجُبْنِ والبُخْلِ، وضَلَعِ الدَّيْنِ، وغَلَبَةِ الرِّجالِ"

"Ya Allah aku berlindung kepada-Mu dari kesedihan dan kegundahan, dari rasa lemah dan malas, dari rasa takut dan pelit, dari terlilit hutang, dan dari direndahkan manusia." (HR. Bukhari no. 6369)

3. Alihkan fokus dari diri sendiri kepada membantu orang lain — karena terlalu larut memikirkan diri sendiri sering memperbesar rasa cemas.

4. Perkuat iman kepada takdir Allah. Keyakinan bahwa segala sesuatu yang terjadi adalah bagian dari ketentuan Allah Yang Maha Bijaksana memberikan ruang bagi seorang Muslim untuk melepaskan kecemasan yang berlebihan.

Rasulullah ﷺ bersabda: "Seandainya engkau bertawakal kepada Allah dengan sebenar-benarnya, niscaya engkau akan diberi rezeki sebagaimana burung diberi rezeki; ia pergi di pagi hari dalam keadaan lapar dan pulang di sore hari dalam keadaan kenyang." (HR. Tirmidzi)

Jika kecemasan semakin berat dan terus berulang, mencari bantuan profesional adalah langkah yang baik dan bukan tanda lemahnya iman.

Wallahu a'lam`,
  },
];
