import React, { useState, useCallback } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ProductDetail from "./ProductDetail";

const CategoryMapping = {
  1: "유산소-러닝머신",
  2: "유산소-사이클",
  3: "웨이트-바벨",
  4: "웨이트-덤벨",
  5: "웨이트-원판",
  6: "웨이트-머신",
  7: "운동보조기구-밴드",
  8: "운동보조기구-스트랩",
  9: "운동보조기구-벨트",
  10: "마사지기구-폼롤러",
  11: "마사지기구-요가매트",
};

function ProductList({ posts }) {
  const [modalState, setModalState] = useState(false);
  const [modalData, setModalData] = useState("");

  const DetailButtonHandler = useCallback(
    (id) => {
      console.log(modalData);
      setModalState(true);
      setModalData(posts.filter((data) => data.id === id));
      console.log(modalData);
    },
    [modalState, posts]
  );
  return (
    <>
      {posts.map((row) => (
        <>
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell align="left">
              {CategoryMapping[row.CategoryId]}
            </TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="center">
              <button onClick={() => DetailButtonHandler(row.id)}>
                상세정보
              </button>
            </TableCell>
            <TableCell align="right">
              <button>삭제</button>
            </TableCell>
          </TableRow>
        </>
      ))}
      {modalState && (
        <ProductDetail
          modalData={modalData}
          setModalState={setModalState}
          modalState={modalState}
        />
      )}
    </>
  );
}

export default ProductList;
