import React from "react";
import styled from "styled-components";

const Block = styled.div`
  margin: 0;
  position: absolute;
  padding: 0 auto;
  width: 100vw;
  min-height: 100vh;
  background-color: rgb(250, 250, 250);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const OutContainer = styled.div`
  width: 30%;
  min-height: 20vh;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  border: 1px solid rgb(219, 219, 219);

  h1 {
    margin: 30px auto;
    width: 320px;
    height: 50px;
  }
`;

const InContainer = styled.div`
  width: 70%;
  min-height: 100%;
  margin: 0 auto;
`;

function AuthTemplate({ children }) {
  return (
    <Block>
      <OutContainer>
        <h1>𝙎𝙬_𝙋𝙧𝙤𝙟𝙚𝙘𝙩 6 𝙏𝙚𝙖𝙢</h1>
        <InContainer>{children}</InContainer>
      </OutContainer>
    </Block>
  );
}

export default AuthTemplate;
