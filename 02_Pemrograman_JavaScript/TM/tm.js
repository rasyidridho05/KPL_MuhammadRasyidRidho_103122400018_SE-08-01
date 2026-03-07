function fizzBuzz(arr) {
  if (!Array.isArray(arr)) {
    return "Input tidak valid";
  }

  const result = arr.map(function (num) {
    if (num === 0 || num % 14 === 0) {
      return "FizzBuzz";
    }
    if (num % 2 === 0) {
      return "Fizz";
    }
    if (num % 7 === 0) {
      return "Buzz";
    }
    return num.toString();
  });

  const plainNumbers = arr.filter(function (num) {
    return num !== 0 && num % 2 !== 0 && num % 7 !== 0;
  });

  const useSpace = plainNumbers.every(function (n) {
    return n > 1;
  });
  const separator = useSpace ? " " : ", ";

  return result.join(separator);
}

module.exports = fizzBuzz;