export const checkId = function (str) {
  const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,30}$/i;
  return regExp.test(str) ? true : false;
};

export const checkEmail = function (str) {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regExp.test(str) ? true : false;
};

export const checkPassword = function (str) {
  const regExp = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*[0-9]).{8,30}$/i;
  return regExp.test(str) ? true : false;
};

export const checkName = (str) => {
  console.log(str);
  const regExp = /^[a-zA-Z가-힣_]*$/i;
  return regExp.test(str) ? true : false;
};
