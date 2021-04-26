import React, { useState } from "react";
import styled from "styled-components";

const PageUl = styled.ul`
  list-style: none;
  text-align: center;
  border-radius: 3px;

  padding: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`;
const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 400;
  padding: 3px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;
const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

function Pagination({ postsPerPage, totalPost, setCurrentPage }) {
  /*페이지 번호 구현 */
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log(pageNumbers);
  return (
    <div>
      <PageUl>
        {pageNumbers.map((number) => (
          <PageLi key={number} onClick={() => setCurrentPage(number)}>
            <PageSpan>{number}</PageSpan>
          </PageLi>
        ))}
      </PageUl>
    </div>
  );
}

export default Pagination;
