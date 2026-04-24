// Konfigurasi dotenv untuk membaca file .env
require('dotenv').config();

const url = process.env.BASE_API;

async function tampilkanKurs() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const rateCNH = data.idr.cnh;
    const rateEUR = data.idr.eur;

    const dateObj = new Date(data.date);
    const formattedDate = new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);

    console.log(`================================================`);
    console.log(`  Data Kurs Tanggal: ${formattedDate}`);
    console.log(`================================================\n`);

    const testValues = [25000, 50000, 100000];

    testValues.forEach(amount => {
      const convertedCNH = amount * rateCNH;
      const convertedEUR = amount * rateEUR;

      const formatIDR = new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR' 
      }).format(amount);

      const formatCNH = new Intl.NumberFormat('zh-CN', { 
        style: 'currency', 
        currency: 'CNH' 
      }).format(convertedCNH); 

      const formatEUR = new Intl.NumberFormat('de-DE', { 
        style: 'currency', 
        currency: 'EUR' 
      }).format(convertedEUR);

      console.log(`${formatIDR}`);
      console.log(`    CNH : ${formatCNH}`);
      console.log(`    EUR : ${formatEUR}`);
      console.log(`------------------------------------------------`);
    });

  } catch (error) {
    console.error(" Gagal mengambil data kurs:", error.message);
  }
}

tampilkanKurs();