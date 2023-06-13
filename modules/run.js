// const add = require("./math.js");
// console.log(add(10, 30));

//exports를 통해 익명함수로 바로 내보내 줄때에는 add가 함수 그 자체를 내보내주는 것이 아닌 객체를 내보내줘야 한다!!
//따라서 이것을 사용하기 위해서 add는 객체로 사용하기 위해서는 add.add(10, 30)으로 사용 해야 함
//module.exports는 함수 그 자체로 내보내서 그냥 사용이 가능하나 exports.add의 익명함수는 객체 형식을 통해 객체를 만들어 객체로 내보내는 특성이 있다.
// console.log(add.add(10, 30));

//아니면 구조 분해 할당으로 간단하게 사용이 가능함
const add = require("./math.js");
console.log(add(10, 30));
