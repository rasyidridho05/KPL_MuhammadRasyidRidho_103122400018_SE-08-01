# Tugas Mandiri 14: Clean Code

---

## Analisis Perbandingan Kode

**Pertanyaan:**
Dari dua kode di bawah ini, mana yang kamu ingin cari masalahnya dan perbaiki di tengah-tengah malam, katakanlah jam 1 malam? Mengapa?

**Jawaban:**
Jika saya harus melakukan _debugging_ dan mencari masalah pada jam 1 malam dalam kondisi lelah, saya akan dengan tegas memilih **Kode Kedua (yang berada di bawah)**.

Berikut adalah alasan teknis mengapa kode kedua jauh lebih baik dan sesuai dengan prinsip _Clean Code_:

### 1. Menghindari _Arrow Anti-Pattern_ (Nested If)

Pada **kode pertama**, logika ditulis menggunakan struktur percabangan `if` yang bersarang berlapis-lapis. Semakin banyak kondisi, kode akan semakin menjorok ke kanan menyerupai anak panah (_Arrow Anti-Pattern_). Saat kondisi mengantuk atau lelah kognitif, melacak kurung kurawal `{}` penutup mana yang milik kondisi mana akan sangat membingungkan dan rentan menimbulkan _bug_ baru saat diedit.

### 2. Menerapkan _Guard Clause_ (Early Return)

Pada **kode kedua**, struktur bersarang tersebut dihilangkan menggunakan teknik _Guard Clause_. Alih-alih membungkus aksi utama (`doSomething(user)`) ke dalam blok kondisi yang dalam, kode ini mengecek kondisi kegagalan di awal dan langsung menghentikan eksekusi (`return null`). Hal ini membuat _happy path_ (jalur sukses) berada pada level indentasi terluar, sehingga alur utama fungsi dapat terbaca sekilas dalam hitungan detik.

### 3. Ekstraksi Logika (Pemisahan Tanggung Jawab)

**Kode kedua** menerapkan prinsip _Single Responsibility_. Alih-alih menumpuk kondisi pengecekan (`user && user.isActive && user.hasPermission`) di dalam fungsi utama, kondisi tersebut dipisah menjadi fungsi tersendiri yang deskriptif, yaitu `isValidCandidate(user)`.
Hal ini memberikan dua keuntungan besar:

- Fungsi `processUser` menjadi sangat bersih dan hanya fokus pada _alur_ eksekusi.
- Jika di masa depan ada penambahan atau pengurangan syarat validasi kandidat, _developer_ hanya perlu fokus memperbaiki fungsi `isValidCandidate` tanpa menyentuh dan mengganggu alur di fungsi utama.