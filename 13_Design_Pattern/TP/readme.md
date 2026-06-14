# Tugas Pendahuluan 13: Design Pattern Implementation

**Repositori:** [ToDoListHarian](https://github.com/bisaqris/ToDoListHarian) (Tugas Besar KPL)

## Design Pattern yang Ditemukan: **Factory Pattern**

### Lokasi Kode

**File:** `backend/src/models/todo.model.js` [todo.model.js](https://github.com/bisaqris/ToDoListHarian/blob/main/backend/src/models/todo.model.js)

```js
export const TodoModel = (data) => ({
  title: data.title,
  description: data.description || "",
  completed: data.completed ?? false,
  priority: data.priority || "medium",
  category: data.category || "general",
  dueDate: data.dueDate || null,
  dueTime: data.dueTime || null,
  createdAt: new Date(),
});
```

**File:** `backend/src/utils/parameterized.js` [parameterized.js](https://github.com/bisaqris/ToDoListHarian/blob/main/backend/src/utils/parameterized.js)

```js
export const createRowMapper = (fieldMap) => (row) =>
  Object.fromEntries(
    Object.entries(fieldMap).map(([responseKey, resolver]) => [
      responseKey,
      typeof resolver === "function" ? resolver(row) : row[resolver],
    ]),
  );
```

**File:** `backend/src/services/todo.service.js` [todo.service.js](https://github.com/bisaqris/ToDoListHarian/blob/main/backend/src/services/todo.service.js)
(penggunaan `createRowMapper`)

```js
const toTodoResponse = createRowMapper({
  id: (row) => String(row.id),1
  userId: (row) => (row.user_id ? String(row.user_id) : null),
  ownerName: (row) => row.owner_name || null,
  title: "title",
  description: "description",
  completed: "completed",
  status: "status",
  statusName: (row) => row.status_name || row.status,
  priority: "priority",
  category: (row) => row.category_code || row.category,
  categoryName: (row) => row.category_name || row.category,
  dueDate: (row) => formatDate(row.due_date),
  dueTime: (row) => (row.due_time ? row.due_time.slice(0, 5) : ""),
  createdAt: "created_at",
  updatedAt: "updated_at",
});
```

---

## Penjelasan Design Pattern

### Apa itu Factory Pattern?

Factory Pattern adalah pola desain **Creational** yang menyediakan antarmuka (interface) untuk membuat objek, tetapi menyerahkan logika pembuatan dan konfigurasi objek ke dalam satu fungsi/kelas khusus — disebut "factory". Pemanggilnya tidak perlu tahu detail konstruksi objek tersebut.

### Bagaimana Factory Pattern digunakan di sini?

**1. `TodoModel` sebagai Simple Factory**

`TodoModel` adalah _factory function_ yang menerima data mentah dari request HTTP, lalu menghasilkan objek todo yang sudah ternormalisasi dengan nilai-nilai default. Pemanggilnya (misalnya `createTodo` di `todo.service.js`) cukup memanggil `TodoModel(data)` tanpa perlu mengurus sendiri setiap field mana yang butuh default value atau transformasi.

```js
// Di todo.service.js — pemanggil tidak perlu tahu detail konstruksi
const todo = TodoModel(data);
```

Tanpa factory ini, logika `priority || "medium"`, `completed ?? false`, `new Date()`, dan lain-lain harus ditulis ulang di setiap tempat yang membuat todo.

**2. `createRowMapper` sebagai Abstract Factory / Factory of Factories**

`createRowMapper` adalah factory tingkat lebih tinggi — ia **memproduksi factory lain**. Dengan memberikan `fieldMap` (peta dari kolom database ke key response), `createRowMapper` menghasilkan sebuah fungsi mapper baru yang siap digunakan untuk mengkonversi baris database ke objek JavaScript yang bersih.

Ini digunakan berulang kali di seluruh codebase untuk berbagai entitas (todo, status transition, dsb.), sehingga tidak ada duplikasi kode transformasi.

### Mengapa ini termasuk Factory Pattern?

| Ciri Factory Pattern                                               | Implementasi di Kode                                                              |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Pembuatan objek dikapsulasi dalam satu fungsi                      | `TodoModel(data)` mengurus semua field + default                                  |
| Pemanggil tidak tahu detail konstruksi                             | `createTodo` hanya memanggil `TodoModel(data)`, bukan membuat objek secara manual |
| Hasil selalu berupa objek dengan struktur konsisten                | Semua todo yang dibuat via `TodoModel` selalu punya `createdAt`, `priority`, dsb. |
| Dapat diperluas tanpa mengubah pemanggil                           | Menambah field baru cukup di `TodoModel`, tanpa mengubah `createTodo`             |
| `createRowMapper` menghasilkan factory baru (Higher-Order Factory) | Setiap mapper adalah factory yang siap dipakai untuk mengkonversi baris DB        |

### Manfaat yang Dirasakan di Codebase Ini

- **Konsistensi:** Semua todo yang masuk ke database selalu memiliki default value yang sama (`priority: "medium"`, `completed: false`, dll.).
- **Reusability:** `createRowMapper` dipakai untuk membuat `toTodoResponse`, mapper status transition, dan lainnya — tanpa tulis ulang logika mapping.
- **Maintainability:** Jika struktur objek todo perlu berubah (misalnya tambah field `tags`), cukup ubah `TodoModel` di satu tempat.
- **Testability:** Factory function murni (pure function) sangat mudah diuji seperti yang terlihat di `todo.model.test.js`.

---

_Selain Factory Pattern, repositori ini juga menggunakan **State Pattern** (pada `transitionTodoStatus` yang memodelkan siklus status todo via tabel `todo_status_transitions`) dan **MVC Pattern** (pemisahan `controllers/`, `services/`, `models/`, dan `routes/`). Namun Factory Pattern dipilih karena paling eksplisit dan terlihat jelas dalam kode._