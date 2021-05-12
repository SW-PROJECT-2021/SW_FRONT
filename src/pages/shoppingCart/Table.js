import {
  Button,
  CircularProgress,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import {
  changeCountCart,
  deleteCart,
  updateCart,
} from "../../stores/actions/actions";
import { ThousandSeperator } from "../../utils/ThousandSeperator";

const useStyles = makeStyles((theme) => ({
  loading: {
    position: "absolute",
    top: "47%",
    left: "47%",
  },
  quantityInput: {
    width: "40px",
  },
  quantityChange: {
    minWidth: "40px",
    width: "40px",
    marginLeft: "1px",
    padding: "0px",
  },
}));

function Table({ cartList, setCartList }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const onChangeQuantity = async (id, count) => {
    setLoading(true);
    dispatch(changeCountCart(parseInt(id), parseInt(count)));
    dispatch(updateCart());
    setLoading(false);
  };

  const onChangeQuantityInput = (e, id) => {
    setLoading(true);
    if (/^[0-9]+$/.test(e.target.value)) {
      setCartList((prev) =>
        prev.map((item) => {
          if (item.ProductId === id) {
            return { ...item, count: e.target.value };
          } else {
            return item;
          }
        })
      );
    }
    setLoading(false);
  };

  const onDelete = async (id) => {
    setLoading(true);
    dispatch(deleteCart(id));
    dispatch(updateCart());
    setLoading(false);
  };

  const getItem = (item, idx) => {
    return (
      <tr key={idx}>
        <td>
          <figure className="itemside">
            <div className="aside">
              <img src={item.productImg} className="img-sm" alt="error" />
            </div>
            <figcaption className="info">
              <a href="/" className="title text-dark">
                {item.productName}
              </a>
            </figcaption>
          </figure>
        </td>
        <td>
          <TextField
            id="quantity"
            label="수량"
            value={item.count}
            className={classes.quantityInput}
            onChange={(e) => onChangeQuantityInput(e, item.ProductId)}
          />
          <div style={{ lineHeight: "46px", width: "40px", float: "right" }}>
            <Button
              color="primary"
              variant="contained"
              className={classes.quantityChange}
              onClick={() => onChangeQuantity(item.ProductId, item.count)}
            >
              변경
            </Button>
          </div>
        </td>
        <td>
          <div className="price-wrap">
            <var className="price">
              {ThousandSeperator(item.count * item.productPrice)}원
            </var>
            <small className="text-muted">
              {" "}
              개당 {ThousandSeperator(item.productPrice)}원{" "}
            </small>
          </div>
        </td>
        <td className="text-right">
          <button
            onClick={() => onDelete(item.ProductId)}
            className="btn btn-light"
          >
            {" "}
            삭제
          </button>
        </td>
      </tr>
    );
  };
  return (
    <div className="card">
      {!cartList ? (
        <Alert severity="info">아직 장바구니에 넣은 상품이 없습니다!</Alert>
      ) : (
        <table className="table table-borderless table-shopping-cart">
          <thead className="text-muted">
            <tr className="small text-uppercase">
              <th scope="col">상품</th>
              <th scope="col" width="120">
                수량
              </th>
              <th scope="col" width="120">
                가격
              </th>
              <th scope="col" className="text-right" width="200">
                {" "}
              </th>
            </tr>
          </thead>
          <tbody>{cartList.map((item, idx) => getItem(item, idx))}</tbody>
        </table>
      )}
      <div className="card-body border-top">
        <a href="/" className="btn btn-primary float-md-right">
          {" "}
          구매하기 <i className="fa fa-chevron-right"></i>{" "}
        </a>
        <button onClick={() => history.goBack()} className="btn btn-light">
          {" "}
          <i className="fa fa-chevron-left"></i> 뒤로가기{" "}
        </button>
      </div>
      <Modal open={loading}>
        <CircularProgress color="secondary" className={classes.loading} />
      </Modal>
    </div>
  );
}
export default Table;
