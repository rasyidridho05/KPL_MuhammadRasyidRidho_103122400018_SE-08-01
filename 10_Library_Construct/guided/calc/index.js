import { pslvd, pslvt, ptlsvd } from "persamaan";

const a1 = pslvd("3x", 12)
const a2 = pslvt("x", -8, 10)
const a3 = ptlsvd("-2x", 10, 8, "<=")

console.log(a1)
console.log(a2)
console.log(a3)