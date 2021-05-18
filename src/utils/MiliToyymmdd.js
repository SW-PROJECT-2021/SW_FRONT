export const MiliToyymmdd = (mili) => {
   const date = new Date(mili);
   const month = date.getMonth() + 1;
   const day = date.getDate();

   return `${date.getFullYear() - 2000}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
   }`;
};
