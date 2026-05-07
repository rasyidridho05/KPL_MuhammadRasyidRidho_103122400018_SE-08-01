/**
 * @param {string} x
 * @param {number} a
 */

export function pslvd(x, a) {
  const coeff = parseInt(x);
  const hasil = a / coeff;
  return {
    x: x,
    dengan: "=",
    hasil,
  };
}

/**
 * @param {string} x
 * @param {number} a
 * @param {number} b
 */

export function pslvt(x, a, b) {
  let hasil = 0;

  if (x.length === 1) {
    hasil = b - a;
  } else if (x.length >= 2) {
    const coeff = parseInt(x);
    hasil = (b - a) / coeff;
  }

  return {
    x: x,
    dengan: "=",
    hasil,
  };
}

/**
 * @param {string} x
 * @param {number} a
 * @param {number} b
 *
 */
export function ptlsvd(x, a, b, op) {
  let hasil = 0;
  
  const coeff = parseInt(x);
  
  const switch_op = {
    ">": "<",
    "<": ">",
    ">=": "<=",
    "<=": ">=",
  };

  if (x.length === 1) {
    hasil = b - a;
  } else if (x.length >= 2) {
    const hasil = (b - a) / coeff;
  }

  const opn = coeff <= -1 ? switch_op[op] : op;

  return {
    "x": "x",
    "dengan": opn,
    hasil,
  };
}
