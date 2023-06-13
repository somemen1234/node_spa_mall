const mongoose = require("mongoose"); //몽구스 패키지에 있는 거를 가져와 할당

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/spa_mall") //connect명령어를 통해 실제 몽고DB랑 연결(spa_mall이라는 DB명을 사용해 연결할 것)
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
