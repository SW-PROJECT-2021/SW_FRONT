export const MiliToyymmdd = (mili, short, beforeAmonth) => {
   const date = new Date(mili);
   let month = date.getMonth() + 1;
   const day = date.getDate();
   let year = date.getFullYear();
   if (short) {
      year -= short;
   }
   if (beforeAmonth) {
      month -= 1;
   }
   return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
   }`;
};
