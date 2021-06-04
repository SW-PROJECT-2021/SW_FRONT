import React, { useEffect, useCallback, useState } from "react";
import { useStyles } from "../index";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Title from "../Title";
import styled from "styled-components";
import { Header, FilterText, SearchButton } from "../ProductManage/ManageStyle";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../ProductManage/Pagination";
import {
  getQuestionAllAction,
  getQuestionDetailAction,
} from "../../../stores/actions/inquireAction";
import { DateChange } from "../../../utils/DateChange";
import AnswerModal from "./AnswerModal";
function InquireList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const handleClickOpen = useCallback(
    (id) => {
      setOpen(true);
      dispatch(getQuestionDetailAction(id));
    },
    [open]
  );
  const handleClose = () => {
    setOpen(false);
  };
  const { loading, data, error } = useSelector(
    (state) => state.InquireReducer.questionlist
  );
  useEffect(() => {
    dispatch(getQuestionAllAction());
  }, []);
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
            <Title>문의 내역 관리</Title>
            <Body>
              <ul className="list-header">
                <li className="list-verysmall">문의 ID</li>
                <li className="list-middle">등록 일자</li>
                <li className="list-small">주문 Id</li>
                <li className="list-small">상품 정보</li>
                <li className="list-middle">문의 상태</li>
                <li className="list-middle">문의 제목</li>
              </ul>
              <AnswerModal
                style={{ visibility: "hidden" }}
                open={open}
                handleClose={handleClose}
              />
              {slicePost(data).map((item, index) => {
                return (
                  <ul className="list-body">
                    <li className="list-verysmall">{item.id}</li>
                    <li className="list-middle">
                      {DateChange(item.createdAt)}
                    </li>
                    <li className="list-small">{item.OrderHistoryId}</li>
                    <li className="list-small">{item.ProductName}</li>
                    <li className="list-middle">
                      {item.isAnswer === true ? (
                        <>
                          <SearchButton
                            style={{ color: "darkslategray" }}
                            onClick={() => handleClickOpen(item.id)}
                          >
                            답변완료
                          </SearchButton>
                        </>
                      ) : (
                        <>
                          <SearchButton
                            onClick={() => handleClickOpen(item.id)}
                          >
                            답변하기
                          </SearchButton>
                        </>
                      )}
                    </li>
                    <li className="list-middle">{item.title}</li>
                  </ul>
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

export default InquireList;

export const Body = styled.div`
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
    margin-right: 0;
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
  .list-verysmall {
    width: 7%;
  }
  .list-large {
    width: 40%;
  }
  .list-middle {
    width: 25%;
  }
  .list-body {
    color: #2f4f4f;
    border-bottom: 0.1px solid #a9a9a9;
  }
`;
