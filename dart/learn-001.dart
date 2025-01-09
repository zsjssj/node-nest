// 一些基础类型
int main() {
  final double a1;
  a1 = (1 == 2) ? 1.0 : 101010101010.1;
  int b1 = a1.toInt() | 1;
  print('$a1, $b1');

  (int, String) a2 = (1, "ssje1"); //Records类型，一经定义不可变
  var a21 = (name: 'ssje2', age: 2);
  const a22 = (name: 'ssje3', age: 3);
  var a23 = Test1(name: 'ssje4', age: 4);
  a23.greet();
  a23.age = 12;
  print('${a2.$1},${a21.name},${a22.name},${a23.name}');

  List<int> a3 = [1, 2, 3, 44, 5];
  a3.sort((v1, v2) => v2 - v1);
  List a4 = [
    '1',
    2,
    {'data': 2},
    [1, 2, 3]
  ];
  print('a3$a3 , ${a3[1]},$a4,${a3.reversed},${a3.reversed.toList()}');
  List a31 = new List<int>.filled(3, 0);
  final List a41 = [1, '2', 3]; //const定义的List、对象...不可变（包括里面的成员和属性值）
  a31[0] = 1;
  a41[1] = 22;
  print('$a31\n$a41 ');

  var (a, b) = ('left', 'right');
  (b, a) = (a, b); // Swap.
  print('$a $b'); // Prints "right left".

  switch (a1) {
    case 1:
      print('1');
      break;
    case 101010101010:
      print('101010101010');
      break;
    default:
      print('default');
  }

  return 0;
}

class Test1 {
  String name;
  int age;

  // 构造函数
  Test1({required this.name, required this.age});

  // 定义方法
  void greet() {
    print('Hello, my name is $name');
  }
}
