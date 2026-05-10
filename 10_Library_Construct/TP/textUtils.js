export function hitungHuruf(teks) {
  const match = teks.match(/[a-zA-Z]/g);
  return match ? match.length : 0;
}

export function hitungKata(teks) {
  const teksBersih = teks.trim();
  if (!teksBersih) return 0;

  return teksBersih.split(/\s+/).length;
}