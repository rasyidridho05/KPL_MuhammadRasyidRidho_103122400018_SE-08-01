/**
 *
 * @param {String} input
 * @returns {String}
 */

function fizzBuzz(input) {
  /**
   * @type {Array<String>}
   */
  const deretLarik = input.split(" ");
  let hasil = "";

  for (const d in deretLarik) {
    const bil = +d;

    let fz = "";

    if (bil % 3 === 0) fz += "Fizz";

    if (bil % 5 === 0) fz += "Buzz";

    if (fz !== "") {
      hasil += `${fz} `;
      continue;
    }
    hasil += `${bil} `;
  }

  return hasil;
}

console.log(fizzBuzz("42 7 89 23 56 12 91 34 68 15"));
