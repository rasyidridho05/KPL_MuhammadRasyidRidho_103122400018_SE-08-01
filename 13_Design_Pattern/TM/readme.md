# Tugas Mandiri 13: Design Pattern

## Memahami Event Delegation pada JavaScript

### 1. Apa itu Event Delegation?

**Event Delegation** adalah sebuah _design pattern_ (pola desain) dalam penanganan _event_ DOM di JavaScript. Alih-alih menambahkan _event listener_ pada setiap elemen anak (_child elements_) satu per satu, kita cukup menambahkan satu buah _event listener_ pada elemen induknya (_parent element_).

Elemen induk ini nantinya yang akan mendengarkan dan mendelegasikan aksi berdasarkan elemen anak mana yang sebenarnya memicu _event_ tersebut.

### 2. Konsep Dasar: _Event Bubbling_

Event Delegation dapat bekerja karena adanya mekanisme alami di dalam browser yang disebut **Event Bubbling**.
Saat sebuah elemen (misalnya sebuah tombol) diklik, _event_ tersebut tidak hanya berhenti di tombol itu saja. _Event_ tersebut akan "menggelembung" (_bubble up_) ke atas menuju elemen pembungkusnya, lalu ke induknya lagi, hingga akhirnya mencapai pangkal DOM (`document`).

Dengan menaruh _listener_ di elemen induk, kita mencegat _event_ yang sedang menggelembung tersebut dan memeriksa asal usulnya menggunakan properti `event.target`.

### 3. Analogi Sederhana

Bayangkan sebuah kantor dengan 100 karyawan. Jika ada paket yang datang untuk masing-masing karyawan, ada dua pendekatan yang bisa dilakukan:

- **Tanpa Delegasi:** Kantor mempekerjakan 100 kurir khusus yang masing-masing hanya menunggu paket untuk satu karyawan tertentu. (Sangat boros dan tidak efisien).
- **Dengan Delegasi:** Kantor mempekerjakan 1 Resepsionis (Elemen Induk). Saat ada paket datang, Resepsionis akan menerima paket tersebut, melihat nama yang tertera (`event.target`), lalu menyerahkannya ke karyawan yang tepat. (Jauh lebih hemat dan terpusat).

### 4. Mengapa Event Delegation Sangat Penting? (Keuntungan)

Pola ini memberikan beberapa keuntungan krusial dalam pengembangan web modern:

- **Penghematan Memori (_Memory Efficiency_):** Menempelkan 1.000 _event listener_ pada 1.000 baris tabel akan sangat membebani RAM (memori) _browser_. Dengan delegasi, kita hanya butuh 1 _event listener_ di elemen `<tbody>` atau `<table>`.
- **Mendukung Elemen Dinamis (_Dynamic Elements_):** Jika kita menambahkan baris data baru ke dalam tabel menggunakan JavaScript (misalnya hasil _fetch_ dari API), kita tidak perlu repot-repot menempelkan _event listener_ baru ke elemen yang baru dibuat tersebut. Elemen induk akan secara otomatis menanganinya.
- **Kode Lebih Bersih (_Cleaner Code_):** Mengurangi _boilerplate_ (kode berulang) yang tidak perlu, sehingga _maintenance_ program jauh lebih mudah.

### 5. Contoh Implementasi Kode

**Tanpa Event Delegation (Praktik Buruk):**

```javascript
const buttons = document.querySelectorAll(".btn-delete");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    console.log("Item dihapus!");
  });
});
```