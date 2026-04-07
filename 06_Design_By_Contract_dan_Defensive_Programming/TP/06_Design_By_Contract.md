# TP KPL 06: Design by Contract dan Defensive Programming

### Analisis antara penggunaaan Asersi dan Eksepsi

```
const assert = require('assert');

function divide(a, b) {
  assert(typeof a === 'number' && typeof b === 'number', 'Nilai harus bilangan bulat');

  assert(b !== 0, 'Tidak bisa pembagian dengan nol');

  return a / b;
}
```

```
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Nilai harus bilangan bulat");
  }

  if (b === 0) {
    throw new Error("Tidak bisa pembagian dengan nol");
  }

  return a / b;
}

try {
  const result = `divide`(10, 2);
  console.log("Hasilnya adalah:", result);
} catch (error) {
  console.error("Error:", error);
}
```

Pada contoh pertama, fungsi `divide` menggunakan assert untuk memeriksa dua hal, yaitu apakah a dan b bertipe number, dan apakah b bukan nol. Pada contoh kedua, pemeriksaaan yang sama dilakukan dengan `throw new TypeError` dan `throw new Error`, lalu dipanggil dalam blok `try-catch`.
Kapankah menggunakan asersi atau eksepsi? Asersi paling tepat digunakan untuk memverifikasi kontrak internal, yaitu asumsi yang dibuat programmer tentang bagaimana kode mereka sendiri akan digunakan. Asersi cocok untuk:
1.	Precondition internal, fungsi yang hanya dipanggil oleh kode internal yang sudah kita control penuh.
2.	Debugging dan development, menangkap bug logic programmer selama development.
3.	Kondisi yang mustahil terjadi, seperti assert(id >= 0) setelah logika yang sudah menjamin nilai positif.
Namun asersi memiliki kelemahan berupa dibanyak environment production, asersi dinonaktifkan. Artinya, jika kode bergantung pada asersi untuk validasi input dari luar, keamanan tersebut hilang di production dan sangat berbahaya.

Sedangkan, kapankah penggunaan eksepsi? Eksepsi lebih tepat digunakan untuk kondisi runtime yang bisa terjadi diluar kendali programmer. Terutama:
1.	Input dari pengguna atau sistem eksternal, yang tidak dapat dijamin tipenya atau nilainya.
2.	Kondisi yang harus ditangani secara eksplisit. Eksepsi memaksa pemanggil untuk memutuskan apa yang terjkadi jika ada kesalahan.
3.	Kode yang berjalan di production, eksepsi tidak bisa dinonaktifkan, sehingga validasi tetap aktif.
4.	API Public atau library, penggunaan library kita perlu mendapat pesan error yang jelas dan dapat di tangkap.

Sehingga, untuk fungsi `divide` seperti pada contoh lebih tepat menggunakan Eksepsi, karena
1.	Fungsi ini bida menerima input dari mana sajam bisa dari form input user, API, atau database. Tipe dan value b tidak bisa dijamin dicompile time.
2.	Asersi bisa dinonaktifkan, validasi tipe dan pembagian nol Adalah hal kritisbyang harus selalu aktif
3.	Eksepsi memberi control alur yang lebih baik, pemanggil bisa menangkap `TypeError` vs `Error` secara berbeda sesuai kebutuhan.
4.	Pesan error lebih informatif dan terstruktur melalui mekanisme `try-catch`.

Namun, perlu diketahui bahwa pendekatan terbaik adalah menggunakan keduanya secara komplementer, eksepsi untuk validasi input yang datang dari luar system(boundary system), dan asersi untuk invariant internal yang hanya relevan saat development.
