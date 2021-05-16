import { NativeSelect } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Address from "../../commons/address";
import CustomModal from "../../commons/CustomModal";
import { updateCart } from "../../stores/actions/actions";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

function DetailHeader({ product }) {
   const [quantity, setQuantity] = useState(1);

   const [open, setOpen] = useState(false);
   const history = useHistory();
   const userData = useSelector((state) => state.UserReducer.users.data);
   const dispatch = useDispatch();

   const onShoppingCart = async () => {
      if (!userData || !userData.userName) {
         alert("로그인 하셔야 장바구니에 담을 수 있습니다.");
      } else {
         console.log(quantity);
         await axios
            .post("http://15.164.20.183:3003/api/basket", {
               ProductId: product.id,
               count: quantity,
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
   const onClickAddress = (url, name) => {
      if (!userData || !userData.userName) {
         alert("로그인 하셔야 배송지를 선택할 수 있습니다.");
      } else {
         setOpen(true);
      }
   };
   const onClickPay = () => {
      if (!userData || !userData.userName) {
         alert("로그인 하셔야 구매하실 수 있습니다.");
      } else {
         history.push("/checkout", {
            orderProduct: [
               {
                  ...product,
                  count: quantity,
               },
            ],
         });
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
                           onChange={(e) =>
                              setQuantity(parseInt(e.target.value))
                           }
                           value={quantity}
                           className="col-lg-2"
                        >
                           <option value={1}>1</option>
                           <option value={2}>2</option>
                           <option value={3}>3</option>
                           <option value={4}>4</option>
                           <option value={5}>5</option>
                           <option value={6}>6</option>
                           <option value={7}>7</option>
                           <option value={8}>8</option>
                           <option value={9}>9</option>
                           <option value={10}>10</option>
                        </NativeSelect>
                        &nbsp;
                        <button
                           onClick={() =>
                              onClickAddress("/address", "shipment")
                           }
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
                        <button
                           className="btn btn-outline-secondary btn-lg col-lg-3"
                           onClick={() => onClickPay()}
                        >
                           구매
                        </button>
                     </div>
                  </article>
               </main>
            </div>
         </div>
         <CustomModal open={open} setOpen={setOpen}>
            <Address />
         </CustomModal>
      </article>
   );
}
export default DetailHeader;
