const kotaDikunjungi = ["Semarang", "Pekalongan", "Bandung"]

kotaDikunjungi.push("Brebes");
kotaDikunjungi.pop();
kotaDikunjungi.unshift("Yogyakarta");
kotaDikunjungi.reverse();
kotaDikunjungi.splice(0,1);
kotaDikunjungi.shift(0);

console.log(kotaDikunjungi.slice(1));
console.log(kotaDikunjungi);
