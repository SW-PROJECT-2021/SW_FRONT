import React, { useEffect, useState } from "react";
import List from "./List";
import Filter from "./Filter";
import Title from "./Title";
import axios from "axios";
import { useLocation } from "react-router";
import qs from "qs";

const temp = [
   {
      id: 8,
      name: "깔삼한 요가매트",
      img:
         "https://sw6team-bucket.s3.ap-northeast-2.amazonaws.com/images/origin/1617775775906.png",
      price: 12000,
      count: 300,
      isDeleted: false,
      createdAt: "2021-04-08T08:25:17.000Z",
      updatedAt: "2021-04-08T08:25:17.000Z",
      CategoryId: 11,
   },
   {
      id: 9,
      name: "겁나 큰 매트",
      img:
         "https://sw6team-bucket.s3.ap-northeast-2.amazonaws.com/images/origin/1618062361340.png",
      price: 30000,
      count: 100,
      isDeleted: false,
      createdAt: "2021-04-10T13:46:01.000Z",
      updatedAt: "2021-04-10T13:46:01.000Z",
      CategoryId: 11,
   },
];

const changeName = (name) => {
   if (name === "유산소") return "aerobic";
   else if (name === "웨이트") return "weight";
   else if (name === "보조") return "assistant";
   else if (name === "운동보조기구") return "aids";
   else if (name === "마사지기구") return "massage";
   else if (name === "런닝머신") return "running";
   else if (name === "사이클") return "cycle";
   else if (name === "덤벨") return "dumbbell";
   else if (name === "바벨") return "babel";
   else if (name === "원판") return "plate";
   else if (name === "기구") return "machine";
   else if (name === "밴드") return "band";
   else if (name === "스트랩") return "strap";
   else if (name === "벨트") return "belt";
   else if (name === "폼롤러") return "roller";
   else if (name === "요가매트") return "mat";
};

function ProductList() {
   const location = useLocation();
   const [list, setList] = useState([]);
   const [title, setTitle] = useState({});

   useEffect(() => {
      const getResult = async (search) => {
         console.log(search);
         await axios
            .get(`http://15.164.20.183:3003/product/${search}`)
            .then((res) => {
               setList((prev) => prev.concat(res.data.data));
            })
            .catch((err) => {
               console.log(err);
            });
      };

      if (location.state && location.state.search) {
         location.state.search.forEach((title) => {
            getResult(`search?title=${title}`);
         });
         setTitle({ range: "검색" });
      } else if (location.search) {
         const query = qs.parse(location.search, {
            ignoreQueryPrefix: true,
         });
         setTitle(query);
         if (query.subcategory) {
            getResult(`one/${changeName(query.subcategory)}`);
         } else if (query.category) {
            const name = changeName(query.category);
            if (name === "aids" || name === "massage") getResult(`/${name}`);
            else getResult(`one/${name}`);
         } else if (query.range) {
            getResult(`${changeName(query.range)}`);
         }
      }
   }, [location.state, location.search]);
   return (
      <div>
         <Title {...title} />

         <section className="section-content padding-y">
            <div className="container">
               <div className="row">
                  <Filter />
                  <List list={list} />
               </div>
            </div>
         </section>
      </div>
   );
}
export default ProductList;
