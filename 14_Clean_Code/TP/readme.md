# Tugas Pendahuluan: Refactoring dan Clean Code

## Source Code

[index.js](./index.js)


## Jawaban Tugas Pendahuluan

Pada Tugas Pendahuluan Modul 14 kali ini, fokus utamanya adalah menelaah dan melakukan proses _refactoring_ pada kode JavaScript agar sesuai dengan prinsip _Clean Code_, khususnya penerapan _Single Responsibility Principle_ (SRP).

### 1. Analisis Kode dan Solusi Pemecahan Masalah

Berdasarkan kode yang diberikan pada soal, fungsi `fetchOrderDetails` **belum merepresentasikan kode yang bersih** karena fungsi tersebut memborong terlalu banyak tugas sekaligus di dalam satu lingkup (_scope_).

- **Permasalahan (Bad Practice):** Fungsi utama secara bersamaan melakukan tugas pengambilan data dari API (menggunakan `fetch`), manipulasi antarmuka/DOM (seperti `document.createElement`), dan mengatur _event listener_ pada tombol konfirmasi. Hal ini membuat fungsi menjadi _monolithic_ (_spaghetti code_), sulit dibaca secara linier, dan menyulitkan proses _debugging_ jika terjadi kegagalan di salah satu proses.

- **Solusi Penanganan (Fix):** Masalah ini diselesaikan melalui proses _refactoring_ dengan memecah fungsi raksasa tersebut menjadi beberapa fungsi kecil modular. Masing-masing fungsi difokuskan untuk hanya menangani **satu tanggung jawab spesifik** (_separation of concerns_). Selanjutnya, dibuat satu fungsi koordinator untuk menyatukan alur pemanggilannya.

  **Perbaikan pada `index.js`:**

  ```javascript
  async function getOrderData(orderId, token) {
    try {
      const response = await fetch(`https://example.com/api/order/${orderId}`, {
        headers: { Authorization: token },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  function renderOrderDetails({ id, status }) {
    const detailsDiv = document.getElementById("orderDetails");
    detailsDiv.innerHTML = "";

    const header = document.createElement("h3");
    header.textContent = `Order ID: ${id}`;

    const statusEl = document.createElement("p");
    statusEl.textContent = `Status: ${status}`;

    detailsDiv.append(header, statusEl);
  }

  function setupModalListeners({ id, status }, token) {
    const modal = document.getElementById("orderModal");
    const closeBtn = modal.querySelector(".close");
    const confirmBtn = document.getElementById("confirmOrderBtn");

    closeBtn.onclick = () => {
      modal.style.display = "none";
    };

    if (status === "Delivered") {
      confirmBtn.style.display = "none";
    } else {
      confirmBtn.style.display = "block";
      confirmBtn.onclick = () => confirmOrder(id, token);
    }
  }

  async function showOrderModal(orderId, token) {
    const order = await getOrderData(orderId, token);

    if (order) {
      renderOrderDetails(order);
      setupModalListeners(order, token);

      const modal = document.getElementById("orderModal");
      modal.style.display = "block";
    }
  }
  ```