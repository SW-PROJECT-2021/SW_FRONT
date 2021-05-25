import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";

function Address({ checkout, setCheckoutInfo, setOpen }) {
   //여기서 리스트 받아오고, 넣어주면됨.
   const [addressList, setAddressList] = useState([]);
   const [onList, setOnList] = useState(true);
   const [info, setInfo] = useState({
      addressName: "",
      name: "",
      zonecode: "",
      address: "",
      detail: "",
      phone: "",
      default: false,
   });
   const [onEdit, setOnEdit] = useState(false);
   const [refresh, setRefresh] = useState(0);
   useEffect(() => {
      const getList = async () => {
         await axios.get("/api/dest").then((res) => {
            setAddressList(res.data.data);
         });
      };
      getList();
   }, [refresh]);
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
               setRefresh={setRefresh}
            />
         ) : (
            <Form
               setAddressList={setAddressList}
               length={addressList.length}
               setOnList={setOnList}
               info={info}
               setInfo={setInfo}
               setOnEdit={setOnEdit}
               onEdit={onEdit}
               setRefresh={setRefresh}
            />
         )}
      </>
   );
}
export default Address;
