import { NativeSelect } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../stores/actions/actions";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

function DetailHeader({ product }) {
   const [quantity, setQuantity] = useState(1);
   const openPopup = () => {
      window.open(
         "/address",
         "shipment",
         "top=10, left=10, width=500, height=600"
      );
   };
   const userData = useSelector((state) => state.UserReducer.users.data);
   const dispatch = useDispatch();
   const onShoppingCart = async () => {
      if (!userData || !userData.userName) {
         alert("로그인 하셔야 장바구니에 담을 수 있습니다.");
      } else {
         await axios
            .post("http://15.164.20.183:3003/api/basket", {
               ProductId: product.id,
               count: quantity,
               withCredentials: true,
            })
            .then((res) => {
               console.log(res.data);
               dispatch(updateCart());
            })
            .catch((err) => {
               if (err.response.data.message === "상품의 수량 부족") {
                  window.alert("상품의 수량이 부족합니다!");
               } else if (err.response.data.message === "삭제된 상품") {
                  window.alert("죄송합니다. 현재 삭제된 상품입니다.");
               }
            });
      }
   };
   const onSelectAddress = () => {
      if (!userData || !userData.userName) {
         alert("로그인 하셔야 배송지를 선택할 수 있습니다.");
      } else {
         openPopup();
      }
   };

   return (
      <article className="card">
         <div className="card-body">
            <div className="row">
               <aside className="col-md-6">
                  <article className="gallery-wrap">
                     <div className="card img-big-wrap">
                        <span style={{ textAlign: "center" }}>
                           <img
                              src={product.img}
                              alt="error"
                              style={{ maxWidth: "100%" }}
                           />
                        </span>
                     </div>
                  </article>
               </aside>
               <main className="col-md-6">
                  <article>
                     <h3 className="title">{product.name}</h3>
                     <div>
                        <Rating
                           name="read-only"
                           value={5}
                           readOnly
                           className="col-3"
                        />
                        <a href="/" className="btn-link  mr-3 text-muted">
                           {" "}
                           <i className="fa fa-heart"></i> 찜하기{" "}
                        </a>
                     </div>

                     <hr />

                     <div className="mb-3">
                        <var className="price h4">
                           &#8361;&nbsp;{ThousandSeperator(product.price)}
                        </var>{" "}
                     </div>
                     <br />
                     <div>
                        <span
                           className="col-lg-1"
                           style={{ paddingLeft: "0px" }}
                        >
                           수량 :
                        </span>
                        <NativeSelect
                           onChange={(e) => setQuantity(e.target.value)}
                           value={quantity}
                           className="col-lg-2"
                        >
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                           <option>4</option>
                           <option>5</option>
                           <option>6</option>
                           <option>7</option>
                           <option>8</option>
                           <option>9</option>
                           <option>10</option>
                        </NativeSelect>
                        &nbsp;
                        <button
                           onClick={onSelectAddress}
                           className="btn btn-outline-secondary  btn-lg col-lg-3"
                        >
                           배송지 선택
                        </button>
                     </div>
                     <br />
                     <div className="mb-6">
                        <button
                           className="btn btn-outline-secondary btn-lg col-lg-3"
                           onClick={onShoppingCart}
                        >
                           장바구니
                        </button>
                        &nbsp;
                        <button className="btn btn-outline-secondary btn-lg col-lg-3">
                           구매
                        </button>
                     </div>
                  </article>
               </main>
            </div>
         </div>
      </article>
   );
}
export default DetailHeader;
