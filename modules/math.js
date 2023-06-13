function add(a, b) {
  return a + b;
}
// 1. 모듈 그 자체를 바로 add 함수를 할당 함.
module.exports = add;

// 2. 객체 형식으로 만들어서 사용(모듈을 호출 했을 때, add 키 값에는 익명 함수가 할당되는 방법)
// exports.add = function (a, b) {
//   return a + b;
// };

// 3. 객체 형식으로 만들어 사용하기 2 (모듈을 호출 했을 때, add 키 값에는 add 함수가 할당되는 방법)
// function add(a, b) {
//   return a + b;
// }
// module.exports = { add: add };

//4. arrow function을 이용해서 exports(모듈 호출 시, add 키 값에는 add 변수 함수가 가지고 있는 값이 할당)
// const add = (a, b) => {
//     return a+b;
// }
// exports.add = add;
