/**
 * Mengembalikan "Fizz", "Buzz", "FizzBuzz", atau angka itu sendiri
 * @param {number} value - bilangan bulat
 * @returns {string|number}
 * @throws {Error} jika input bukan number integer
 */
function zzzzOrNum(value) {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    throw new Error("Input harus bilangan bulat");
  }

  if (value % 15 === 0) return "FizzBuzz";
  if (value % 3 === 0) return "Fizz";
  if (value % 5 === 0) return "Buzz";

  return value;
}

/**
 * Mengubah array angka menjadi array hasil FizzBuzz
 * @param {number[]} sequence - array bilangan bulat
 * @returns {(string|number)[]}
 * @throws {Error} jika input bukan array atau isi bukan integer
 */
function fizzBuzz(sequence) {
  if (!Array.isArray(sequence)) {
    throw new Error("Input harus array");
  }

  // Validasi semua isi array
  sequence.forEach((el) => {
    if (typeof el !== "number" || !Number.isInteger(el)) {
      throw new Error("Semua elemen harus bilangan bulat");
    }
  });

  const newSequence = sequence.map((e) => zzzzOrNum(e));

  return newSequence;
}

module.exports = {
  fizzBuzz,
  zzzzOrNum,
};