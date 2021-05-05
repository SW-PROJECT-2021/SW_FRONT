import React, { useCallback } from "react";
import styled, { css } from "styled-components";
const Button = styled.div`
  width: 30px;
  height: 10px;
  cursor: pointer;
  position: relative;
  right: -450px;
  top: -27px;
  span {
    position: absolute;
    transition: 0.3s ease-in-out;
    height: 3px;
    width: 30px;
    border-radius: 15px;
    background-color: gray;
    transition: 0.3s;
  }
  span:nth-child(1) {
    opacity: 0;
  }
  span:nth-child(2) {
    transform: rotate(45deg);
  }
  span:nth-child(3) {
    transform: rotate(-45deg);
  }
  span:nth-child(4) {
    opacity: 0;
  }
`;

//Click 함수가 props로 2번 왔는데 이거 리팩토링 해야 할 듯?
function CloseButton({ Click }) {
  return (
    <Button onClick={Click}>
      <span />
      <span />
      <span />
      <span />
    </Button>
  );
}

export default CloseButton;
