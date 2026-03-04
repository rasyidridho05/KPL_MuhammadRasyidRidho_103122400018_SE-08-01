// Buatlah array berisi 3 element tentang minuman kesukaan, dan simpan dalam variable list minuman.
// Ganti 2 elemen pertama dengan minuman kesukaan lain, dengan cara index dan penugasan.
// Tambah 1 minuman di depan array.

const listMinuman = ["Kopi", "Jus Apukat", "Susu"];
console.log("First Condition \t:", listMinuman);

listMinuman[0] = "Teh";
listMinuman[1] = "Air Mineral";
//alternative -> listMinuman.splice(0, 2, "Teh", "Air Mineral");
console.log("After Updating \t\t:", listMinuman);

listMinuman.unshift("Matcha");
console.log("After Adding \t\t:", listMinuman);

// Tuliskan sebuah fungsi yang menerima N bilangan dan mengembalikan nilai penjumlahan dari 1 sampai N.
function sum(n) {
    let result = 0
    for (let i = 1; i <= n; i++) {
        result += i
    }
    return result

    while (n > 0) {
        result += n
        n--
    }
    return result

    if (n < 0) {
        return 0;
    } else {
        return (n * (n + 1)) / 2;
    }
}

console.log("Input n\t: ", 65546, "\nResult\t: ", sum(65546));