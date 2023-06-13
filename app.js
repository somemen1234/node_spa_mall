const express = require("express");
const app = express();
const port = 3000;
// goods.js에서 보낸걸 가져오기(./는 상대경로를 나타냄 -> 아래의 url은 현재 위치한 곳에서 routes란 폴더를 찾을 것이고 그 안에서 goods.js를 찾을 것이다)
const goodsRouter = require("./routes/goods.js");
const cartsRouter = require("./routes/carts.js");
const connect = require("./schemas");
connect(); //index.js의 connect가 익명 arrow function이기에 실행을 해줘야 connect가 되므로

//모든 코드(API)에서 동작하는 미들웨어를 사용(app.use를 통해서 - 실제 모든 미들웨어에 적용하겠다.)
app.use(express.json()); //request안에 바디를 사용 위해 필요! 즉, body-parser Middleware를 쓰기 위한 문법

// 반환 받은 라우터를 실제로 express에게 적용(use를 통해) -> 전역 미들웨어
// app이라는 express 객체를 전역으로 쓸 것이다(모든 미들웨어가 여기를 통과하도록 할 것이다)
// 여기부터 통과한 다음 코드로 넘어가라는 뜻
// localhost:3000/api -> goodsRouter
app.use("/api", [goodsRouter, cartsRouter]); // /api라는 경로가 추가된 경우에는 모두 goodsRouter를 통해서 가라 라는 뜻임

app.post("/", (req, res) => {
  console.log(req.body);

  res.send("기본 URI에 POST가 정상 실행됨");
});

app.get("/", (req, res) => {
  console.log(req.query);
  const obj = { KeyKey: "value입니다.", 이름입니다: "이름일까요?" };

  res.status(400).json(obj);
  //   res.send("정상적으로 반환됨.");
});

app.get("/:id", (req, res) => {
  //route의 매개변수가 req.params에 할당이 된다.
  console.log(req.params);

  res.send(":id URI에 정상적으로 반환됨");
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// 실제로 실행하는 부분
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
