import {
   makeStyles,
   Modal,
   NativeSelect,
   CircularProgress,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Address from "../../commons/address";
import CustomModal from "../../commons/CustomModal";
import { updateCart } from "../../stores/actions/actions";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

const useStyles = makeStyles(() => ({
   loading: {
      position: "absolute",
      top: "47%",
      left: "47%",
   },
   inCart: {
      margin: "10px 0px",
      fontSize: "18px",
   },
}));
function DetailHeader({ product }) {
   const [quantity, setQuantity] = useState(1);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);
   const [countInCart, setCountInCart] = useState(0);
   const [mainImage, setMainImage] = useState(product.img1);
   const [defaultAddress, setDefaultAddress] = useState();
   const classes = useStyles();

   const history = useHistory();
   const userData = useSelector((state) => state.UserReducer.users.data);
   const cartData = useSelector((state) => state.CartReducer);
   const dispatch = useDispatch();

   useEffect(() => {
      for (let v of cartData) {
         if (v.ProductId === product.id) {
            setCountInCart(v.count);
         }
      }
      const getList = async () => {
         await axios.get("/api/dest").then((res) => {
            res.data.data.forEach((item) => {
               if (item.default) {
                  setDefaultAddress(item);
               }
            });
         });
      };
      getList();
   }, [cartData, product.id]);

   const onShoppingCart = async () => {
      if (!userData || !userData.userName) {
         alert("로그인 하셔야 장바구니에 담을 수 있습니다.");
      } else {
         setLoading(true);
         if (quantity + countInCart > 100) {
            window.alert(
               "배송비 문제로, 한 상품 당 최대 100개까지 장바구니에 담을 수 있습니다."
            );
            setLoading(false);
            return;
         }

         await axios
            .post(`/api/basket`, {
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
         setLoading(false);
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
   const renderOptions = () => {
      let options = [];
      for (let i = 1; i <= 10; i++) {
         if (i <= product.count) {
            options.push(
               <option key={i} value={i}>
                  {i}
               </option>
            );
         }
      }
      return options;
   };

   return (
      <article className="card">
         <div className="card-body">
            <div className="row">
               <aside className="col-md-6">
                  <article className="gallery-wrap">
                     <div className="card img-big-wrap">
                        <span
                           style={{
                              textAlign: "center",
                           }}>
                           <img
                              src={mainImage}
                              alt="error"
                              style={{ maxWidth: "100%" }}
                           />
                        </span>
                     </div>
                     <div class="thumbs-wrap">
                        <span
                           class="item-thumb"
                           onClick={() => setMainImage(product.img1)}>
                           <img src={product.img1} alt="error" />
                        </span>
                        {product.img2 && (
                           <span
                              class="item-thumb"
                              onClick={() => setMainImage(product.img2)}>
                              {" "}
                              <img src={product.img2} alt="error" />
                           </span>
                        )}
                        {product.img3 && (
                           <span
                              class="item-thumb"
                              onClick={() => setMainImage(product.img3)}>
                              {" "}
                              <img src={product.img3} alt="error" />
                           </span>
                        )}
                     </div>
                  </article>
               </aside>
               <main className="col-md-6">
                  <article>
                     <h3 className="title">{product.name}
                     
                     </h3>
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
                           style={{ paddingLeft: "0px" }}>
                           수량 :
                        </span>
                        <NativeSelect
                           onChange={(e) =>
                              setQuantity(parseInt(e.target.value))
                           }
                           value={quantity}
                           className="col-lg-2">
                           {renderOptions().map((item) => item)}
                        </NativeSelect>
                        &nbsp;
                        <button
                           onClick={() =>
                              onClickAddress("/address", "shipment")
                           }
                           className="btn btn-outline-secondary  btn-lg col-lg-3">
                           배송지 선택
                        </button>
                     </div>
                     <br />
                     <div className="mb-6">
                        <button
                           className="btn btn-outline-secondary btn-lg col-lg-3"
                           onClick={onShoppingCart}>
                           장바구니
                        </button>
                        &nbsp;
                        <button
                           className="btn btn-outline-secondary btn-lg col-lg-3"
                           onClick={() => onClickPay()}>
                           구매
                        </button>
                     </div>
                     {countInCart !== 0 && (
                        <div className={classes.inCart}>
                           현재 장바구니에 담은 수량 : {countInCart}
                        </div>
                     )}
                     <br /> <br />
                     <div>
                        {" "}
                        {defaultAddress ? (
                           <>
                              기본 배송지 : {defaultAddress.name} <br />
                              주소 : {defaultAddress.address}{" "}
                           </>
                        ) : (
                           <>
                              {userData && userData.userName && (
                                 <>아직 등록된 기본배송지가 없습니다.</>
                              )}
                           </>
                        )}
                     </div>
                  </article>
               </main>
            </div>
         </div>
         <CustomModal open={open} setOpen={setOpen}>
            <Address />
         </CustomModal>

         <Modal open={loading}>
            <CircularProgress color="secondary" className={classes.loading} />
         </Modal>
      </article>
   );
}
export default DetailHeader;
