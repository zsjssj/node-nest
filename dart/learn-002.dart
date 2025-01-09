// class的使用、数学工具的使用
import 'dart:math';

class Awsd {
  String name = "awsd";
  int age = 1;
  Awsd(this.name, this.age);
  void greet() {
    print('Hello, my name is ${this.name}');
  }
}

abstract class Test1 {
  String name;
  int age;
  // 构造函数
  Test1({required this.name, required this.age});
  void greet() {
    print('Hello, my name is $name, age is $age');
  }
}

class Test2 extends Test1 {
  static int age1 = 1;
  Test2({required String name, required int age}) : super(name: name, age: age);

  // @override
  // void greet() {
  //   print('In class Test2, my name is $name, age is $age');
  // }
  // run() {
  //   super.greet();
  // }

  void run2() {
    print('run2 $age1');
  }
}

class Test3 implements Test1 {
  @override
  String name;

  @override
  int age;
  Test3({required this.name, required this.age});

  @override
  void greet() {
    print('Hello, my name is $name');
  }

  void run3() {
    print('self function: run3');
  }
}

main() {
  final Awsd a1 = new Awsd('awsd1', 1);
  a1.greet();
  a1.name = 'awsd2';
  a1.greet();
  var a2 = int.parse('42', radix: 10);
  print(a2);
  print(sin(pi / 2));

  String a3 = ' awsd ';
  print('$a3,\n${a3.trim()},\n${a3.trimLeft()},\n${a3.trimRight()}');

  Test2 a4 = new Test2(name: 'awsd4', age: 4);
  a4.greet();

  var a5 = Test3(name: 'awsd5', age: 5);
  a5.run3();
}
