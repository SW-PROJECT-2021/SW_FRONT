import styled from "styled-components";
import PublishIcon from "@material-ui/icons/Publish";
import FilterListIcon from "@material-ui/icons/FilterList";

export const Table = styled.table`
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
`;
export const TableHead = styled.thead`
  background-color: rgb(232, 237, 244);
  border-top: 1px solid rgb(83, 100, 137);
  font-size: 1.3rem;
  font-weight: bold;
  font-family: "NanumSquareBold";
  color: rgb(65, 83, 175);
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  text-align: center;
  padding: 1em;
  border-bottom: 1px solid rgb(83, 100, 137);
`;

export const TableCell = styled.td`
  padding: 5px;
  font-size: 1rem;
  font-family: "NanumSquareRegular";
`;

export const Header = styled.div`
  width: 100%;
  height: auto;
  display: block;
  margin-bottom: 20px;
`;
const UploadBtn = styled.button`
  width: 130px;
  position: relative;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgb(65, 83, 175);
  background-color: #ffffff;
  align-items: center;
  font-family: "NanumSqaureExtraBold";
  color: rgb(65, 83, 175);
  font-size: 1rem;
  cursor: pointer;
  margin-right: 10px;
  .svg {
    position: absolute;
    left: 7px;
    top: 7px;
  }
  .maintext {
    margin-left: 15px;
  }
`;

export const UploadButton = ({ children }) => {
  return (
    <UploadBtn>
      <div className="svg">
        <PublishIcon />
      </div>
      <div className="maintext">{children}</div>
    </UploadBtn>
  );
};

export const FilterButton = ({ children, FilterSubmit }) => {
  return (
    <UploadBtn onClick={FilterSubmit}>
      <div className="svg">
        <FilterListIcon />
      </div>
      {children}
    </UploadBtn>
  );
};

export const SearchInput = styled.input`
  width: 200px;
  height: 40px;
  border-radius: 10px;
  padding-left: 10px;
  ::placeholder {
  }
`;
export const FilterInput = styled.input`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  padding-left: 10px;
  margin-right: 10px;
  ::placeholder {
  }
`;
export const FilterText = styled.span`
  font-family: "NanumSqaureExtraBold";
  color: rgb(65, 83, 175);
  font-size: 1rem;
  margin-right: 10px;
`;
export const SearchButton = styled.button`
  width: 50px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgb(65, 83, 175);
  background-color: #ffffff;
  font-family: "NanumSqaureExtraBold";
  color: rgb(65, 83, 175);
  font-size: 1rem;
  cursor: pointer;
`;

export const Update = ({ children }) => {
  return <UploadBtn>{children}</UploadBtn>;
};
export const Option = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 10px;
  }
`;

// datail page
export const HeaderBlock = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;
export const Key = styled.div`
  display: inline-block;
  width: 30%;
  height: 100%;
  font-family: "NanumSquareBold";
  font-size: 1.1rem;
  margin-bottom: 10px;
  text-align: center;
`;
export const Value = styled.div`
  display: inline-block;
  width: 70%;
  font-family: "NanumSquareBold";
  font-size: 1rem;
  margin-bottom: 10px;
  word-break: break-all;
`;

export const ImgBlock = styled.div`
  width: 100%;
  height: 350px;
  display: inline-block;
  border: 1px solid rgb(225, 225, 225);
  border-radius: 10px;
  @media screen and (max-width: 960px) {
  }
`;
