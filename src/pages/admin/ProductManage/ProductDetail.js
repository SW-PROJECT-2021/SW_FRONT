import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import CloseButton from "../../../commons/CloseButton";

import { DateChange } from "../../../utils/DateChange";
const Block = styled.div`
  width: 500px;
  height: 700px;
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 5px;
  position: fixed;
  top: 20%;

  .title {
    display: inline-block;
    width: 100%;
    font-size: 24px;
    font-weight: bold;
    padding-top: 10px;
    height: 50px;
    text-align: center;
  }
  img {
    width: 100%;
    height: auto;
  }
  padding: 5px;
`;

function ProductDetail({ modalData, setModalState, modalState }) {
  const ButtonClick = () => {
    setModalState(false);
  };
  console.log(modalState);
  return (
    <Block>
      <header>
        <span className="title">상세정보</span>
        <CloseButton Click={ButtonClick} />
      </header>
      <hr></hr>
      <body>
        <img src={modalData[0].img} alt="img"></img>
        <p>상품 id : {modalData[0].id}</p>
        <p>상품명 : {modalData[0].name}</p>
        <p>가격 : {modalData[0].price}</p>
        <p>수량 : {modalData[0].count}</p>
        <p>등록 날짜 :{DateChange(modalData[0].createdAt)}</p>
        <p>최근 수정 날짜 : {DateChange(modalData[0].updatedAt)}</p>
      </body>
    </Block>
  );
}

export default ProductDetail;
