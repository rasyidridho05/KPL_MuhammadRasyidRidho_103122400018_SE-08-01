# Tugas Pendahuluan: Runtime Configuration

## Source Code
Available in [index.js](./index.js)

## Output
![Output dari Tugas Pendahuluan](./image.png)

Pada Tugas Pendahuluan kali ini, fokus utamanya adalah menampilkan waktu saat ini dengan format bahasa Indonesia yang baku menggunakan fitur bawaan JavaScript.

## Deskripsi 
Pada Tugas Pendahuluan kali ini, fokus utamanya adalah menampilkan waktu saat ini dengan format bahasa Indonesia yang baku menggunakan fitur bawaan JavaScript.

### Implementasi Intl.DateTimeFormat
Untuk menghasilkan format tanggal **"Sabtu, 18 April 2026"**, saya menggunakan objek `Intl.DateTimeFormat` daripada melakukan manipulasi string manual. Hal ini memastikan:
1. **Lokalisasi tepat:** Menggunakan locale `id-ID` sehingga nama hari dan bulan otomatis dalam Bahasa Indonesia.
2. **Fleksibilitas:** Memudahkan pengaturan format (apakah bulan ingin tampil penuh/`long` atau angka/`numeric`).

### Manipulasi Tanggal (Date Manipulation)
Selain menampilkan tanggal sekarang, modul ini juga menekankan pada logika pengolahan waktu. Untuk mendapatkan tanggal di waktu yang berbeda (seperti besok atau kemarin), saya menerapkan metode:
* `getDate()`: Mengambil angka tanggal saat ini.
* `setDate()`: Menentukan angka tanggal baru dengan menambahkan atau mengurangi selisih hari.

### Analisis Runtime
Dalam konteks *Runtime Configuration dan Internationalization*, penggunaan `Intl` dan pola `Date` merupakan bentuk pengenalan aturan (*rules*) dalam penyajian informasi. Kode yang dibuat memastikan bahwa input mentah dari sistem (`new Date()`) diproses sedemikian rupa melalui *formatter* agar menghasilkan output yang sesuai dengan tata bahasa yang diinginkan.