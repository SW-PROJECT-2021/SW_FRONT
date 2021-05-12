import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThousandSeperator } from "../../utils/ThousandSeperator";
import Table from "./Table";

const list = [
  {
    id: 0,
    productImg: "assets/images/items/1.jpg",
    productName: "Some name of item goes here nice",
    count: 3,
    productPrice: 30000,
  },
  {
    id: 1,
    productImg: "assets/images/items/2.jpg",
    productName: "Product name goes here nice",
    count: 1,
    productPrice: 10000,
  },
  {
    id: 2,
    productImg: "assets/images/items/3.jpg",
    productName: " Another name of some product goes just here",
    count: 2,
    productPrice: 20000,
  },
];

function ShoppingCart() {
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const cartItems = useSelector((state) => state.CartReducer);
  useEffect(() => {
    if (cartItems) {
      setCartList(cartItems);
      let total = 0;
      cartItems.forEach((item) => {
        total += item.productPrice * item.count;
      });
      setTotalPrice(total);
    } else {
      setCartList();
    }
  }, [cartItems]);

  return (
    <div>
      <section className="section-pagetop bg">
        <div className="container">
          <h2 className="title-page">장바구니</h2>
        </div>
      </section>

      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <main className="col-md-9">
              <Table cartList={cartList} setCartList={setCartList} />
            </main>
            <aside className="col-md-3">
              <div className="card mb-3">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>쿠폰 입력</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          name=""
                          placeholder="Coupon code"
                        />
                        <span className="input-group-append">
                          <button className="btn btn-primary">적용</button>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>가격 : </dt>
                    <dd className="text-right">
                      {ThousandSeperator(totalPrice)}원
                    </dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>할인 :</dt>
                    <dd className="text-right">0</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>총 가격:</dt>
                    <dd className="text-right  h5">
                      <strong>{ThousandSeperator(totalPrice)}원</strong>
                    </dd>
                  </dl>
                  <hr />
                  <p className="text-center mb-3">
                    <img
                      src="assets/images/misc/payments.png"
                      height="26"
                      alt="error"
                    />
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ShoppingCart;
