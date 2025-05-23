const aa = { a1: [1, 2, 3] };
const { a1 } = aa;
const a11 = { a1 };
const a22 = { a1 };
console.log(a11.a1 == a22.a1);
