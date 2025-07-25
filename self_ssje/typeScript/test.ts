type param = { a1: string };

function testLog(a: Partial<param> = { a1: '121212' }) {
  const res = a.a1 ?? 'default value';
  console.log(res);
}
testLog();
testLog({});
