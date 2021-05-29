import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
   Button,
   ButtonGroup,
   CircularProgress,
   makeStyles,
   Paper,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CustomPagination from "../CustomPagination";
import axios from "axios";

const AddressItem = styled.div`
   border-bottom: 1px solid #e6e6e6;
   padding: 5px 5px;
`;
const StyledH6 = styled.h6`
   height: 34px;
   font-size: 17px;
   line-height: 34px;
   background-color: #64b5f6;
   text-align: center;
`;
const useStyles = makeStyles((theme) => ({
   paper: {
      margin: "5px",
      marginTop: "0px",
   },
   button: {
      margin: "5px 1px",
   },
   buttonColor: {
      backgroundColor: "#4dabf5",
      "&:hover": {
         backgroundColor: "#2196f3",
      },
   },
   buttonApply: {
      float: "right",
   },
}));

function List({
   addressList,
   checkout,
   setOnList,
   setInfo,
   setOnEdit,
   setCheckoutInfo,
   setOpen,
   setRefresh,
}) {
   const [loading, setLoading] = useState(true);
   const [defaultItem, setDefaultItem] = useState();
   const [pageNum, setPageNum] = useState(1);
   const [page, setPage] = useState(1);
   const classes = useStyles();

   useEffect(() => {
      setDefaultItem();
      addressList.forEach((item) => {
         if (item.default) {
            setDefaultItem(item);
         }
      });
      setLoading(false);
      setPageNum(Math.floor(addressList.length / 5 + 1));
   }, [addressList]);

   const applyForCheckout = (item) => {
      setCheckoutInfo((prev) => ({
         ...prev,
         addressInfo: { ...item, message: prev.addressInfo.message },
      }));
      setOpen(false);
   };

   const getAddressItem = (item, key, onClickEdit, onClickDelete) => {
      return (
         <AddressItem key={`addressitem-${key}`}>
            <h6>{item.addressName}</h6>
            <span>
               성함 : {item.name} <br />
               우편번호 : {item.zonecode} <br />
               주소 : {item.address}, &nbsp;{item.detail} <br />
               연락처 : {item.phone}
            </span>
            <br />
            <ButtonGroup
               disableElevation
               variant="outlined"
               size="small"
               className={classes.button}>
               <Button color="primary" onClick={() => onClickEdit(item)}>
                  수정
               </Button>
               <Button color="secondary" onClick={() => onClickDelete(item.id)}>
                  삭제
               </Button>
            </ButtonGroup>{" "}
            {checkout && (
               <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonApply}
                  onClick={() => applyForCheckout(item)}>
                  적용
               </Button>
            )}
         </AddressItem>
      );
   };

   const onClickEdit = (item) => {
      setInfo(item);
      setOnList(false);
      setOnEdit(true);
   };

   const onClickDelete = async (id) => {
      await axios.delete(`/api/dest/${id}`);
      if (defaultItem) {
         setDefaultItem();
      }
      setRefresh((prev) => prev + 1);
   };

   return (
      <>
         {loading ? (
            <CircularProgress />
         ) : (
            <div>
               <Paper className={classes.paper}>
                  <StyledH6>기본 배송지</StyledH6>

                  {defaultItem &&
                     getAddressItem(
                        defaultItem,
                        "isDefault",
                        onClickEdit,
                        onClickDelete
                     )}
                  <StyledH6>배송지 목록</StyledH6>
                  {addressList
                     .slice((page - 1) * 5, page * 5)
                     .map((item, idx) => {
                        if (!item.default) {
                           return getAddressItem(
                              item,
                              idx,
                              onClickEdit,
                              onClickDelete
                           );
                        } else {
                           return <></>;
                        }
                     })}
                  <div style={{ textAlign: "center", padding: "5px 0px" }}>
                     <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.buttonColor}
                        startIcon={<AddIcon />}
                        onClick={() => setOnList(false)}>
                        추가
                     </Button>
                  </div>
               </Paper>
               <CustomPagination
                  onChangePage={(e, page) => setPage(page)}
                  pageNum={pageNum}
               />
            </div>
         )}
      </>
   );
}
export default List;
