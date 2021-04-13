/*사용법
첫번째에 리스트 넣고, 두번재에 어떻게 정렬할 건지 order 객체에 넣으면 됨
order 객체 예시는 다음과 같음
{
    orderBy : "price"
    cmp : "greater"
}

orderBy엔 정렬할 기준 원소 넣으면 됨.
cmp엔 오름차순이면 greater, 내림차순이면 lower 넣으면되는데 밑 코드에서 알수있다시피 내림차순일땐 암거나 넣어도 됨.
*/

export default function OrderList(list, order) {
   return [...list].sort(function (a, b) {
      let av = a[order.orderBy],
         bv = b[order.orderBy];
      if (order.orderBy === "updatedAt") {
         av = Date.parse(av);
         bv = Date.parse(bv);
      }

      if (order.cmp === "greater") return av - bv;
      else return bv - av;
   });
}
