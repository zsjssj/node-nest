
fn main() {
  let a:isize =1;
  let a1:(isize, isize,String) = (1, 2, "hello".to_string());
  let a2:[u8;5]=[1, 2, 3, 4, 255];

  //切片
  let a3:&[u8] = &a2[1..4];
  //字符串-不可变
  let mut a4:&str = "hello world";
  // a4 = "hello world a4";

  //字符串-可变
  let mut a5:String = "hello world".to_string();
  // a5.push_str(" a5");
  a5= "hello world a5".to_string();

  //枚举
  enum Color {
    Red,
    Green,
    Blue,
}


  println!("Hello, world! {}", a);
  println!("Hello, world! {}", a1.2);
  println!("Hello, world! {}", a2[4]);
  println!("Hello, world! {}", a3[0]);
  println!("Hello, world! {}", a4);
  println!("Hello, world! {}", a5);
  println!("Hello, world! {}", Color::Red as u8);

}