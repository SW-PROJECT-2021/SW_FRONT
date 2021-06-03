import React, { useEffect, useCallback, useState } from "react";
import { useStyles } from "../index";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Title from "../Title";
import { Link } from "react-router-dom";
import { Header, FilterText, SearchButton } from "../ProductManage/ManageStyle";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderListAllAction,
  filterOrderListAllAction,
  updateOrderStateAction,
} from "../../../stores/actions/orderAction";
import { DateChange } from "../../../utils/DateChange";
import Pagination from "../ProductManage/Pagination";
import { OrderMappingById } from "../../../utils/OrderMapping";
import ReviewModal from "./ReviewModal";

const Body = styled.div`
  ul {
    padding: 0;
    width: 100%;
    height: auto;
    align-items: center;
    text-align: center;
    text-decoration: none;
    display: flex;
    list-style: none;
    font-family: "NanumSquareBold";
    margin-top: 10px;
  }
  li {
    margin-bottom: 10px;
  }
  .list-header {
    color: #191970;
    border-top: 2px solid #a9a9a9;
    border-bottom: 2px solid #a9a9a9;
    font-size: 1.1rem;
  }
  .list-small {
    width: 15%;
  }
  .list-large {
    width: 40%;
  }
  .list-middle {
  }
  .list-body {
    color: #2f4f4f;
    border-bottom: 0.1px solid #a9a9a9;
  }
`;

function OrderList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [userId, setUserId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickOpen = (id, userid) => {
    setOpen(true);
    setModalId(id);
    setUserId(userid);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { loading, data, error } = useSelector(
    (state) => state.OrderReducer.orderlist
  );
  useEffect(() => {
    dispatch(getOrderListAllAction());
  }, []);
  const onStartDateHandler = useCallback(
    (e) => {
      setStartDate(e.target.value);
      console.log(startDate);
    },
    [startDate]
  );
  const onEndDateHandler = useCallback(
    (e) => {
      setEndDate(e.target.value);
      console.log(endDate);
    },
    [endDate]
  );

  const FilterSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(startDate);
      console.log(endDate);
      if (startDate && endDate) {
        dispatch(filterOrderListAllAction(startDate, endDate));
      } else {
        alert("빈칸을 입력하세요");
      }
    },
    [startDate, endDate]
  );
  const ChangeOrder = useCallback(
    (id) => {
      console.log(id);
      let data = {
        id: id,
      };
      dispatch(updateOrderStateAction(data));
      window.location.reload();
    },
    [dispatch]
  );
  /*페이지 나누기 */
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function slicePost(arr) {
    // 배열을 인자로 받아와 분할된 배열로 자른다.
    let currentPosts = 0;
    currentPosts = arr.slice(indexOfFirst, indexOfLast); //slice -> 분할된 배열 리턴
    return currentPosts;
  }

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!data) return null;
  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid item className="itemlist">
          <Paper className={classes.paper}>
            <Title>주문 관리</Title>
            <Header>
              <FilterText>시작 날짜</FilterText>
              <TextField
                style={{ width: "200px", height: "60px", marginRight: "10px" }}
                variant="outlined"
                fullWidth
                size="small"
                id="startdate"
                name="startdate"
                type="date"
                autoComplete="startdate"
                value={startDate}
                onChange={onStartDateHandler}
                autoFocus
              />
              <FilterText>종료 날짜</FilterText>
              <TextField
                style={{ width: "200px", height: "60px", marginRight: "10px" }}
                variant="outlined"
                fullWidth
                size="small"
                id="endDate"
                name="enddate"
                type="date"
                value={endDate}
                onChange={onEndDateHandler}
                autoComplete="enddate"
                autoFocus
              />
              <SearchButton onClick={FilterSubmit}>검색</SearchButton>
            </Header>
            <Body>
              <ul className="list-header">
                <li className="list-small">주문 날짜</li>
                <li className="list-small">고객 ID</li>
                <li className="list-small">결제 금액</li>
                <li className="list-small">배송지</li>
                <li className="list-small">주문 상태</li>
                <li className="list-large">주문내용</li>
              </ul>
              <ReviewModal
                style={{ visibility: "hidden" }}
                open={open}
                handleClose={handleClose}
                modalId={modalId}
                userId={userId}
              />
              {slicePost(data).map((item, index) => {
                return (
                  <>
                    <ul className="list-body" key={index}>
                      <li className="list-small">
                        {DateChange(item.orderDate)}
                      </li>
                      <li className="list-small">{item.UserId}</li>
                      <li className="list-small">{item.totalCost}</li>
                      <li className="list-small">{item.orderDestination}</li>
                      <li className="list-small">
                        {item.orderStatus === 1 ? (
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span>{OrderMappingById[item.orderStatus]}</span>
                            <SearchButton
                              style={{
                                width: "80px",
                                marginLeft: "10px",
                              }}
                              onClick={() => ChangeOrder(item.id)}
                            >
                              배송시작
                            </SearchButton>
                          </div>
                        ) : item.orderStatus === 2 ? (
                          <div>
                            <span>{OrderMappingById[item.orderStatus]}</span>
                            <SearchButton
                              style={{
                                width: "80px",
                                marginLeft: "10px",
                                color: "#696969",
                              }}
                              onClick={() => ChangeOrder(item.id)}
                            >
                              배송완료
                            </SearchButton>
                          </div>
                        ) : item.orderStatus === 3 ? (
                          <div>
                            <span>{OrderMappingById[item.orderStatus]}</span>
                            <SearchButton
                              style={{
                                width: "80px",
                                marginLeft: "10px",
                                color: "#1e90ff",
                              }}
                              onClick={() =>
                                handleClickOpen(item.id, item.UserId)
                              }
                            >
                              상품평
                            </SearchButton>
                          </div>
                        ) : item.orderStatus === 4 ? (
                          <div>
                            <span>{OrderMappingById[item.orderStatus]}</span>
                            <SearchButton
                              style={{
                                width: "80px",
                                marginLeft: "10px",
                                color: "#1e90ff",
                              }}
                              onClick={() =>
                                handleClickOpen(item.id, item.UserId)
                              }
                            >
                              상품평
                            </SearchButton>
                          </div>
                        ) : (
                          <></>
                        )}
                      </li>
                      <li className="list-large">
                        {item.Ordered.map((item) => {
                          return (
                            <div>
                              {" "}
                              <span>{item.name}</span>{" "}
                              <span>{item.count}개</span>
                            </div>
                          );
                        })}
                      </li>
                    </ul>
                  </>
                );
              })}
              <Pagination
                postsPerPage={postsPerPage}
                totalPost={data.length}
                setCurrentPage={setCurrentPage}
              />
            </Body>
          </Paper>
        </Grid>
      </Container>
    </main>
  );
}

export default OrderList;
