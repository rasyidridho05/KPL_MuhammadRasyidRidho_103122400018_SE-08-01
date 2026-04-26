# Tugas Pendahuluan: API Design 

## Source Code
Available in [index.js](./index.js)

## Output
![Output dari Tugas Pendahuluan](./image.png) dan Output endpoint ![Output Endpoint](./image-output.png)

Pada Tugas Pendahuluan kali ini, fokus utamanya adalah membuat simple API dengan Swagger UI sebagai API Documentationnya, untuk memudahkan frontend developer dalam mengonsumsi API. 

## Deskripsi 
Pada Tugas Pendahuluan kali ini, fokus utamanya adalah merancang dan mengimplementasikan RESTful API sederhana yang dilengkapi dengan dokumentasi interaktif menggunakan **Swagger UI**. Pembuatan dokumentasi ini bertujuan untuk memberikan kemudahan bagi sisi *client* (seperti *frontend developer*) dalam memahami kontrak API—termasuk struktur *endpoint*, parameter yang dibutuhkan, serta format respons—tanpa harus membaca *source code* backend secara langsung.

Sistem ini dibangun menggunakan lingkungan **Node.js** dengan *framework* **Express.js**. Terdapat beberapa komponen utama dalam implementasi tugas ini:

1. **Implementasi Routing Dinamis**: 
   API memiliki *endpoint* utama yaitu `/menu/{category}` yang memanfaatkan *path parameter* untuk mengambil data spesifik berdasarkan kategori makanan (contoh: `bakmi` atau `rames`). API juga mengimplementasikan penanganan respons dasar, yaitu mengembalikan status `200 OK` beserta data JSON jika kategori ditemukan, dan `404 Not Found` jika data tidak tersedia.

2. **Integrasi Spesifikasi OpenAPI**: 
   Pembangunan dokumentasi memanfaatkan *library* `swagger-jsdoc`. Definisi API (berbasis spesifikasi OpenAPI 3.0.0) dituliskan secara modular menggunakan anotasi *block comment* (JSDoc) tepat di atas *route handler*. Pendekatan ini memastikan dokumentasi tetap sinkron dengan *source code* yang berjalan.

3. **Penyajian Interactive UI**: 
   Antarmuka dokumentasi disajikan melalui *route* `/docs` menggunakan *library* `swagger-ui-express`. Antarmuka visual ini tidak hanya menampilkan rincian API, tetapi juga menyediakan fitur *Try it out* agar *developer* dapat melakukan *testing request* secara langsung melalui *browser* tanpa memerlukan *tools* pihak ketiga.