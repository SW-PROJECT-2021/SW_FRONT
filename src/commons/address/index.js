import React, { useState } from "react";
import Form from "./Form";
import List from "./List";

const list = [
   {
      createdAt: 1619344686153,
      addressName: "내 집", // 배송지 이름 -> 유니크
      name: "신성일", // 성함
      zonecode: "05216", // 우편번호
      address: "서울특별시 강동구 고덕로 97길 29", // 주소
      detail: "910동 1201호", // 상세주소
      phone: "01045681345", // 전화번호
      default: true, // 기본 배송지냐 아니냐
   },
   {
      createdAt: 1619344686321,
      addressName: "친구 집",
      name: "박세기",
      zonecode: "05219",
      address: "서울특별시 강동구 고덕로 97길 50",
      detail: "910동 1123호",
      phone: "01045688255",
      default: false,
   },
];
//수정, 삭제에 createdat 이 필요없어지면 지우기 작업
function Address({ checkout, setCheckoutInfo, setOpen }) {
   //여기서 리스트 받아오고, 넣어주면됨.
   const [addressList, setAddressList] = useState(list);
   const [onList, setOnList] = useState(true);
   const [info, setInfo] = useState({
      createdAt: 0,
      addressName: "",
      name: "",
      zonecode: "",
      address: "",
      detail: "",
      phone: "",
      default: false,
   });
   const [onEdit, setOnEdit] = useState(false);
   return (
      <>
         {onList ? (
            <List
               addressList={addressList}
               checkout={checkout}
               setOnList={setOnList}
               setInfo={setInfo}
               setOnEdit={setOnEdit}
               setCheckoutInfo={setCheckoutInfo}
               setOpen={setOpen}
            />
         ) : (
            <Form
               setAddressList={setAddressList}
               length={addressList.length}
               setOnList={setOnList}
               info={info}
               setInfo={setInfo}
               onEdit={onEdit}
            />
         )}
      </>
   );
}
export default Address;
