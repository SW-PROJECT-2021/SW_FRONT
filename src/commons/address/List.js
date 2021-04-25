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
import { useHistory } from "react-router";

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
}));

function List({ addressList }) {
   const [loading, setLoading] = useState(true);
   const [defaultItem, setDefaultItem] = useState();
   const classes = useStyles();
   const history = useHistory();

   const getAddressItem = (item, key, onClickEdit, onClickDelete) => {
      return (
         <AddressItem key={key}>
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
               className={classes.button}
            >
               <Button color="primary" onClick={() => onClickEdit(item)}>
                  수정
               </Button>
               <Button
                  color="secondary"
                  onClick={() => onClickDelete(item.createdAt)}
               >
                  삭제
               </Button>
            </ButtonGroup>
         </AddressItem>
      );
   };
   useEffect(() => {
      addressList.forEach((item) => {
         if (item.default) {
            setDefaultItem(item);
         }
      });
      setLoading(false);
   }, [addressList]);

   const onClickEdit = (item) => {
      history.push({
         pathname: "/address/form",
         state: {
            item: item,
         },
      });
   };

   const onClickDelete = (id) => {
      //여기선 id 로 삭제요청
   };

   return (
      <>
         {loading ? (
            <CircularProgress />
         ) : (
            <Paper className={classes.paper}>
               <StyledH6>기본 배송지</StyledH6>
               {getAddressItem(
                  defaultItem,
                  "default",
                  onClickEdit,
                  onClickDelete
               )}
               <StyledH6>배송지 목록</StyledH6>
               {addressList.map((item, idx) => {
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
                     onClick={() => {
                        history.push("/address/form");
                     }}
                  >
                     추가
                  </Button>
               </div>
            </Paper>
         )}
      </>
   );
}
export default List;
