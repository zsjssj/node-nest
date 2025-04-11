type type_obj = { a: number; b: string; c: boolean };
function test1(obj: type_obj) {
  obj.a = 11;
  obj.b = '11';
  obj.c = true;
  obj = { a: 2, b: '2', c: false };
  console.log(obj); // { a: 2, b: '2', c: false }
}
const obj: type_obj = { a: 1, b: '1', c: true };
test1(obj);
console.log(obj); // { a: 1, b: '1', c: true }
