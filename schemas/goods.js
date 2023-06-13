const mongoose = require("mongoose");

//모델을 생성
const goodsSchema = new mongoose.Schema({
  //스키마를 통해서 스키마를 정의해놓음
  goodsId: {
    type: Number,
    required: true, //무조건 있어야 하나 없어야 하나를 설정
    unique: true, //해당 값이 고유값인지를 설정
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnailUrl: {
    type: String, //보통 이미지 url을 가져올때 string타입이다.
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("Goods", goodsSchema);
// module.exports = mongoose.model("Defaults", defaultSchema); //Defaults란 모델명으로 defaultSchema를 사용할 것이다(콜렉션명이 defaults) - defaultSchema(실제로 데이터가 생성된 스키마에 대한 값)
