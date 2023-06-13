const express = require("express");
const router = express.Router();

const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

//127.0.0.1:3000/api/carts GET Method
router.get("/carts", async (req, res) => {
  const carts = await Cart.find({});

  const goodsIds = carts.map((cart) => {
    return cart.goodsId;
  });

  //Goods에 해당하는 모든 정보를 가지고 올건데,
  //만약 goodsIds 변수안에 존재하는 값일 때만 조회하라
  const goods = await Goods.find({ goodsId: goodsIds });

  const results = carts.map((cart) => {
    return {
      quantity: cart.quantity,
      goods: goods.find((item) => item.goodsId === cart.goodsId),
    };
  });

  res.json({
    carts: results,
  });
});

module.exports = router;
