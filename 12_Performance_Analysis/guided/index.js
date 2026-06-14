
const f = async () => {
  const n = 80000000;
  const tries = 100;
  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(i);
  }

  let totalBiaya = 0;
  for (let i = 0; i < tries; i++) {
    const index = Math.floor(Math.random() * n);
    const start = new Date();
    array.splice(index, 1); 
    const time = new Date().getTime() - start.getTime();
    totalBiaya += time;
    array.push(-2); 
  }
  console.log(
    "for an array of size",
    n,
    "the average time of",
    tries,
    "splices was:",
    totalBiaya / tries,
  );
};
f();