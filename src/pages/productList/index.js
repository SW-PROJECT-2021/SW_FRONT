import React, { useEffect, useState } from "react";
import List from "./List";
import Title from "./Title";
import axios from "axios";
import { useLocation } from "react-router";
import qs from "qs";

const changeName = (name) => {
   if (name === "전체보기") return "";
   else if (name === "유산소") return "aerobic";
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
         await axios
            .get(`http://15.164.20.183:3003/product/${search}`)
            .then((res) => {
               setList((prev) => prev.concat(res.data.data)); //다른 카테고리 고르면 새로고침일어나서 지워짐. 따라서 검색때만 연속가능
            })
            .catch((err) => {
               console.log(err);
            });
      };

      if (location.state) {
         setList([]);
         //getResult(`search?title=${location.state.search}`);
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
                  <List list={list} setList={setList} />
               </div>
            </div>
         </section>
      </div>
   );
}
export default ProductList;
