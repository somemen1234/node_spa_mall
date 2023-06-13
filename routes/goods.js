const express = require("express");
const router = express.Router();

// localhost:3000/api/
// router.get("/", (req, res) => {
//   res.send("default url for goods.js GET Method"); //send안에 있는 값을 반환할 것이다.
// }); // /는 기본경로로 사용(추가적인 경로를 넣지 않겠다)

// localhost:3000/api/about
// router.get("/about", (req, res) => {
//   res.send("goods.js about PATH");
// });

// /routes/goods.js
const goods = [
  {
    goodsId: 4,
    name: "상품 4",
    thumbnailUrl: "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
    category: "drink",
    price: 0.1,
  },
  {
    goodsId: 3,
    name: "상품 3",
    thumbnailUrl: "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
    category: "drink",
    price: 2.2,
  },
  {
    goodsId: 2,
    name: "상품 2",
    thumbnailUrl: "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
    category: "drink",
    price: 0.11,
  },
  {
    goodsId: 1,
    name: "상품 1",
    thumbnailUrl: "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
    category: "drink",
    price: 6.2,
  },
];

router.get("/goods", (req, res) => {
  res.status(200).json({ goods });
});

router.get("/goods/:goodsId", (req, res) => {
  const { goodsId } = req.params;

  //   let result = null;
  //   for (const good of goods) {
  //     if (goodsId * 1 === good.goodsId) {
  //       result = good;
  //     }
  //   }

  // for이랑 같은 역할을 하지만 만약 잘못된 goodsId를 입력하면 얘는 아무것도 출력되지 않음(바로 53번 line은 null이 출력됨)
  const [result] = goods.filter((good) => goodsId * 1 === good.goodsId);

  res.status(200).json({ detail: result });
});

// const Goods = require("../schemas/goods.js");
// router.post("/goods/", async (req, res) => {
//   const { goodsId, name, thumbnailUrl, category, price } = req.body; //req의 body안에 데이터가 들어와 있으므로

//   const goods = await Goods.find({ goodsId }); //unique값이 중복되는지 꼭 확인하는 작업이 필요(DB에서 데이터를 반환해줘야 그것을 비교해서 처리를 하므로 비동기 콜백함수로 만들고 await를 붙임)

//   if (goods.length) {
//     //이미 있으면 status400을 보내 오류 인것을 알려줌
//     return res.status(400).json({
//       success: false,
//       errorMessage: "이미 존재하는 GoodsId입니다.",
//     });
//   }

//   const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

//   res.json({ goods: createdGoods });
// });

const Carts = require("../schemas/cart.js");
router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Carts.find({ goodsId });
  if (existsCarts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 장바구니에 해당하는 상품이 존재합니다.",
    });
  }

  await Carts.create({ goodsId, quantity });

  res.json({ result: "success" });
});

router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Carts.find({ goodsId });
  if (existsCarts.length) {
    await Carts.updateOne({ goodsId: goodsId }, { $set: { quantity: quantity } });
  }

  res.status(200).json({ success: true }); //장바구니에 값이 없더라도 에러 발생x
});

router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;

  const existsCarts = await Carts.find({ goodsId });
  if (existsCarts.length) {
    await Carts.deleteOne({ goodsId });
  }

  res.json({ result: "success" });
});

const Goods = require("../schemas/goods.js");
router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

  res.json({ goods: createdGoods });
});

// 위에 작성한 것을 app.js로 가져다 줘야 함!
// 이 때, module.exports같은 방식으로 전달함
module.exports = router;
// 이것을 이제 app.js에서 가져와야 함.

//변경사항 추가해보기
